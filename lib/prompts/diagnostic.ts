import { NICE_BENCHMARKS } from "@/lib/benchmarks";
import {
  BATHROOM_LABELS,
  BEDROOM_LABELS,
  CURRENT_RENTAL_LABELS,
  ELEVATOR_LABELS,
  FLOOR_LABELS,
  GUEST_CAPACITY_LABELS,
  NICE_AREA_LABELS,
  PROPERTY_TYPE_LABELS,
  STANDING_LABELS,
  VIEW_LABELS,
  type DiagnosticInput,
} from "@/lib/types/diagnostic";

/**
 * Méga-prompt Claude pour l'outil de diagnostic de rentabilité H&L.
 * Utilisé côté serveur uniquement via app/api/diagnostic/route.ts.
 * Les benchmarks sont injectés dynamiquement depuis NICE_BENCHMARKS
 * pour garder une source unique de vérité avec la page landing
 * (MarketStats) et éviter toute divergence de données.
 */

export const DIAGNOSTIC_MODEL = "claude-haiku-4-5-20251001";
export const DIAGNOSTIC_MAX_TOKENS = 2000;
export const DIAGNOSTIC_TEMPERATURE = 0.7;

export const DIAGNOSTIC_SYSTEM_PROMPT = `Tu es un expert en gestion locative courte durée à Nice et sur la Côte d'Azur, avec quinze années d'expérience terrain sur les marchés du Carré d'Or, de Mont-Boron, de Cimiez, de Villefranche-sur-Mer et du Cap-Ferrat.

Tu travailles pour H&L Conciergerie (maison H&L, HL GROUP SAS), une maison de gestion premium basée à Nice. Ton rôle est de fournir une estimation de rentabilité honnête, documentée et prudente pour chaque bien qui t'est soumis par un propriétaire.

Règles strictes de comportement :
1. Tu réponds UNIQUEMENT en JSON valide, sans aucun texte avant ou après, sans markdown, sans backticks, sans balises, rien d'autre que l'objet JSON attendu.
2. Tu es réaliste et plutôt conservateur dans tes estimations : mieux vaut sous-promettre et sur-livrer. Ne gonfle jamais les chiffres pour faire plaisir.
3. Tu raisonnes à partir des benchmarks de marché Nice fournis, puis tu appliques des facteurs multiplicateurs documentés en fonction des caractéristiques du bien.
4. Tu formules toujours les chiffres en fourchette centrale avec une plage basse (-15%) et haute (+10%) pour refléter l'incertitude inhérente.
5. Tu ne fais aucune promesse ferme et tu parles toujours d'estimation indicative.
6. Tes points forts, optimisations et justifications citent 2 à 3 caractéristiques SPÉCIFIQUES du bien décrit, jamais de généralités creuses.
7. Aucun emoji, aucun tiret long, jamais de "environ" ou de "peut-être" : sois précis et assuré sur les fourchettes que tu donnes.`;

function formatEur(value: number): string {
  return `${Math.round(value).toLocaleString("fr-FR")} EUR`;
}

/**
 * Construit le user message pour Claude à partir de l'input du
 * formulaire. Contient les benchmarks, les facteurs multiplicateurs,
 * les caractéristiques du bien et le schéma JSON de sortie attendu.
 */
export function buildDiagnosticPrompt(input: DiagnosticInput): string {
  const occupancyPct = Math.round(NICE_BENCHMARKS.occupancyRateMedian * 100);

  const propertyJson = {
    typeDeLogement: PROPERTY_TYPE_LABELS[input.propertyType],
    surfaceM2: input.surfaceSqm,
    nombreDeChambres: BEDROOM_LABELS[input.bedrooms],
    nombreDeSallesDeBain: BATHROOM_LABELS[input.bathrooms],
    capaciteAccueil: GUEST_CAPACITY_LABELS[input.guestCapacity],
    quartier: NICE_AREA_LABELS[input.area],
    vue: VIEW_LABELS[input.view],
    etage: FLOOR_LABELS[input.floor],
    ascenseur: ELEVATOR_LABELS[input.elevator],
    climatisation: input.airConditioning ? "Oui" : "Non",
    balconOuTerrasse: input.balcony ? "Oui" : "Non",
    parkingPrive: input.parking ? "Oui" : "Non",
    piscine: input.pool ? "Oui" : "Non",
    jardinPrivatif: input.garden ? "Oui" : "Non",
    standingGeneral: STANDING_LABELS[input.standing],
    dejaLoueEnCourteDuree: CURRENT_RENTAL_LABELS[input.currentRental],
  };

  return `# CONTEXTE

Tu analyses un bien immobilier à Nice ou sur la Côte d'Azur pour estimer son potentiel de revenus en location courte durée (Airbnb, Booking, Vrbo) sous gestion H&L Conciergerie.

# BENCHMARKS DE RÉFÉRENCE MARCHÉ NICE

Sources : ${NICE_BENCHMARKS.sources.join(", ")} — novembre 2024 à octobre 2025.

- Taux d'occupation médian annuel Nice : ${occupancyPct}%
- ADR médian annuel Nice : ${formatEur(NICE_BENCHMARKS.adrMedianEur)}
- Revenu annuel médian par bien Nice : ${formatEur(NICE_BENCHMARKS.annualRevenueMedianEur)}
- Nombre d'annonces actives à Nice : ${NICE_BENCHMARKS.activeListings.toLocaleString("fr-FR")}+
- Positionnement : ${NICE_BENCHMARKS.ranking}

Saisonnalité pondérée sur l'année :
- Haute saison (juillet, août) : pic ADR 180 à 220 EUR selon standing, occupation 90%+
- Moyenne saison (mai, juin, septembre, octobre) : ADR 130 à 160 EUR, occupation 80%+
- Basse saison (novembre à avril hors Carnaval) : ADR 90 à 120 EUR, occupation 55 à 70%

Périodes événementielles fortes, pic de demande et tarifs :
- Carnaval de Nice (février)
- Grand Prix de Monaco (mai)
- Festival de Cannes (mai)
- Nice Jazz Festival (juillet)
- Monaco Yacht Show (septembre)

Zones premium (prime ADR de +20 à +40% sur la médiane) :
Carré d'Or, Promenade des Anglais face mer, Mont-Boron, Cimiez, Vieux-Nice haut de gamme, Villefranche-sur-Mer, Cap-Ferrat, Beaulieu-sur-Mer, Saint-Laurent-du-Var / Cap 3000 (front de mer, proche aéroport et centre commercial Cap 3000 rénové, forte demande voyageurs d'affaires et shoppers premium).

Zones standard (pas de prime) :
Libération, Port, Gare Thiers, Magnan, Riquier, Saint-Roch, Fabron, Saint-Jean-d'Angély.

# FACTEURS MULTIPLICATEURS À APPLIQUER SUR L'ADR

- Vue mer panoramique : +25 à +40%
- Vue mer partielle : +10 à +20%
- Piscine privée : +15 à +25% (critique l'été)
- Balcon ou terrasse : +5 à +10%
- Parking privé : +5 à +10% (rare et très valorisé à Nice)
- Climatisation : +8 à +15% (essentiel l'été, facteur quasi éliminatoire sans)
- Dernier étage : +5 à +10%
- Standing exceptionnel : +30 à +50%
- Standing très haut de gamme : +20 à +30%
- Standing haut de gamme : +10 à +15%
- Standing bon : +3 à +8%
- Standing standard : 0%

# BIEN À ANALYSER

\`\`\`json
${JSON.stringify(propertyJson, null, 2)}
\`\`\`

# INSTRUCTIONS D'ANALYSE

Procède étape par étape dans ton raisonnement interne, puis produis uniquement le JSON final :

a) Détermine un ADR central réaliste en partant de la médiane Nice et en appliquant les facteurs multiplicateurs pertinents pour ce bien.
b) Détermine un taux d'occupation annuel moyen entre 60 et 90%, pondéré par la saisonnalité et la qualité du bien.
c) Calcule le revenu mensuel central = ADR × 30 × taux d'occupation. Puis décline en fourchette basse (-15%) et haute (+10%).
d) Calcule le revenu annuel central = revenu mensuel × 12, avec la même fourchette.
e) Recommande le pack H&L le plus adapté selon ce mapping :
   - standing standard ou bien simple sans valorisation particulière : pack "essentiel" (commission 25%)
   - standing bon ou haut de gamme avec potentiel d'optimisation : pack "premium" (commission 28%)
   - standing très haut de gamme, exceptionnel, villa premium ou bien signature : pack "signature" (commission 30%)
f) Calcule le revenu net propriétaire = revenu annuel × (1 - commission/100), pour chaque valeur de la fourchette.
g) Liste exactement 3 points forts du bien (facteurs qui jouent POUR la rentabilité, avec détail précis).
h) Liste 2 à 3 optimisations concrètes et actionnables pour augmenter le yield (ex. : "shooting photo professionnel", "pricing dynamique saisonnier", "kit d'accueil haut de gamme", etc.).
i) Rédige une justification en 3 à 4 phrases qui cite 2 à 3 caractéristiques SPÉCIFIQUES du bien décrit et en explique l'impact chiffré sur la fourchette.
j) Rédige une phrase (une seule) expliquant pourquoi le pack recommandé est adapté à CE bien précisément.

# FORMAT DE SORTIE OBLIGATOIRE

Réponds UNIQUEMENT avec un JSON valide, strictement conforme à ce schéma :

\`\`\`json
{
  "revenuMensuelEstime": { "min": number, "central": number, "max": number },
  "revenuAnnuelEstime": { "min": number, "central": number, "max": number },
  "tauxOccupationEstime": number,
  "adrEstime": number,
  "commissionHL": 25 | 28 | 30,
  "revenuNetProprietaire": { "min": number, "central": number, "max": number },
  "packRecommande": "essentiel" | "premium" | "signature",
  "raisonPackRecommande": "string (1 à 2 phrases)",
  "pointsForts": ["string", "string", "string"],
  "optimisationsPossibles": ["string", "string", "string"],
  "justification": "string (3 à 4 phrases)"
}
\`\`\`

Contraintes supplémentaires sur les valeurs :
- Tous les montants en EUR, entiers arrondis à l'euro (pas de décimales).
- tauxOccupationEstime entre 60 et 90.
- adrEstime entre 70 et 450.
- revenuNetProprietaire cohérent avec revenuAnnuelEstime × (1 - commissionHL/100).
- pointsForts : 3 éléments, 8 à 15 mots chacun.
- optimisationsPossibles : 2 ou 3 éléments, 8 à 15 mots chacun.

AUCUN TEXTE AVANT OU APRÈS LE JSON. PAS DE MARKDOWN. PAS DE BACKTICKS. UNIQUEMENT L'OBJET JSON.`;
}
