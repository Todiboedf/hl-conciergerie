"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { HLLogo } from "@/components/ui/HLLogo";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { GoldDivider } from "@/components/ui/GoldDivider";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden flex items-start radial-dark grain-overlay"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(var(--header-height) + 1.5rem)",
        paddingBottom: "3.5rem",
      }}
    >
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

      <div className="container-hl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center w-full">
        {/* COLONNE GAUCHE : texte 60% */}
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
            className="font-display font-light text-bone leading-[0.96] tracking-[-0.01em]"
            style={{
              fontSize: "clamp(38px, 7vw, 104px)",
              textWrap: "balance",
            }}
          >
            Maximisez vos{" "}
            <br className="hidden md:block" />
            revenus locatifs{" "}
            <br className="hidden md:block" />
            <span className="italic text-gold/95">
              sans vous en{"\u00A0"}occuper.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 max-w-xl text-[16px] md:text-[17px] leading-relaxed text-bone/75 font-light"
            style={{ textWrap: "pretty" }}
          >
            Une maison de conciergerie haut de gamme dédiée aux propriétaires
            exigeants de la Côte d&apos;Azur. Gestion totale, optimisation continue,
            et la sérénité d&apos;un service hôtelier de prestige, pour votre bien
            comme pour vos hôtes.
          </motion.p>

          {/* Mini-explication Diagnostic : bénéfice en clair */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 max-w-xl flex items-start gap-3"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-gold/40 bg-gold/5"
            >
              <Sparkles size={13} strokeWidth={1.5} className="text-gold" />
            </span>
            <p
              className="text-[14px] md:text-[15px] leading-relaxed text-bone/85 font-light"
              style={{ textWrap: "pretty" }}
            >
              Recevez en 2 minutes une estimation personnalisée du revenu que
              votre bien peut générer à Nice.
            </p>
          </motion.div>

          {/* Micro-label d'argumentaire : déplacé ICI pour ne pas chevaucher le
              scroll indicator "Découvrir" en bas du viewport. */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex items-center gap-6"
          >
            <GoldDivider width="sm" align="left" />
            <p className="text-[11px] uppercase tracking-[0.22em] text-pearl">
              Estimation personnalisée · 2 minutes · sans engagement
            </p>
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center"
          >
            <PremiumButton href="/diagnostic" variant="primary" size="lg" withArrow>
              Diagnostic gratuit
            </PremiumButton>
            <PremiumButton href="/services" variant="secondary" size="lg">
              Découvrir nos packs
            </PremiumButton>
          </motion.div>

          {/* Sous-phrase explicative : nature de l'outil */}
          <motion.p
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 flex items-center gap-2 text-[12.5px] italic text-pearl"
          >
            <span className="text-gold not-italic text-[15px] leading-none">
              ›
            </span>
            Outil intelligent · estimation propriétaire gratuite et sans
            inscription
          </motion.p>
        </div>

        {/* COLONNE DROITE : visual 40% */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="relative aspect-square w-full max-w-[440px]"
          >
            {/* Glow concentré derrière le logo */}
            <div className="glow-orb absolute inset-0 m-auto h-[80%] w-[80%] opacity-90" />

            {/* Cadre or fin avec coins typographiques */}
            <div className="relative aspect-square w-full border border-gold/40 backdrop-blur-sm bg-black/30 flex items-center justify-center">
              {/* Coins ornementaux */}
              <CornerOrnament className="absolute -top-px -left-px" />
              <CornerOrnament className="absolute -top-px -right-px rotate-90" />
              <CornerOrnament className="absolute -bottom-px -right-px rotate-180" />
              <CornerOrnament className="absolute -bottom-px -left-px -rotate-90" />

              <div className="flex flex-col items-center gap-6 sm:gap-8 px-5 sm:px-8 py-8 sm:py-10 w-full">
                <HLLogo variant="gold" size={300} priority />
                <div className="flex flex-col items-center gap-2 w-full">
                  <GoldDivider width="sm" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.32em] text-pearl text-center">
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
                Nice · France
              </span>
            </div>

            {/* Mini-card preuve sociale : chiffre clef du marché Nice.
                Volontairement secondaire visuellement par rapport au cadre logo. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 1,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="mt-6 ml-auto w-full max-w-[280px] border border-gold/25 bg-white/[0.035] backdrop-blur-md px-5 sm:px-6 py-5"
            >
              <div
                className="font-display font-light text-gold-dark leading-none tracking-[-0.015em] break-words"
                style={{ fontSize: "clamp(32px, 8.5vw, 48px)" }}
              >
                37&#8239;000&nbsp;€
              </div>
              <p className="mt-3 text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-pearl leading-[1.5]">
                Revenu médian annuel d&apos;un bien géré à Nice
              </p>
              <p className="mt-2 italic text-[10px] text-pearl/60 leading-none">
                Source&nbsp;: Airbtics 2025
              </p>
            </motion.div>
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
