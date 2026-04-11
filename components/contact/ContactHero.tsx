"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Hero de la page /contact. Fond noir. Plus court que les autres
 * hero (py-24 au lieu de py-32) pour rapprocher le formulaire.
 */
export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-black radial-dark grain-overlay">
      <div className="glow-orb h-[560px] w-[560px] -top-40 left-1/2 -translate-x-1/2 opacity-45" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container-hl relative z-10 text-center"
        style={{
          paddingTop: "calc(var(--header-height) + 5rem)",
          paddingBottom: "7rem",
        }}
      >
        <motion.span variants={fadeUp} className="eyebrow block">
          Prendre contact
        </motion.span>

        <motion.div variants={fadeUp} className="mt-8">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-bone leading-[1.02] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            maxWidth: "880px",
            textWrap: "balance",
          }}
        >
          Parlons de{" "}
          <span className="italic text-gold/95">votre bien</span>.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-10 text-[16px] md:text-[17px] leading-[1.8] text-pearl font-light"
          style={{ maxWidth: "680px", textWrap: "pretty" }}
        >
          Nous répondons personnellement à chaque demande sous 24 heures.
          Dites-nous en quelques mots ce qui vous amène, et nous reviendrons
          vers vous avec nos premières pistes.
        </motion.p>
      </motion.div>
    </section>
  );
}
