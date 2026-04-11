import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutName } from "@/components/about/AboutName";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutCompliance } from "@/components/about/AboutCompliance";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "Notre maison · Histoire, équipe, valeurs",
  description:
    "Découvrez H&L Conciergerie : l'histoire de la maison, ses deux co-fondateurs Guillaume Haas et Henry Lieater, ses valeurs, et son engagement de conformité réglementaire à Nice.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutName />
      <AboutTeam />
      <AboutValues />
      <AboutCompliance />
      <AboutCTA />
    </>
  );
}
