"use client";

import { motion } from "framer-motion";
import { Car, Sparkles, Compass, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface Partner {
  name: string;
  category: string;
  description: string;
  url?: string;
  icon: LucideIcon;
}

const PARTNERS: Partner[] = [
  {
    name: "AVservice",
    category: "Conciergerie & véhicules",
    description:
      "Services de conciergerie et flotte de véhicules pour les transferts et déplacements de nos voyageurs.",
    url: "https://avservice06.com",
    icon: Sparkles,
  },
  {
    name: "Rune Club",
    category: "Agence événementielle",
    description:
      "Conception et coordination d'expériences sur mesure : soirées privées, événements de prestige, séjours signature.",
    url: "https://www.runeclub.eu",
    icon: Sparkles,
  },
  {
    name: "Service Taxi",
    category: "Transport",
    description:
      "Transferts aéroport, courses et transport privé pour vos hôtes, à toute heure, dans toute la métropole niçoise.",
    icon: Car,
  },
  {
    name: "Excursions Nice",
    category: "Excursions & activités",
    description:
      "Sélection d'excursions, sorties en mer et activités haut de gamme pour faire vivre la Côte d'Azur à vos voyageurs.",
    icon: Compass,
  },
];

/**
 * Section Partenaires. Fond noir, accents or, cartes en verre fumé
 * cohérentes avec Testimonials. Liens cliquables vers les sites
 * partenaires quand disponibles, sinon carte non interactive.
 */
export function Partners() {
  return (
    <section
      id="partenaires"
      className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
    >
      <div className="glow-orb h-[480px] w-[480px] top-1/3 -left-32 opacity-25" />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
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
            className="mt-6 font-display font-light text-bone leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", textWrap: "balance" }}
          >
            Une maison entourée{" "}
            <span className="italic text-gold/95">des bons artisans</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-[15px] md:text-[16px] leading-[1.8] text-pearl font-light mx-auto"
            style={{ maxWidth: "700px", textWrap: "pretty" }}
          >
            La qualité d&apos;un séjour ne se joue pas que sur le bien. Elle se
            joue aussi sur le transport, les expériences, les services autour.
            Nous travaillons avec un cercle restreint de partenaires triés sur
            le volet pour leur exigence et leur fiabilité.
          </motion.p>
        </div>

        {/* Grille partenaires : 1 / 2 / 4 colonnes */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {PARTNERS.map((partner) => {
            const Icon = partner.icon;
            const cardClasses =
              "group relative flex h-full flex-col border border-white/10 bg-white/[0.03] backdrop-blur-sm p-7 md:p-8 transition-[transform,border-color,background-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white/[0.05] will-change-transform";

            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center border border-gold/40 bg-gold/[0.05] transition-all duration-500 group-hover:border-gold/70 group-hover:bg-gold/10">
                    <Icon
                      size={19}
                      strokeWidth={1.4}
                      className="text-gold/95"
                    />
                  </span>

                  {partner.url ? (
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.4}
                      className="text-gold/60 transition-all duration-500 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>

                <h3
                  className="mt-7 font-display font-normal text-bone leading-tight"
                  style={{
                    fontSize: "clamp(20px, 2vw, 24px)",
                    textWrap: "balance",
                  }}
                >
                  {partner.name}
                </h3>

                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-gold/85">
                  {partner.category}
                </p>

                <div className="mt-4 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-16" />

                <p
                  className="mt-4 text-[14px] leading-[1.65] text-pearl font-light"
                  style={{ textWrap: "pretty" }}
                >
                  {partner.description}
                </p>

                {partner.url ? (
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold/85 transition-colors duration-500 group-hover:text-gold">
                    Découvrir
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
          className="mt-14 text-center text-[13px] uppercase tracking-[0.22em] text-gold/70"
        >
          · Cercle ouvert aux partenaires d&apos;exception ·
        </motion.p>

        {/* Transition */}
        <motion.div variants={fadeUp} className="mt-12">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
