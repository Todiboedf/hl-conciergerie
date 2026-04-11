"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * Bandeau CTA alternatif en bas de /contact : pour les propriétaires
 * qui ne savent pas par où commencer, proposer le diagnostic comme
 * point d'entrée plus confortable.
 */
export function ContactAltCTA() {
  return (
    <section
      className="relative isolate overflow-hidden bg-black grain-overlay"
      style={{
        background:
          "radial-gradient(ellipse at center, #151515 0%, #0A0A0A 75%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-24 h-[560px] w-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-24 h-[560px] w-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32 text-center"
      >
        <motion.span variants={fadeUp} className="eyebrow block">
          Autre option
        </motion.span>

        <motion.div variants={fadeUp} className="mt-8">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-bone leading-[1.1] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            maxWidth: "780px",
            textWrap: "balance",
          }}
        >
          Si vous préférez commencer par une{" "}
          <span className="italic text-gold/95">estimation</span>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 text-[15px] md:text-[16px] leading-[1.8] text-pearl font-light"
          style={{ maxWidth: "600px", textWrap: "pretty" }}
        >
          Notre outil de diagnostic vous donne en deux minutes une première
          estimation du revenu que votre bien peut générer à Nice, et vous
          permet d&apos;entamer la conversation avec des éléments concrets.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12">
          <PremiumButton
            href="/diagnostic"
            variant="primary"
            size="lg"
            withArrow
          >
            Lancer mon diagnostic
          </PremiumButton>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-[12px] uppercase tracking-[0.22em] text-pearl/70"
        >
          Gratuit · Sans inscription · 2 minutes
        </motion.p>
      </motion.div>
    </section>
  );
}
