import type { Metadata } from "next";
import { ComingSoon } from "@/components/placeholder/ComingSoon";

export const metadata: Metadata = {
  title: "Propriétaires · Bientôt",
  description:
    "Une page dédiée aux propriétaires H&L Conciergerie sera bientôt disponible. En attendant, contactez-nous directement ou lancez votre diagnostic gratuit.",
  alternates: { canonical: "/proprietaires" },
};

export default function ProprietairesPage() {
  return (
    <ComingSoon
      eyebrow="Espace propriétaires"
      title="Votre univers, bientôt."
      italicWord="bientôt"
      description="Une page dédiée aux propriétaires, détaillant notre méthode, nos cas d'usage et les témoignages de la maison, est en cours de préparation. En attendant, prenez contact avec nous directement, ou lancez votre diagnostic de rentabilité en deux minutes."
      primaryCtaHref="/diagnostic"
      primaryCtaLabel="Lancer mon diagnostic"
      secondaryCtaHref="/contact"
      secondaryCtaLabel="Nous contacter"
    />
  );
}
