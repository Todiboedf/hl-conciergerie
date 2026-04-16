import type { Metadata } from "next";
import { VoyageursPage } from "@/components/voyageurs/VoyageursPage";

export const metadata: Metadata = {
  title: "Voyageurs · Séjours d'exception à Nice & Côte d'Azur",
  description:
    "La réservation directe de nos adresses sur la Côte d'Azur arrive prochainement. En attendant, nos biens restent accessibles via Airbnb, Booking et Vrbo.",
  alternates: { canonical: "/voyageurs" },
  openGraph: {
    title: "Voyageurs · H&L Conciergerie",
    description:
      "Séjours haut de gamme sur la Côte d'Azur, accueil personnalisé et conciergerie 7j/7.",
    url: "/voyageurs",
    type: "website",
  },
};

export default function VoyageursPage() {
  return (
    <ComingSoon
      eyebrow="Voyageurs"
      title="Nos adresses, bientôt en réservation directe."
      italicWord="bientôt"
      description="Nos biens se réservent aujourd'hui via Airbnb, Booking et Vrbo. Prochainement, nous proposerons la réservation directe sur ce site : fiches biens, calendrier temps réel et paiement sécurisé. D'ici là, écrivez-nous pour toute demande particulière."
      primaryCtaHref="/contact"
      primaryCtaLabel="Nous contacter"
      secondaryCtaHref="/services"
      secondaryCtaLabel="Notre maison"
    />
  );
}
