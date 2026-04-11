import type { Metadata } from "next";
import { ComingSoon } from "@/components/placeholder/ComingSoon";

export const metadata: Metadata = {
  title: "Diagnostic de rentabilité · Bientôt",
  description:
    "Notre outil de diagnostic de rentabilité locative pour les propriétaires niçois est en cours de finalisation. Contactez-nous dès maintenant pour une estimation personnalisée.",
  alternates: { canonical: "/diagnostic" },
};

/**
 * Placeholder pour /diagnostic. Le formulaire multi-étapes et
 * l'intégration Claude API seront livrés en Session 4. En attendant,
 * on renvoie les propriétaires vers /contact pour ne pas perdre
 * les visiteurs qui cliquent sur les CTAs du site.
 */
export default function DiagnosticPage() {
  return (
    <ComingSoon
      eyebrow="Diagnostic propriétaire"
      title="L'outil arrive, très bientôt."
      italicWord="bientôt"
      description="Notre outil de diagnostic de rentabilité est en cours de finalisation. En attendant, prenez contact avec nous : l'un des fondateurs vous remettra personnellement une première estimation sous 24 heures, à partir des caractéristiques de votre bien."
      primaryCtaHref="/contact"
      primaryCtaLabel="Demander mon estimation"
      secondaryCtaHref="/services"
      secondaryCtaLabel="Découvrir nos packs"
    />
  );
}
