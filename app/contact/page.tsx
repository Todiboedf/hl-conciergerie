import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactSection } from "@/components/contact/ContactSection";
import { ContactAltCTA } from "@/components/contact/ContactAltCTA";

export const metadata: Metadata = {
  title: "Contact · Parlons de votre bien",
  description:
    "Prenez contact avec H&L Conciergerie. Nous répondons personnellement à chaque demande sous 24 heures, pour les propriétaires de Nice et de la Côte d'Azur.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactAltCTA />
    </>
  );
}
