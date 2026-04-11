"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { PACKS } from "@/lib/packs";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Pack } from "@/lib/types";

/**
 * Section 05 : PacksPreview
 * Fond cream. Aperçu des 3 packs Essentiel / Premium / Signature.
 * Premium mis en avant : carte légèrement plus haute, badge or,
 * bordure marquée, glow orb, importée depuis lib/packs.ts (single source).
 */
export function PacksPreview() {
  return (
    <section
      id="packs"
      className="relative isolate overflow-hidden bg-cream text-black"
    >
      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        {/* En-tête centré */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            variants={fadeUp}
            className="eyebrow-cream block"
          >
            Trois niveaux d&apos;exigence
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="sm" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", textWrap: "balance" }}
          >
            Une gestion{" "}
            <span className="italic text-gold-dark">sur mesure</span>, adaptée
            à votre bien.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light mx-auto"
            style={{ maxWidth: "700px", textWrap: "pretty" }}
          >
            Trois packs pour trois niveaux d&apos;ambition. Chacun pensé pour
            optimiser le rendement de votre bien tout en préservant son
            intégrité.
          </motion.p>
        </div>

        {/* Grille 3 packs */}
        <motion.div
          variants={staggerContainer}
          className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:items-start"
        >
          {PACKS.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </motion.div>

        {/* Note conformité */}
        <motion.p
          variants={fadeUp}
          className="mt-14 text-center italic text-[13px] md:text-[14px] text-black/55 font-light"
          style={{ textWrap: "pretty" }}
        >
          Tous les packs incluent la conformité réglementaire complète (loi Le
          Meur, règlement Nice 2026) et notre garantie de satisfaction.
        </motion.p>

        {/* Transition */}
        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function PackCard({ pack }: { pack: Pack }) {
  const isHighlighted = pack.highlighted;

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "relative isolate flex flex-col overflow-hidden backdrop-blur-md transition-[transform,border-color,background-color,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        "bg-white/50 p-10 md:p-12",
        "hover:-translate-y-0.5",
        isHighlighted
          ? "border border-gold-dark/60 shadow-[0_20px_80px_-30px_rgba(138,112,48,0.35)] hover:border-gold-dark/80 lg:-mt-6 lg:mb-6"
          : "border border-gold-border/40 hover:border-gold-dark/60",
      )}
    >
      {isHighlighted && (
        <>
          {/* Glow orb derrière la carte Premium */}
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.55) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          {/* Badge LE PLUS CHOISI */}
          <div className="relative z-10 mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 border border-gold-dark/50 bg-gold-dark/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-gold-dark font-medium">
              <span className="block h-1 w-1 rotate-45 bg-gold-dark" />
              Le plus choisi
              <span className="block h-1 w-1 rotate-45 bg-gold-dark" />
            </span>
          </div>
        </>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Nom du pack */}
        <h3
          className="font-display font-normal text-black leading-none tracking-[0.02em]"
          style={{ fontSize: "clamp(28px, 3vw, 36px)" }}
        >
          {pack.name}
        </h3>
        <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-gold-dark">
          {pack.tagline}
        </p>

        {/* Prix */}
        <div className="mt-8 flex items-baseline gap-3">
          <span
            className="font-display font-light text-gold-dark leading-none"
            style={{ fontSize: "clamp(48px, 5vw, 64px)" }}
          >
            {pack.commission}%
          </span>
          <span className="text-[12px] uppercase tracking-[0.18em] text-black/50 font-medium">
            de commission
          </span>
        </div>

        {/* Description */}
        <p
          className="mt-6 text-[14px] md:text-[15px] leading-[1.7] text-black/65 font-light"
          style={{ textWrap: "pretty" }}
        >
          {pack.description}
        </p>

        {/* Séparateur */}
        <div className="mt-8 h-px w-full bg-gold-dark/20" />

        {/* Liste features */}
        <ul className="mt-8 space-y-3.5 flex-1">
          {pack.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-[13.5px] leading-[1.55] text-black/75"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold-dark/40 bg-gold-dark/5"
              >
                <Check size={11} strokeWidth={2} className="text-gold-dark" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Mini-teaser de rendement : uniquement sur la carte Premium */}
        {isHighlighted && (
          <div className="mt-10 flex flex-col items-center text-center">
            <div className="h-px w-12 bg-gold-dark/30" />
            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.24em] text-gold-dark">
              Exemple de rendement
            </p>
            <p className="mt-3 font-display text-[15px] text-black/80">
              T3 vue mer · Carré d&apos;Or
            </p>
            <p
              className="mt-2 font-display font-light text-gold-dark leading-none tracking-[-0.01em]"
              style={{ fontSize: "clamp(22px, 2.2vw, 26px)" }}
            >
              3&#8239;600 à 4&#8239;400&nbsp;€
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-black/50">
              Net propriétaire / mois
            </p>
            <div className="mt-5 h-px w-12 bg-gold-dark/30" />
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 pt-2">
          <PremiumButton
            href={`/services#${pack.id}`}
            variant={isHighlighted ? "primary" : "secondary"}
            size="md"
            onCream={!isHighlighted}
            className="w-full"
            withArrow
          >
            Voir le détail
          </PremiumButton>
        </div>
      </div>
    </motion.article>
  );
}
