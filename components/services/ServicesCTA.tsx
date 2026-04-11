"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * CTA final de la page /services. Fond noir profond avec glow orbs
 * majeurs. Deux CTAs : diagnostic (lead magnet) + contact (rendez-vous
 * de qualification).
 */
export function ServicesCTA() {
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
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[720px] w-[720px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-28 md:py-36 text-center"
      >
        <motion.span variants={fadeUp} className="eyebrow block">
          Un accompagnement sur mesure
        </motion.span>

        <motion.div variants={fadeUp} className="mt-8">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-bone leading-[1.05] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            maxWidth: "820px",
            textWrap: "balance",
          }}
        >
          Une question sur le pack qui vous{" "}
          <span className="italic text-gold/95">conviendrait</span>&#8239;?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-10 text-[16px] md:text-[17px] leading-[1.8] text-pearl font-light"
          style={{ maxWidth: "640px", textWrap: "pretty" }}
        >
          Prenez quelques minutes pour nous parler de votre bien. Nous vous
          recommanderons le pack le plus adapté, en toute honnêteté, et
          sans engagement de votre part.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PremiumButton
            href="/diagnostic"
            variant="primary"
            size="lg"
            withArrow
          >
            Lancer mon diagnostic
          </PremiumButton>
          <PremiumButton href="/contact" variant="secondary" size="lg">
            Nous contacter
          </PremiumButton>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-10 text-[12px] uppercase tracking-[0.22em] text-pearl/70"
        >
          Réponse personnelle sous 24 heures · Sans engagement
        </motion.p>
      </motion.div>
    </section>
  );
}
