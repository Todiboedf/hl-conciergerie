"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * CTA final de la page /a-propos. Fond cream pour rompre le rythme
 * avec la section compliance (fond noir). Deux CTAs qui mènent vers
 * le contact et le diagnostic.
 */
export function AboutCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-cream text-black">
      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="eyebrow-cream block"
        >
          Rencontrer la maison
        </motion.span>

        <motion.div variants={fadeUp} className="mt-6">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-black leading-[1.05] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            maxWidth: "820px",
            textWrap: "balance",
          }}
        >
          Parlons de votre bien,{" "}
          <span className="italic text-gold-dark">en toute confiance</span>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 text-[15px] md:text-[16px] leading-[1.8] text-black/65 font-light"
          style={{ maxWidth: "640px", textWrap: "pretty" }}
        >
          Si notre manière de faire résonne avec ce que vous cherchez pour
          votre bien, nous serons honorés d&apos;échanger avec vous. Sans
          engagement, sans pression, dans la posture qui nous anime au
          quotidien.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PremiumButton href="/contact" variant="primary" size="lg" withArrow>
            Nous contacter
          </PremiumButton>
          <PremiumButton href="/diagnostic" variant="secondary" size="lg">
            Lancer mon diagnostic
          </PremiumButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
