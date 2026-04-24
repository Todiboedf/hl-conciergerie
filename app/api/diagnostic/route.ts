import { NextResponse } from "next/server";
import { z } from "zod";
import { askClaude, extractJsonObject } from "@/lib/claude";
import {
  buildDiagnosticPrompt,
  DIAGNOSTIC_MAX_TOKENS,
  DIAGNOSTIC_MODEL,
  DIAGNOSTIC_SYSTEM_PROMPT,
  DIAGNOSTIC_TEMPERATURE,
} from "@/lib/prompts/diagnostic";
import {
  PREMIUM_AREAS,
  type DiagnosticInput,
  type DiagnosticResult,
} from "@/lib/types/diagnostic";

/**
 * Route POST /api/diagnostic
 *
 * Valide le body avec Zod, applique un rate limiting léger en mémoire
 * (1 diagnostic par IP toutes les 30 secondes), appelle Claude Haiku
 * pour générer l'estimation JSON, parse la réponse et renvoie le
 * résultat typé au front.
 *
 * Dev fallback : si ANTHROPIC_API_KEY n'est pas configurée, un
 * résultat calculé heuristiquement (basé sur les caractéristiques
 * du bien) est retourné pour permettre le développement UI sans
 * consommer de crédits API.
 */

const diagnosticSchema = z.object({
  propertyType: z.enum([
    "studio",
    "t1",
    "t2",
    "t3",
    "t4-plus",
    "maison",
    "villa",
  ]),
  surfaceSqm: z.number().int().min(15).max(500),
  bedrooms: z.enum(["0", "1", "2", "3", "4", "5-plus"]),
  bathrooms: z.enum(["1", "2", "3-plus"]),
  guestCapacity: z.enum(["2", "3", "4", "5", "6", "7", "8", "9-plus"]),
  area: z.enum([
    "vieux-nice",
    "carre-or",
    "promenade",
    "port",
    "liberation",
    "mont-boron",
    "cimiez",
    "fabron",
    "saint-jean-angely",
    "californie",
    "riquier",
    "magnan",
    "saint-roch",
    "autre-nice",
    "saint-laurent-var",
    "villefranche",
    "beaulieu",
    "cap-ail",
  ]),
  view: z.enum([
    "mer-panoramique",
    "mer-partielle",
    "jardin-cour",
    "ville",
    "aucune",
  ]),
  floor: z.enum([
    "rdc",
    "1er",
    "2e",
    "3e",
    "4e",
    "5e-plus",
    "dernier",
    "villa-individuelle",
  ]),
  elevator: z.enum(["oui", "non", "non-applicable"]),
  airConditioning: z.boolean(),
  balcony: z.boolean(),
  parking: z.boolean(),
  pool: z.boolean(),
  garden: z.boolean(),
  standing: z.enum(["standard", "bon", "haut", "tres-haut", "exceptionnel"]),
  currentRental: z.enum(["regulier", "ponctuel", "jamais"]),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  rgpd: z.literal(true),
});

const diagnosticResultSchema = z
  .object({
    revenuMensuelEstime: z.object({
      min: z.number(),
      central: z.number(),
      max: z.number(),
    }),
    revenuAnnuelEstime: z.object({
      min: z.number(),
      central: z.number(),
      max: z.number(),
    }),
    tauxOccupationEstime: z.number().min(50).max(95),
    adrEstime: z.number().min(60).max(600),
    commissionHL: z.union([z.literal(25), z.literal(28), z.literal(30)]),
    revenuNetProprietaire: z.object({
      min: z.number(),
      central: z.number(),
      max: z.number(),
    }),
    packRecommande: z.enum(["essentiel", "premium", "signature"]),
    raisonPackRecommande: z.string().min(10),
    pointsForts: z.array(z.string()).min(2).max(5),
    optimisationsPossibles: z.array(z.string()).min(2).max(5),
    justification: z.string().min(20),
  })
  .transform((value): DiagnosticResult => ({
    ...value,
    revenuMensuelEstime: roundRange(value.revenuMensuelEstime),
    revenuAnnuelEstime: roundRange(value.revenuAnnuelEstime),
    revenuNetProprietaire: roundRange(value.revenuNetProprietaire),
    adrEstime: Math.round(value.adrEstime),
    tauxOccupationEstime: Math.round(value.tauxOccupationEstime),
  }));

function roundRange(range: { min: number; central: number; max: number }) {
  return {
    min: Math.round(range.min),
    central: Math.round(range.central),
    max: Math.round(range.max),
  };
}

// Rate limiting simple en mémoire (best-effort, non persistant entre
// cold starts). Un diagnostic par IP toutes les 30 secondes.
const RATE_WINDOW_MS = 30_000;
const lastHitByIp = new Map<string, number>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = lastHitByIp.get(ip);
  if (last && now - last < RATE_WINDOW_MS) {
    return true;
  }

  // Nettoyage opportuniste des entrées anciennes pour éviter la
  // croissance mémoire non bornée si beaucoup d'IPs distinctes.
  if (lastHitByIp.size > 1000) {
    for (const [key, ts] of lastHitByIp) {
      if (now - ts > RATE_WINDOW_MS * 4) {
        lastHitByIp.delete(key);
      }
    }
  }

  lastHitByIp.set(ip, now);
  return false;
}

/**
 * Fallback dev : estimation calculée heuristiquement sans appel IA.
 * Reproduit l'essentiel des facteurs multiplicateurs du prompt pour
 * que l'UI reste testable sans clé API. Ne pas utiliser en prod.
 */
function buildFallbackResult(input: DiagnosticInput): DiagnosticResult {
  const isPremiumArea = PREMIUM_AREAS.has(input.area);

  let adr = 110;

  // Surface (au-delà de 30 m², +3 EUR par 5 m² supplémentaires)
  const surfaceBonus = Math.max(0, (input.surfaceSqm - 30) / 5) * 3;
  adr += surfaceBonus;

  // Quartier premium
  if (isPremiumArea) adr *= 1.25;

  // Vue
  if (input.view === "mer-panoramique") adr *= 1.32;
  else if (input.view === "mer-partielle") adr *= 1.15;
  else if (input.view === "jardin-cour") adr *= 1.05;

  // Équipements
  if (input.pool) adr *= 1.2;
  if (input.airConditioning) adr *= 1.1;
  else adr *= 0.92;
  if (input.balcony) adr *= 1.07;
  if (input.parking) adr *= 1.07;
  if (input.garden) adr *= 1.05;

  // Standing
  const standingMultiplier = {
    standard: 1,
    bon: 1.05,
    haut: 1.12,
    "tres-haut": 1.24,
    exceptionnel: 1.38,
  }[input.standing];
  adr *= standingMultiplier;

  // Dernier étage
  if (input.floor === "dernier") adr *= 1.07;

  adr = Math.min(Math.max(Math.round(adr), 80), 480);

  // Occupation : 72% standard, 78% premium area, +2 points si régulier
  let occupancy = isPremiumArea ? 0.78 : 0.72;
  if (input.currentRental === "regulier") occupancy += 0.03;
  if (input.standing === "standard") occupancy -= 0.02;
  occupancy = Math.min(Math.max(occupancy, 0.62), 0.86);

  const monthlyCentral = adr * 30 * occupancy;
  const annualCentral = monthlyCentral * 12;

  const commission: 25 | 28 | 30 =
    input.standing === "tres-haut" ||
    input.standing === "exceptionnel" ||
    input.propertyType === "villa"
      ? 30
      : input.standing === "bon" || input.standing === "haut"
        ? 28
        : 25;

  const packRecommande: DiagnosticResult["packRecommande"] =
    commission === 30 ? "signature" : commission === 28 ? "premium" : "essentiel";

  const makeRange = (central: number) => ({
    min: Math.round(central * 0.85),
    central: Math.round(central),
    max: Math.round(central * 1.1),
  });

  const netMultiplier = 1 - commission / 100;

  const pointsForts: string[] = [];
  if (isPremiumArea)
    pointsForts.push(
      `Adresse dans une zone premium de la Côte d'Azur (${input.area.replace(/-/g, " ")}) avec forte demande internationale.`,
    );
  if (input.view === "mer-panoramique")
    pointsForts.push(
      "Vue mer panoramique, facteur de valorisation majeur sur le marché niçois.",
    );
  if (input.pool)
    pointsForts.push(
      "Piscine privée, atout différenciant critique en haute saison estivale.",
    );
  if (input.parking)
    pointsForts.push(
      "Parking privé, critère rare à Nice qui élargit la cible voyageurs.",
    );
  if (input.airConditioning)
    pointsForts.push(
      "Climatisation intégrée, quasi-indispensable pour la saison juin à septembre.",
    );
  if (input.standing === "tres-haut" || input.standing === "exceptionnel")
    pointsForts.push(
      "Standing très haut de gamme compatible avec une clientèle internationale exigeante.",
    );
  if (pointsForts.length < 3) {
    pointsForts.push(
      "Surface et configuration cohérentes avec la demande courte durée à Nice.",
    );
  }

  const optimisationsPossibles: string[] = [];
  if (!input.airConditioning)
    optimisationsPossibles.push(
      "Installer une climatisation réversible pour débloquer la saison estivale.",
    );
  optimisationsPossibles.push(
    "Investir dans un shooting photo professionnel et un home-staging soigné.",
  );
  optimisationsPossibles.push(
    "Activer le pricing dynamique saisonnier H&L sur 12 plateformes simultanément.",
  );
  if (!input.pool && input.propertyType === "villa")
    optimisationsPossibles.push(
      "Aménager un coin détente extérieur avec jacuzzi pour remonter l'ADR estival.",
    );

  const justification = [
    `Estimation construite à partir de la médiane du marché niçois (132 EUR ADR, 78% d'occupation)`,
    isPremiumArea
      ? `pondérée à la hausse par l'adresse premium`
      : `calibrée sur les standards du quartier`,
    input.view === "mer-panoramique" || input.view === "mer-partielle"
      ? `et l'effet vue mer significatif sur les tarifs pratiqués`
      : `et la typologie du bien`,
    `. Le standing ${input.standing === "exceptionnel" ? "exceptionnel" : input.standing === "tres-haut" ? "très haut de gamme" : input.standing === "haut" ? "haut de gamme" : input.standing === "bon" ? "bon" : "standard"} cadre le positionnement tarifaire. Fourchette indicative basée sur les données Airbtics nov. 2024 à oct. 2025.`,
  ].join(" ");

  const raisonPackRecommande =
    packRecommande === "signature"
      ? "Un bien de ce calibre mérite l'accompagnement hôtelier complet du pack Signature, avec gestionnaire dédié et conciergerie propriétaire."
      : packRecommande === "premium"
        ? "Le pack Premium active la valorisation photo, le pricing dynamique et la multi-diffusion, levier principal d'optimisation du yield sur ce bien."
        : "Le pack Essentiel couvre la gestion opérationnelle complète, adaptée au profil du bien et à son standing actuel.";

  return {
    revenuMensuelEstime: makeRange(monthlyCentral),
    revenuAnnuelEstime: makeRange(annualCentral),
    tauxOccupationEstime: Math.round(occupancy * 100),
    adrEstime: adr,
    commissionHL: commission,
    revenuNetProprietaire: makeRange(annualCentral * netMultiplier),
    packRecommande,
    raisonPackRecommande,
    pointsForts: pointsForts.slice(0, 3),
    optimisationsPossibles: optimisationsPossibles.slice(0, 3),
    justification,
  };
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 },
    );
  }

  const parsed = diagnosticSchema.safeParse(json);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error:
          firstIssue?.message ??
          "Champs manquants ou invalides dans le formulaire de diagnostic",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const input = parsed.data as DiagnosticInput;
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Merci de patienter quelques instants avant de lancer un nouveau diagnostic.",
      },
      { status: 429 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Dev fallback : pas de clé => résultat heuristique.
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[api/diagnostic] ANTHROPIC_API_KEY manquante — dev fallback heuristique utilisé.",
      );
    }
    const fallback = buildFallbackResult(input);
    return NextResponse.json({ success: true, dev: true, result: fallback });
  }

  const prompt = buildDiagnosticPrompt(input);

  // Retry une fois si Claude renvoie un JSON non parseable.
  const attempt = async (): Promise<DiagnosticResult> => {
    const { text } = await askClaude({
      model: DIAGNOSTIC_MODEL,
      system: DIAGNOSTIC_SYSTEM_PROMPT,
      userMessage: prompt,
      maxTokens: DIAGNOSTIC_MAX_TOKENS,
      temperature: DIAGNOSTIC_TEMPERATURE,
    });
    const raw = extractJsonObject<unknown>(text);
    return diagnosticResultSchema.parse(raw);
  };

  try {
    let result: DiagnosticResult;
    try {
      result = await attempt();
    } catch (firstErr) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[api/diagnostic] 1er essai échoué, retry.", firstErr);
      }
      result = await attempt();
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[api/diagnostic] échec Claude", error);
    }
    return NextResponse.json(
      {
        error:
          "Nous rencontrons une difficulté technique. Nos équipes ont été alertées. Vous pouvez nous écrire directement à contact@hl-conciergerie.com.",
      },
      { status: 502 },
    );
  }
}
