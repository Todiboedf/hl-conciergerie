import type { Metadata } from "next";
import { ProprietairesPage } from "@/components/proprietaires/ProprietairesPage";

export const metadata: Metadata = {
  title: "Propriétaires · Gestion locative premium à Nice",
  description:
    "Confiez votre bien à H&L Conciergerie. Gestion totale, optimisation continue, conformité assurée. Diagnostic gratuit en deux minutes, sans engagement.",
  alternates: { canonical: "/proprietaires" },
  openGraph: {
    title: "Propriétaires · H&L Conciergerie",
    description:
      "Gestion locative courte durée premium à Nice et sur la Côte d'Azur. Diagnostic gratuit et sans engagement.",
    url: "/proprietaires",
    type: "website",
  },
};

export default function Page() {
  return <ProprietairesPage />;
}
