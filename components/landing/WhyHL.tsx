"use client";

import { motion } from "framer-motion";
import { Award, Cpu, ShieldCheck, Users, LineChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    icon: Award,
    title: "Maison locale et exigeante",
    description:
      "Ancrés à Nice, nous connaissons chaque quartier, chaque préfecture, chaque particularité du marché azuréen. Notre équipe terrain assure une exécution irréprochable, à proximité directe de votre bien.",
  },
  {
    icon: Cpu,
    title: "Une technologie au service du détail",
    description:
      "Channel manager, pricing dynamique, outils propriétaires alimentés par l'intelligence artificielle. Notre pile technique maximise le rendement de chaque séjour tout en préservant votre temps.",
  },
  {
    icon: ShieldCheck,
    title: "La conformité comme socle",
    description:
      "Expertise du règlement Nice 2026, de la loi Le Meur, des déclarations LMNP et des obligations préfectorales. Votre bien est géré dans le strict respect du cadre légal, sans stress administratif de votre côté.",
  },
  {
    icon: Users,
    title: "Un réseau choisi avec exigence",
    description:
      "Ménage, linge, artisans, restaurants, activités : chaque partenaire est choisi avec l'exigence d'un hôtelier cinq étoiles. Vos hôtes bénéficient d'une expérience irréprochable, votre bien reste en parfait état.",
  },
  {
    icon: LineChart,
    title: "Une transparence totale, sans zone d'ombre",
    description:
      "Tableau de bord en temps réel, comptes-rendus détaillés, rendez-vous réguliers. Vous savez tout de ce qui se passe dans votre bien. Nos propriétaires ne découvrent jamais leur reporting en fin de mois.",
  },
];

/**
 * Section 07 : WhyHL
 * Fond cream. Cinq raisons de choisir H&L, une par carte.
 * Layout responsive : 1 col mobile, 2 col tablet, 3 col desktop,
 * la 5ème carte centrée sur desktop.
 */
export function WhyHL() {
  return (
    <section
      id="why-hl"
      className="relative isolate overflow-hidden bg-cream text-black"
    >
      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        {/* En-tête */}
        <div className="max-w-3xl">
          <motion.span
            variants={fadeUp}
            className="eyebrow-cream block"
          >
            Pourquoi H&amp;L
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", textWrap: "balance" }}
          >
            Cinq raisons de nous confier{" "}
            <span className="italic text-gold-dark">votre bien</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
            style={{ maxWidth: "700px", textWrap: "pretty" }}
          >
            Nous ne sommes pas une plateforme automatisée. Nous sommes une
            maison de gestion niçoise, construite brique après brique autour de
            cinq engagements que nous tenons sans exception.
          </motion.p>
        </div>

        {/* Grille 5 raisons : 1/2/3 col, la 5ème centrée en lg */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6"
        >
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            // En desktop (lg:grid-cols-6), chaque carte occupe 2 col.
            // Ça donne 3 cartes sur la première ligne et 2 sur la deuxième,
            // centrées grâce à un offset sur la 4ème (lg:col-start-2).
            const colSpan = "lg:col-span-2";
            const colStart = idx === 3 ? "lg:col-start-2" : "";
            return (
              <motion.article
                key={reason.title}
                variants={fadeUp}
                className={`group relative flex flex-col border border-gold-border/60 bg-white/40 backdrop-blur-md p-8 md:p-9 transition-[transform,border-color,background-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-dark/70 hover:bg-white/60 will-change-transform ${colSpan} ${colStart}`}
              >
                <span className="flex h-12 w-12 items-center justify-center border border-gold-dark/40 bg-gold-dark/5 mb-6 transition-all duration-500 group-hover:border-gold-dark/70 group-hover:bg-gold-dark/10">
                  <Icon
                    size={19}
                    strokeWidth={1.4}
                    className="text-gold-dark"
                  />
                </span>

                <h3
                  className="font-display font-normal text-black leading-tight"
                  style={{
                    fontSize: "clamp(20px, 2vw, 24px)",
                    textWrap: "balance",
                  }}
                >
                  {reason.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-gold-dark/40 transition-all duration-500 group-hover:w-16" />

                <p
                  className="mt-4 text-[14px] leading-[1.65] text-black/65 font-light"
                  style={{ textWrap: "pretty" }}
                >
                  {reason.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Transition */}
        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
