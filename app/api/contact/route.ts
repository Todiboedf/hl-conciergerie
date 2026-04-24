import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

/**
 * Route POST /api/contact
 *
 * Reçoit les demandes du formulaire de contact du site, les valide
 * avec zod, puis envoie un email HTML à l'adresse de l'équipe H&L via
 * Resend. Le reply-to est celui du contact pour qu'une simple réponse
 * depuis la boîte équipe arrive directement au prospect.
 *
 * Dev fallback : si RESEND_API_KEY n'est pas configurée (cas pendant
 * le développement local avant mise en production), on log un warning
 * et on renvoie success=true pour que l'UI reste testable localement.
 */

const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Le prénom est requis")
    .max(80, "Prénom trop long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Le nom est requis")
    .max(80, "Nom trop long"),
  email: z.string().trim().email("Email invalide"),
  phone: z
    .string()
    .trim()
    .max(40, "Téléphone trop long")
    .optional()
    .or(z.literal("")),
  propertyType: z.enum(["appartement", "maison", "villa"], {
    message: "Type de bien invalide",
  }),
  location: z
    .string()
    .trim()
    .min(1, "La localisation est requise")
    .max(160, "Localisation trop longue"),
  message: z
    .string()
    .trim()
    .min(10, "Merci de préciser votre demande (10 caractères minimum)")
    .max(4000, "Message trop long"),
  rgpd: z.literal(true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
});

export type ContactPayload = z.infer<typeof contactSchema>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtmlEmail(data: ContactPayload): string {
  const propertyTypeLabel = {
    appartement: "Appartement",
    maison: "Maison",
    villa: "Villa",
  }[data.propertyType];

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Nouvelle demande de contact · H&amp;L Conciergerie</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0A0A0A;color:#F8F6F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#131313;border:1px solid rgba(201,168,76,0.25);">
            <tr>
              <td style="padding:36px 40px 24px 40px;border-bottom:1px solid rgba(201,168,76,0.2);">
                <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#C9A84C;">H&amp;L Conciergerie</p>
                <h1 style="margin:12px 0 0 0;font-family:Georgia,serif;font-weight:400;font-size:26px;color:#F8F6F0;">Nouvelle demande de contact</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8A8A8;width:42%;">Contact</td>
                    <td style="padding:8px 0;font-size:14px;color:#F8F6F0;">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8A8A8;">Email</td>
                    <td style="padding:8px 0;font-size:14px;color:#F8F6F0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#C9A84C;text-decoration:none;">${escapeHtml(data.email)}</a></td>
                  </tr>
                  ${
                    data.phone
                      ? `<tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8A8A8;">Téléphone</td>
                    <td style="padding:8px 0;font-size:14px;color:#F8F6F0;">${escapeHtml(data.phone)}</td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8A8A8;">Type de bien</td>
                    <td style="padding:8px 0;font-size:14px;color:#F8F6F0;">${escapeHtml(propertyTypeLabel)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8A8A8;">Localisation</td>
                    <td style="padding:8px 0;font-size:14px;color:#F8F6F0;">${escapeHtml(data.location)}</td>
                  </tr>
                </table>
                <div style="margin:28px 0 12px 0;height:1px;background:linear-gradient(to right,rgba(201,168,76,0.4),transparent);"></div>
                <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8A8A8;">Message</p>
                <p style="margin:0;font-size:15px;line-height:1.7;color:#F8F6F0;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px 32px 40px;border-top:1px solid rgba(201,168,76,0.2);">
                <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8A8A8;">Répondre directement à ce message pour contacter le prospect.</p>
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8A8A8;">H&amp;L Conciergerie · HL GROUP SAS · Nice</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderPlainTextEmail(data: ContactPayload): string {
  const propertyTypeLabel = {
    appartement: "Appartement",
    maison: "Maison",
    villa: "Villa",
  }[data.propertyType];

  return [
    "H&L Conciergerie · Nouvelle demande de contact",
    "",
    `Contact      : ${data.firstName} ${data.lastName}`,
    `Email        : ${data.email}`,
    data.phone ? `Téléphone    : ${data.phone}` : null,
    `Type de bien : ${propertyTypeLabel}`,
    `Localisation : ${data.location}`,
    "",
    "Message",
    "-------",
    data.message,
    "",
    "Répondre directement à ce message pour contacter le prospect.",
  ]
    .filter(Boolean)
    .join("\n");
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

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error:
          firstIssue?.message ??
          "Champs manquants ou invalides dans le formulaire",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "contact@hl-conciergerie.com";
  const toEmail = process.env.RESEND_TO_EMAIL ?? "contact@hl-conciergerie.com";

  // Dev fallback : si la clé Resend n'est pas configurée, on simule
  // un succès côté serveur pour permettre les tests UI localement.
  if (!apiKey) {
    // Log minimal côté dev, sans dépendance console en prod car
    // ce chemin n'est pris qu'en local (pas de clé configurée).
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[api/contact] RESEND_API_KEY manquante — dev fallback, email non envoyé.",
        { firstName: data.firstName, email: data.email },
      );
    }
    return NextResponse.json({ success: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `Nouvelle demande · ${data.firstName} ${data.lastName} · ${data.location}`;

    const result = await resend.emails.send({
      from: `H&L Conciergerie <${fromEmail}>`,
      to: [toEmail],
      replyTo: data.email,
      subject,
      html: renderHtmlEmail(data),
      text: renderPlainTextEmail(data),
    });

    if (result.error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[api/contact] Resend error", result.error);
      }
      return NextResponse.json(
        {
          error:
            "Une erreur est survenue lors de l'envoi du message. Merci de réessayer ou de nous écrire directement à contact@hl-conciergerie.com.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[api/contact] unexpected error", error);
    }
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'envoi du message. Merci de réessayer ou de nous écrire directement à contact@hl-conciergerie.com.",
      },
      { status: 500 },
    );
  }
}
