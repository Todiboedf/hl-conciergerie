import type { Metadata } from "next";
import { ComingSoon } from "@/components/placeholder/ComingSoon";

export const metadata: Metadata = {
  title: "Voyageurs · Bientôt",
  description:
    "Une page dédiée aux voyageurs de H&L Conciergerie sera bientôt disponible. Contactez-nous pour toute demande de séjour d'exception sur la Côte d'Azur.",
  alternates: { canonical: "/voyageurs" },
};

export default function VoyageursPage() {
  return (
    <ComingSoon
      eyebrow="Voyageurs"
      title="Votre séjour d'exception, bientôt."
      italicWord="bientôt"
      description="Une sélection de nos adresses signature et un espace dédié à la réservation seront présentés ici dans les semaines à venir. En attendant, écrivez-nous pour toute demande particulière : nous ferons le nécessaire pour vous orienter vers le bien qui correspond à votre séjour."
      primaryCtaHref="/contact"
      primaryCtaLabel="Nous contacter"
      secondaryCtaHref="/services"
      secondaryCtaLabel="Notre maison"
    />
  );
}
