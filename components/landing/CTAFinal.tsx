"use client";

import { motion } from "framer-motion";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { HLLogo } from "@/components/ui/HLLogo";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * Section 10 : CTAFinal
 * Dernière section de la landing. Fond noir profond, glow orbs majeurs,
 * grain overlay. Logo H&L discret au centre, grand titre, deux CTAs
 * (diagnostic + contact), réassurance finale.
 */
export function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="relative isolate overflow-hidden bg-black grain-overlay"
      style={{
        background:
          "radial-gradient(ellipse at center, #151515 0%, #0A0A0A 75%)",
      }}
    >
      {/* Glow orbs majeurs */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 h-[720px] w-[720px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 h-[720px] w-[720px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Pattern points dorés en fond */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-28 md:py-40 lg:py-44 text-center"
      >
        {/* Logo discret en haut */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <HLLogo variant="gold" size={130} />
        </motion.div>

        <motion.span
          variants={fadeUp}
          className="eyebrow block mt-10"
        >
          Prêt à commencer
        </motion.span>

        <motion.div variants={fadeUp} className="mt-6">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-bone leading-[1.02] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            maxWidth: "880px",
            textWrap: "balance",
          }}
        >
          Confiez votre bien à une maison qui{" "}
          <span className="italic text-gold/95">le mérite</span>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-10 text-[16px] md:text-[18px] leading-[1.75] text-pearl font-light"
          style={{ maxWidth: "640px", textWrap: "pretty" }}
        >
          Que vous souhaitiez maximiser le rendement d&apos;un investissement
          locatif ou simplement déléguer la gestion de votre résidence
          secondaire en toute sérénité, nous serons honorés de vous
          accompagner.
        </motion.p>

        {/* 2 CTAs */}
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
          <PremiumButton href="/contact" variant="ghost" size="lg">
            Nous contacter
          </PremiumButton>
        </motion.div>

        {/* Réassurance finale */}
        <motion.p
          variants={fadeUp}
          className="mt-10 italic text-[13px] text-pearl/80 font-light"
          style={{ textWrap: "pretty" }}
        >
          Réponse personnelle sous 24 heures · Rendez-vous physique ou
          visioconférence · Aucun engagement à ce stade
        </motion.p>
      </motion.div>
    </section>
  );
}
