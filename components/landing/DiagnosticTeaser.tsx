"use client";

import { motion } from "framer-motion";
import { MapPin, TrendingUp, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface MiniFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: MiniFeature[] = [
  {
    icon: MapPin,
    title: "Quartier par quartier",
    description:
      "Analyse de votre adresse avec les tendances réelles de chaque zone de Nice et de la Côte d'Azur.",
  },
  {
    icon: TrendingUp,
    title: "Yield optimisé",
    description:
      "Croisement ADR, saisonnalité et taux d'occupation pour calibrer la fourchette de revenus attendue.",
  },
  {
    icon: FileText,
    title: "Recommandations personnalisées",
    description:
      "Points forts, leviers d'optimisation concrets et pack H&L le plus adapté à votre bien.",
  },
];

/**
 * Section 06 : DiagnosticTeaser
 * Section pleine largeur très sombre avec glow orbs majeurs.
 * C'est le lead magnet principal du site : CTA vers /diagnostic.
 */
export function DiagnosticTeaser() {
  return (
    <section
      id="diagnostic-teaser"
      className="relative isolate overflow-hidden bg-black grain-overlay"
      style={{
        background:
          "radial-gradient(ellipse at center, #131313 0%, #0A0A0A 70%)",
      }}
    >
      {/* Glow orbs majeurs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-28 md:py-40 lg:py-44 text-center"
      >
        <motion.span variants={fadeUp} className="eyebrow block">
          Diagnostic propriétaire
        </motion.span>

        <motion.div variants={fadeUp} className="mt-8">
          <GoldDivider width="md" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mx-auto mt-10 font-display font-light text-bone leading-[1.02] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            maxWidth: "900px",
            textWrap: "balance",
          }}
        >
          Combien votre bien peut-il vraiment rapporter à{" "}
          <span className="italic text-gold/95">Nice</span>&nbsp;?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-10 text-[16px] md:text-[18px] leading-[1.75] text-pearl font-light"
          style={{ maxWidth: "720px", textWrap: "pretty" }}
        >
          Notre outil intelligent croise les données réelles du marché niçois
          (ADR, occupation, saisonnalité, quartier) avec les caractéristiques
          de votre bien pour vous fournir une estimation personnalisée.
          Gratuit, sans inscription, en deux minutes.
        </motion.p>

        {/* 3 mini-features */}
        <motion.ul
          variants={staggerContainer}
          className="mx-auto mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
          style={{ maxWidth: "960px" }}
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.li
                key={feat.title}
                variants={fadeUp}
                className="flex flex-col items-center text-center px-2"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-gold/40 bg-gold/5 mb-4">
                  <Icon
                    size={17}
                    strokeWidth={1.4}
                    className="text-gold"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="font-display text-[20px] text-bone leading-tight">
                  {feat.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-pearl/90 font-light">
                  {feat.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* CTA principal */}
        <motion.div variants={fadeUp} className="mt-16">
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
          Aucune carte bancaire requise · Vos données restent confidentielles
        </motion.p>

        {/* Transition */}
        <motion.div variants={fadeUp} className="mt-24">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
