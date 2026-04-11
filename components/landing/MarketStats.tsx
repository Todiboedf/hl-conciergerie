"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { MARKET_STATS, BENCHMARKS_SOURCE_NOTE } from "@/lib/benchmarks";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * Section 03 : MarketStats
 * Fond cream. Quatre chiffres clés du marché niçois, sourcés.
 * Grille 2x2 mobile, 4 colonnes desktop. Glassmorphism cream.
 */
export function MarketStats() {
  return (
    <section
      id="market"
      className="relative isolate overflow-hidden bg-cream text-black"
    >
      {/* Pattern points dorés très subtils en fond */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #8A7030 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        {/* En-tête section */}
        <div className="max-w-3xl">
          <motion.span
            variants={fadeUp}
            className="eyebrow-cream block"
          >
            Le marché de Nice en chiffres
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", textWrap: "balance" }}
          >
            Nice, l&apos;un des marchés les plus{" "}
            <span className="italic text-gold-dark">performants</span> de
            France.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
            style={{ maxWidth: "700px", textWrap: "pretty" }}
          >
            Plus de dix millions de visiteurs chaque année, une saison qui
            s&apos;étend de février à octobre, un marché locatif courte durée
            parmi les plus matures d&apos;Europe. Ces chiffres, sourcés sur les
            benchmarks référents du secteur, expliquent pourquoi Nice attire
            autant d&apos;investisseurs, et pourquoi la gestion y fait toute la
            différence.
          </motion.p>
        </div>

        {/* Grille 4 chiffres */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {MARKET_STATS.map((stat) => (
            <motion.article
              key={stat.label}
              variants={fadeUp}
              className="group relative overflow-hidden border border-gold-border/60 bg-white/40 backdrop-blur-md p-8 md:p-10 transition-[transform,border-color,background-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-dark/70 hover:bg-white/60 will-change-transform"
            >
              <div
                className="font-display font-light text-gold-dark leading-none tracking-[-0.02em]"
                style={{ fontSize: "clamp(48px, 5.5vw, 80px)" }}
              >
                {stat.value}
              </div>

              <div className="mt-5 h-px w-10 bg-gold-dark/40 transition-all duration-500 group-hover:w-16" />

              <p className="mt-5 text-[13px] md:text-[14px] leading-[1.55] text-black/70 font-light">
                {stat.label}
              </p>

              {stat.source && (
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/40">
                  {stat.source}
                </p>
              )}
            </motion.article>
          ))}
        </motion.div>

        {/* Note de sources */}
        <motion.p
          variants={fadeUp}
          className="mt-12 italic text-[12px] text-black/40 font-light"
        >
          {BENCHMARKS_SOURCE_NOTE}
        </motion.p>

        {/* Transition */}
        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
