import type { Metadata } from "next";
import { DiagnosticPage } from "@/components/diagnostic/DiagnosticPage";

export const metadata: Metadata = {
  title: "Diagnostic de rentabilité locative · Gratuit",
  description:
    "Obtenez en deux minutes une estimation personnalisée du revenu locatif de votre bien à Nice. Outil gratuit, sans inscription, basé sur les données réelles du marché niçois.",
  alternates: { canonical: "/diagnostic" },
  openGraph: {
    title: "Diagnostic de rentabilité locative H&L Conciergerie",
    description:
      "Estimation personnalisée du revenu de votre bien à Nice. Gratuit, sans inscription, deux minutes.",
    url: "/diagnostic",
    type: "website",
  },
};

export default function Page() {
  return <DiagnosticPage />;
}
