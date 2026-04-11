import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesComparator } from "@/components/services/ServicesComparator";
import { ServicesPackDetail } from "@/components/services/ServicesPackDetail";
import { ServicesFAQ } from "@/components/services/ServicesFAQ";
import { ServicesCTA } from "@/components/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Nos packs · Essentiel, Premium, Signature",
  description:
    "Trois niveaux de gestion locative premium à Nice et sur la Côte d'Azur. Comparez les packs Essentiel, Premium et Signature et choisissez celui qui correspond à l'ambition de votre bien.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesComparator />
      <ServicesPackDetail />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  );
}
