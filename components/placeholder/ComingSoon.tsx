"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { HLLogo } from "@/components/ui/HLLogo";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description: string;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
}

/**
 * Écran "Page bientôt disponible" on-brand H&L. Fond noir profond
 * avec grand glow central, logo H&L discret en haut, mention
 * "Chapitre à venir", titre serif géant, description courte et
 * double CTA qui renvoient vers les pages fonctionnelles existantes.
 * Sert de placeholder élégant pour /proprietaires et /voyageurs
 * jusqu'à ce que leurs contenus dédiés soient produits.
 */
export function ComingSoon({
  eyebrow,
  title,
  italicWord,
  description,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
}: ComingSoonProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-black grain-overlay flex items-center"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(var(--header-height) + 4rem)",
        paddingBottom: "6rem",
        background:
          "radial-gradient(ellipse at center, #151515 0%, #0A0A0A 70%)",
      }}
    >
      {/* Glow orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-32 h-[700px] w-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-32 h-[700px] w-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Pattern points dorés */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container-hl relative z-10 text-center"
      >
        {/* Logo discret en haut */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <HLLogo variant="gold" size={110} />
        </motion.div>

        <motion.span variants={fadeUp} className="eyebrow block mt-10">
          {eyebrow}
        </motion.span>

        <motion.div variants={fadeUp} className="mt-6">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-bone leading-[1.02] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(40px, 7vw, 96px)",
            maxWidth: "900px",
            textWrap: "balance",
          }}
        >
          {italicWord ? (
            <>
              {title.split(italicWord)[0]}
              <span className="italic text-gold/95">{italicWord}</span>
              {title.split(italicWord)[1]}
            </>
          ) : (
            title
          )}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-10 text-[16px] md:text-[17px] leading-[1.8] text-pearl font-light"
          style={{ maxWidth: "680px", textWrap: "pretty" }}
        >
          {description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PremiumButton
            href={primaryCtaHref}
            variant="primary"
            size="lg"
            withArrow
          >
            {primaryCtaLabel}
          </PremiumButton>
          <PremiumButton
            href={secondaryCtaHref}
            variant="secondary"
            size="lg"
          >
            {secondaryCtaLabel}
          </PremiumButton>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-10 text-[11px] uppercase tracking-[0.22em] text-pearl/70"
        >
          Chapitre à paraître · Maison fondée en 2026
        </motion.p>
      </motion.div>
    </section>
  );
}
