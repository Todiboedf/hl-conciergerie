import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import {
  NICE_AREA_LABELS,
  PROPERTY_TYPE_LABELS,
  STANDING_LABELS,
  type DiagnosticInput,
  type DiagnosticResult,
} from "@/lib/types/diagnostic";
import { PACKS } from "@/lib/packs";

/**
 * Route POST /api/diagnostic/email
 *
 * Envoie par email au propriétaire le récapitulatif de l'estimation
 * qu'il vient d'obtenir sur /diagnostic. Reçoit {input, result}, valide
 * le body, compose un HTML on-brand et envoie via Resend.
 *
 * Dev fallback : si RESEND_API_KEY n'est pas configurée, on simule
 * un succès pour ne pas bloquer les tests UI locaux.
 */

const rangeSchema = z.object({
  min: z.number(),
  central: z.number(),
  max: z.number(),
});

const payloadSchema = z.object({
  input: z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    email: z.string().trim().email(),
    propertyType: z.enum([
      "studio",
      "t1",
      "t2",
      "t3",
      "t4-plus",
      "maison",
      "villa",
    ]),
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
    standing: z.enum([
      "standard",
      "bon",
      "haut",
      "tres-haut",
      "exceptionnel",
    ]),
    surfaceSqm: z.number().int().min(15).max(500),
  }),
  result: z.object({
    revenuMensuelEstime: rangeSchema,
    revenuAnnuelEstime: rangeSchema,
    tauxOccupationEstime: z.number(),
    adrEstime: z.number(),
    commissionHL: z.union([z.literal(25), z.literal(28), z.literal(30)]),
    revenuNetProprietaire: rangeSchema,
    packRecommande: z.enum(["essentiel", "premium", "signature"]),
    raisonPackRecommande: z.string(),
    pointsForts: z.array(z.string()),
    optimisationsPossibles: z.array(z.string()),
    justification: z.string(),
  }),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmtEur(value: number): string {
  return `${Math.round(value).toLocaleString("fr-FR")} EUR`;
}

function renderHtml(
  input: Pick<
    DiagnosticInput,
    "firstName" | "lastName" | "propertyType" | "area" | "standing" | "surfaceSqm"
  >,
  result: DiagnosticResult,
): string {
  const pack = PACKS.find((p) => p.id === result.packRecommande);
  const packName = pack ? pack.name : result.packRecommande;

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Votre estimation H&amp;L Conciergerie</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F5F2EA;color:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F2EA;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background-color:#FFFFFF;border:1px solid rgba(138,112,48,0.2);">
            <tr>
              <td style="padding:36px 40px 24px 40px;border-bottom:1px solid rgba(138,112,48,0.2);">
                <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#8A7030;">H&amp;L Conciergerie · Votre estimation</p>
                <h1 style="margin:14px 0 0 0;font-family:Georgia,serif;font-weight:400;font-size:30px;color:#0A0A0A;">Bonjour ${escapeHtml(input.firstName)},</h1>
                <p style="margin:12px 0 0 0;font-size:14px;line-height:1.7;color:#555;">Voici le récapitulatif de l&rsquo;estimation de rentabilité locative que vous venez d&rsquo;obtenir sur hl-conciergerie.com. Estimation indicative basée sur les données Airbtics 2025 et les caractéristiques déclarées de votre bien.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px 8px 40px;">
                <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;">Revenu mensuel central estimé</p>
                <p style="margin:0;font-family:Georgia,serif;font-size:44px;color:#C9A84C;letter-spacing:-0.02em;">${fmtEur(result.revenuMensuelEstime.central)}</p>
                <p style="margin:8px 0 0 0;font-size:13px;color:#555;">Fourchette indicative : ${fmtEur(result.revenuMensuelEstime.min)} à ${fmtEur(result.revenuMensuelEstime.max)} brut mensuel</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 40px 20px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;width:50%;">Taux d'occupation estimé</td>
                    <td style="padding:8px 0;font-size:14px;color:#0A0A0A;">${result.tauxOccupationEstime} %</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;">ADR moyen estimé</td>
                    <td style="padding:8px 0;font-size:14px;color:#0A0A0A;">${fmtEur(result.adrEstime)} par nuit</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;">Revenu annuel brut</td>
                    <td style="padding:8px 0;font-size:14px;color:#0A0A0A;">${fmtEur(result.revenuAnnuelEstime.central)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;">Revenu net propriétaire</td>
                    <td style="padding:8px 0;font-size:14px;color:#0A0A0A;">${fmtEur(result.revenuNetProprietaire.central)} après commission ${result.commissionHL} %</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <div style="height:1px;background:linear-gradient(to right,rgba(138,112,48,0.35),transparent);"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px;">
                <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;">Pourquoi cette estimation</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#2A2A2A;">${escapeHtml(result.justification)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px 24px 40px;">
                <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;">Les atouts de votre bien</p>
                <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.7;color:#2A2A2A;">
                  ${result.pointsForts.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
                </ul>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px 24px 40px;">
                <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;">Comment aller plus loin</p>
                <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.7;color:#2A2A2A;">
                  ${result.optimisationsPossibles.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
                </ul>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px;background-color:#0A0A0A;color:#F8F6F0;">
                <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#C9A84C;">Notre recommandation</p>
                <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:26px;color:#F8F6F0;">Pack ${escapeHtml(packName)}</p>
                <p style="margin:0 0 14px 0;font-size:13px;color:#A8A8A8;">Commission ${result.commissionHL} % sur le revenu généré.</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#F8F6F0;">${escapeHtml(result.raisonPackRecommande)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 32px 40px;">
                <p style="margin:0 0 16px 0;font-size:14px;line-height:1.7;color:#2A2A2A;">Souhaitez-vous en discuter avec l&rsquo;un de nos associés&nbsp;? Nous programmons volontiers un rendez-vous pour analyser votre bien en détail et affiner cette estimation.</p>
                <a href="https://hl-conciergerie.com/contact" style="display:inline-block;background-color:#C9A84C;color:#0A0A0A;padding:14px 26px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;font-weight:500;">Prendre rendez-vous</a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px 28px 40px;border-top:1px solid rgba(138,112,48,0.2);">
                <p style="margin:0;font-size:11px;line-height:1.7;color:#888;">Cette estimation est indicative et non contractuelle. Bien analysé&nbsp;: ${escapeHtml(PROPERTY_TYPE_LABELS[input.propertyType])} de ${input.surfaceSqm} m² à ${escapeHtml(NICE_AREA_LABELS[input.area])}, standing ${escapeHtml(STANDING_LABELS[input.standing].toLowerCase())}. Le revenu réel dépend de nombreux facteurs (qualité de la gestion, photos, prix, saisonnalité effective).</p>
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8A7030;">H&amp;L Conciergerie · HL GROUP SAS · Nice</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(
  input: Pick<DiagnosticInput, "firstName" | "propertyType" | "area">,
  result: DiagnosticResult,
): string {
  return [
    `Bonjour ${input.firstName},`,
    "",
    "Voici le récapitulatif de votre estimation H&L Conciergerie :",
    "",
    `Revenu mensuel central estimé : ${fmtEur(result.revenuMensuelEstime.central)}`,
    `Fourchette : ${fmtEur(result.revenuMensuelEstime.min)} à ${fmtEur(result.revenuMensuelEstime.max)}`,
    `Taux d'occupation estimé      : ${result.tauxOccupationEstime} %`,
    `ADR moyen estimé              : ${fmtEur(result.adrEstime)} par nuit`,
    `Revenu annuel brut            : ${fmtEur(result.revenuAnnuelEstime.central)}`,
    `Revenu net propriétaire       : ${fmtEur(result.revenuNetProprietaire.central)} (commission ${result.commissionHL} %)`,
    `Pack recommandé               : ${result.packRecommande}`,
    "",
    "Justification",
    "-------------",
    result.justification,
    "",
    "Bien analysé : " + PROPERTY_TYPE_LABELS[input.propertyType] + " à " + NICE_AREA_LABELS[input.area],
    "",
    "Souhaitez-vous en discuter ? Répondez à ce mail ou prenez rendez-vous via hl-conciergerie.com/contact.",
    "",
    "H&L Conciergerie · HL GROUP SAS · Nice",
  ].join("\n");
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

  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données incomplètes pour l'envoi de l'estimation." },
      { status: 400 },
    );
  }

  const { input, result } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "contact@hl-conciergerie.com";
  const teamEmail = process.env.RESEND_TO_EMAIL ?? "contact@hl-conciergerie.com";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[api/diagnostic/email] RESEND_API_KEY manquante — dev fallback, email non envoyé.",
        { email: input.email },
      );
    }
    return NextResponse.json({ success: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `Votre estimation H&L Conciergerie · ${fmtEur(result.revenuMensuelEstime.central)} par mois`;

    const sendResult = await resend.emails.send({
      from: `H&L Conciergerie <${fromEmail}>`,
      to: [input.email],
      bcc: [teamEmail],
      replyTo: teamEmail,
      subject,
      html: renderHtml(input, result),
      text: renderText(input, result),
    });

    if (sendResult.error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[api/diagnostic/email] Resend error", sendResult.error);
      }
      return NextResponse.json(
        {
          error:
            "Impossible d'envoyer l'estimation par email. Merci de nous écrire directement à contact@hl-conciergerie.com.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: sendResult.data?.id });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[api/diagnostic/email] unexpected error", error);
    }
    return NextResponse.json(
      {
        error:
          "Impossible d'envoyer l'estimation par email. Merci de nous écrire directement à contact@hl-conciergerie.com.",
      },
      { status: 500 },
    );
  }
}
