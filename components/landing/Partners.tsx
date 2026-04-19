"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface Partner {
  name: string;
  category: string;
  description: string;
  url?: string;
  visual: ReactNode;
}

const TaxiMark = (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.1}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-full w-full"
    aria-hidden="true"
  >
    <path d="M8 42 L12 28 C13 24 16 22 20 22 L44 22 C48 22 51 24 52 28 L56 42" />
    <path d="M6 42 L58 42 L58 48 L50 48 L50 46 L14 46 L14 48 L6 48 Z" />
    <circle cx="17" cy="46" r="3.2" />
    <circle cx="47" cy="46" r="3.2" />
    <path d="M22 22 L22 14 L42 14 L42 22" />
    <path d="M26 18 L38 18" />
    <rect x="28" y="8" width="8" height="4" />
    <path d="M14 32 L20 32 M44 32 L50 32" opacity="0.55" />
  </svg>
);

const ExcursionsMark = (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.1}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-full w-full"
    aria-hidden="true"
  >
    <path d="M32 8 L32 40" />
    <path d="M32 12 L48 36 L32 36 Z" />
    <path d="M32 16 L20 36 L32 36 Z" />
    <path d="M14 42 L50 42 L46 50 L18 50 Z" />
    <path d="M6 54 Q12 51 18 54 T30 54 T42 54 T54 54 T60 54" opacity="0.75" />
    <path d="M4 58 Q10 55 16 58 T28 58 T40 58 T52 58 T62 58" opacity="0.5" />
    <circle cx="32" cy="8" r="1.4" fill="currentColor" />
  </svg>
);

const PARTNERS: Partner[] = [
  {
    name: "AVservice",
    category: "Conciergerie & véhicules",
    description:
      "Services de conciergerie et flotte de véhicules pour les transferts et déplacements de nos voyageurs.",
    url: "https://avservice06.com",
    visual: (
      <Image
        src="/partners/avservice.png"
        alt="Logo AVservice"
        width={220}
        height={220}
        sizes="220px"
        quality={95}
        className="h-full w-auto object-contain drop-shadow-[0_0_24px_rgba(201,168,76,0.18)]"
      />
    ),
  },
  {
    name: "Rune Club",
    category: "Agence événementielle",
    description:
      "Conception et coordination d'expériences sur mesure : soirées privées, événements de prestige, séjours signature.",
    url: "https://www.runeclub.eu",
    visual: (
      <Image
        src="/partners/rune-club.png"
        alt="Logo Rune Club"
        width={220}
        height={220}
        sizes="220px"
        quality={95}
        className="h-full w-auto object-contain drop-shadow-[0_0_24px_rgba(201,168,76,0.25)]"
      />
    ),
  },
  {
    name: "Service Taxi",
    category: "Transport",
    description:
      "Transferts aéroport, courses et transport privé pour vos hôtes, à toute heure, dans toute la métropole niçoise.",
    visual: (
      <span className="block h-full w-full text-gold/90 drop-shadow-[0_0_20px_rgba(201,168,76,0.22)]">
        {TaxiMark}
      </span>
    ),
  },
  {
    name: "Excursions Nice",
    category: "Excursions & activités",
    description:
      "Sélection d'excursions, sorties en mer et activités haut de gamme pour faire vivre la Côte d'Azur à vos voyageurs.",
    visual: (
      <span className="block h-full w-full text-gold/90 drop-shadow-[0_0_20px_rgba(201,168,76,0.22)]">
        {ExcursionsMark}
      </span>
    ),
  },
];

/**
 * Section Partenaires. Fond dédié plus profond avec accent doré,
 * cartes plus grandes en grille 2x2, hover marqué (scale + glow or).
 * Logos réels centrés, séparateurs or avant/après la section.
 */
export function Partners() {
  return (
    <section
      id="partenaires"
      className="relative isolate overflow-hidden bg-black grain-overlay"
    >
      {/* Séparateur ornemental haut */}
      <div className="relative z-10 pt-20 md:pt-24">
        <GoldDivider width="lg" />
      </div>

      {/* Fond signature : radial profond + halo doré central */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.09) 0%, rgba(19,19,19,0.6) 35%, #0A0A0A 72%)",
        }}
      />
      <div className="glow-orb h-[620px] w-[620px] top-1/4 -left-40 opacity-30" />
      <div className="glow-orb h-[520px] w-[520px] bottom-0 -right-32 opacity-25" />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-20 md:py-28"
      >
        {/* En-tête centré */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.span variants={fadeUp} className="eyebrow block">
            Notre cercle de partenaires
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="sm" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display font-light text-bone leading-[1.02] tracking-[-0.015em]"
            style={{ fontSize: "clamp(40px, 5.2vw, 72px)", textWrap: "balance" }}
          >
            Une maison entourée{" "}
            <span className="italic text-gold/95">des bons artisans</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[13px] md:text-[14px] uppercase tracking-[0.28em] text-gold/80"
          >
            Un réseau trié sur le volet · Nice · Côte d&apos;Azur
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-[15px] md:text-[16px] leading-[1.8] text-pearl font-light mx-auto"
            style={{ maxWidth: "680px", textWrap: "pretty" }}
          >
            La qualité d&apos;un séjour ne se joue pas que sur le bien. Elle se
            joue aussi sur le transport, les expériences, les services autour.
            Nous travaillons avec un cercle restreint de partenaires choisis
            pour leur exigence et leur fiabilité.
          </motion.p>
        </div>

        {/* Grille partenaires : 1 / 2 colonnes */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {PARTNERS.map((partner) => {
            const cardClasses =
              "group relative flex h-full flex-col items-center text-center border border-gold/20 bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-sm p-10 md:p-12 transition-[transform,border-color,box-shadow,background-color] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.015] hover:border-gold/60 hover:bg-white/[0.05] hover:shadow-[0_30px_80px_-20px_rgba(201,168,76,0.35),0_0_0_1px_rgba(201,168,76,0.25)] will-change-transform overflow-hidden";

            const inner = (
              <>
                {/* Glow interne au hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%)",
                  }}
                />

                {/* Indicateur lien externe */}
                {partner.url ? (
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.4}
                    className="absolute top-5 right-5 text-gold/50 transition-all duration-500 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                ) : null}

                {/* Zone logo — grande, centrée */}
                <div className="relative flex h-28 md:h-32 w-full items-center justify-center">
                  <div className="flex h-full max-h-32 w-auto items-center justify-center transition-transform duration-700 group-hover:scale-105">
                    {partner.visual}
                  </div>
                </div>

                {/* Séparateur or sous le logo */}
                <div className="mt-7 h-px w-12 bg-gold/50 transition-all duration-500 group-hover:w-24 group-hover:bg-gold" />

                <h3
                  className="mt-6 font-display font-normal text-bone leading-tight"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 28px)",
                    textWrap: "balance",
                  }}
                >
                  {partner.name}
                </h3>

                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-gold/85">
                  {partner.category}
                </p>

                <p
                  className="mt-5 text-[14px] leading-[1.65] text-pearl font-light max-w-sm"
                  style={{ textWrap: "pretty" }}
                >
                  {partner.description}
                </p>

                {partner.url ? (
                  <span className="mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold/85 transition-colors duration-500 group-hover:text-gold">
                    Découvrir la maison
                  </span>
                ) : null}
              </>
            );

            return (
              <motion.div
                key={partner.name}
                variants={fadeUp}
                className="h-full"
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visiter le site de ${partner.name} (nouvel onglet)`}
                    className={cardClasses}
                  >
                    {inner}
                  </a>
                ) : (
                  <article className={cardClasses} aria-label={partner.name}>
                    {inner}
                  </article>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-16 text-center text-[13px] uppercase tracking-[0.22em] text-gold/70"
        >
          · Cercle ouvert aux partenaires d&apos;exception ·
        </motion.p>
      </motion.div>

      {/* Séparateur ornemental bas */}
      <div className="relative z-10 pb-20 md:pb-24">
        <GoldDivider width="lg" />
      </div>
    </section>
  );
}
