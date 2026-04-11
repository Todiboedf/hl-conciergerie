"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Hero de la page /a-propos. Fond noir, glow orbs ambiants.
 * Ton confidentiel : pas de superlatifs marketing, une promesse
 * d'élégance et d'exigence formulée sobrement.
 */
export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-black radial-dark grain-overlay">
      <div className="glow-orb h-[600px] w-[600px] -top-40 -right-32 opacity-40" />
      <div className="glow-orb h-[500px] w-[500px] -bottom-32 -left-24 opacity-30" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container-hl relative z-10 text-center"
        style={{
          paddingTop: "calc(var(--header-height) + 6rem)",
          paddingBottom: "8rem",
        }}
      >
        <motion.span variants={fadeUp} className="eyebrow block">
          Notre maison
        </motion.span>

        <motion.div variants={fadeUp} className="mt-8">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-bone leading-[1.02] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            maxWidth: "920px",
            textWrap: "balance",
          }}
        >
          Une maison fondée sur{" "}
          <span className="italic text-gold/95">l&apos;exigence</span>.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-10 text-[16px] md:text-[17px] leading-[1.8] text-pearl font-light"
          style={{ maxWidth: "720px", textWrap: "pretty" }}
        >
          H&amp;L Conciergerie est née d&apos;une conviction&nbsp;: la gestion
          locative premium mérite bien mieux qu&apos;une plateforme
          standardisée. Voici comment nous incarnons cette exigence au
          quotidien.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-16">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
