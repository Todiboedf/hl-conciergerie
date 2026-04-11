"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Hero de la page /services. Fond noir, glow orbs ambiants,
 * eyebrow + titre serif + sous-titre + GoldDivider de transition.
 */
export function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-black radial-dark grain-overlay">
      <div className="glow-orb h-[600px] w-[600px] -top-40 -left-32 opacity-45" />
      <div className="glow-orb h-[500px] w-[500px] -bottom-32 right-0 opacity-35" />

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
          Nos offres
        </motion.span>

        <motion.div variants={fadeUp} className="mt-8">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-bone leading-[1.02] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            maxWidth: "980px",
            textWrap: "balance",
          }}
        >
          Trois packs pour trois niveaux{" "}
          <span className="italic text-gold/95">d&apos;exigence</span>.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-10 text-[16px] md:text-[17px] leading-[1.8] text-pearl font-light"
          style={{ maxWidth: "700px", textWrap: "pretty" }}
        >
          Chaque bien a sa personnalité. Chaque propriétaire a ses priorités.
          C&apos;est pourquoi H&amp;L propose trois niveaux de service, pensés
          pour s&apos;adapter à votre ambition et à la singularité de votre
          logement.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-16">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
