"use client";

import { motion } from "framer-motion";
import { HLMonogram } from "@/components/ui/HLMonogram";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { GoldDivider } from "@/components/ui/GoldDivider";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden min-h-screen flex items-center radial-dark grain-overlay pt-32 lg:pt-28">
      {/* Glow orbs ambiance */}
      <div className="glow-orb h-[600px] w-[600px] -top-40 -left-40 opacity-50" />
      <div className="glow-orb h-[700px] w-[700px] top-1/3 -right-60 opacity-60" />

      {/* Pattern points dorés très subtils en fond */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container-hl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pb-20">
        {/* COLONNE GAUCHE — texte 60% */}
        <div className="lg:col-span-7 max-w-2xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 mb-8"
          >
            <span className="block h-px w-12 bg-gold" />
            <span className="eyebrow">Conciergerie · Nice &amp; Côte d&apos;Azur</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display font-light text-bone leading-[0.95] tracking-[-0.01em]"
            style={{ fontSize: "clamp(48px, 7vw, 110px)" }}
          >
            Maximisez vos
            <br />
            revenus locatifs
            <br />
            <span className="italic text-gold/95">sans vous en occuper.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 max-w-xl text-[16px] md:text-[17px] leading-relaxed text-bone/75 font-light"
          >
            Une maison de conciergerie haut de gamme dédiée aux propriétaires exigeants
            de la Côte d&apos;Azur. Gestion totale, optimisation continue, et la sérénité
            d&apos;un service hôtelier de prestige — pour votre bien comme pour vos hôtes.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center"
          >
            <PremiumButton href="/diagnostic" variant="primary" size="lg" withArrow>
              Diagnostic gratuit
            </PremiumButton>
            <PremiumButton href="/services" variant="secondary" size="lg">
              Découvrir nos packs
            </PremiumButton>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-14 flex items-center gap-6"
          >
            <GoldDivider width="sm" align="left" />
            <p className="text-[11px] uppercase tracking-[0.22em] text-pearl">
              Estimation personnalisée · 2 minutes · sans engagement
            </p>
          </motion.div>
        </div>

        {/* COLONNE DROITE — visual 40% */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="relative aspect-square w-full max-w-[440px]"
          >
            {/* Glow concentré derrière le monogramme */}
            <div className="glow-orb absolute inset-0 m-auto h-[80%] w-[80%] opacity-90" />

            {/* Cadre or fin avec coins typographiques */}
            <div className="relative aspect-square w-full border border-gold/40 backdrop-blur-sm bg-black/30 flex items-center justify-center">
              {/* Coins ornementaux */}
              <CornerOrnament className="absolute -top-px -left-px" />
              <CornerOrnament className="absolute -top-px -right-px rotate-90" />
              <CornerOrnament className="absolute -bottom-px -right-px rotate-180" />
              <CornerOrnament className="absolute -bottom-px -left-px -rotate-90" />

              <div className="flex flex-col items-center gap-6 px-8">
                <HLMonogram size={180} withRing />
                <div className="flex flex-col items-center gap-2">
                  <span className="font-display text-2xl tracking-[0.18em] text-bone">
                    HARMONIE &amp; LUXE
                  </span>
                  <GoldDivider width="sm" />
                  <span className="text-[10px] uppercase tracking-[0.32em] text-pearl">
                    Maison fondée en 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Étiquette décorative en bas */}
            <div className="mt-6 flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-[0.22em] text-pearl/70">
                01 · Hero
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-pearl/70">
                Nice — France
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicateur scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.32em] text-pearl/70">
          Découvrir
        </span>
        <span className="block h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-4 w-4 ${className ?? ""}`}
      style={{
        borderTop: "1px solid #C9A84C",
        borderLeft: "1px solid #C9A84C",
      }}
    />
  );
}
