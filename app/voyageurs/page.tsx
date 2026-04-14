import type { Metadata } from "next";
import { VoyageursPage } from "@/components/voyageurs/VoyageursPage";

export const metadata: Metadata = {
  title: "Voyageurs · Séjours d'exception à Nice & Côte d'Azur",
  description:
    "Découvrez une sélection confidentielle d'adresses d'exception à Nice et sur la Riviera, accompagnées d'une conciergerie dédiée pour orchestrer chaque détail de votre séjour.",
  alternates: { canonical: "/voyageurs" },
  openGraph: {
    title: "Voyageurs · H&L Conciergerie",
    description:
      "Séjours haut de gamme sur la Côte d'Azur, accueil personnalisé et conciergerie 7j/7.",
    url: "/voyageurs",
    type: "website",
  },
};

export default function Page() {
  return <VoyageursPage />;
}
