"use client";

import { motion } from "framer-motion";
import { Gem, Eye, MapPin, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    icon: Gem,
    title: "Exigence",
    description:
      "Nous ne signons que les biens que nous pouvons servir avec le standard que nous nous sommes fixés. Pas de volume à tout prix, pas de gestion industrielle. Chaque adresse rejoint la maison parce qu'elle en mérite la signature.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description:
      "Vous voyez tout : tarifs, calendriers, dépenses, avis, performances, reporting comparatif. Rien ne vous est caché. Nos propriétaires ne découvrent jamais leur état de compte en fin de mois.",
  },
  {
    icon: MapPin,
    title: "Proximité",
    description:
      "Nos deux fondateurs vivent à Nice, et notre équipe terrain y est ancrée. Votre bien n'est jamais à plus de vingt minutes de l'un de nous. Quand une situation exige une présence physique, elle est immédiate.",
  },
  {
    icon: Heart,
    title: "Respect",
    description:
      "Respect du propriétaire et de ses choix. Respect du voyageur et de son expérience. Respect du bien, de son histoire et de ses détails. Respect du quartier, de ses voisins et du cadre réglementaire. Quatre respects qui guident chacune de nos décisions.",
  },
];

/**
 * Section "Nos valeurs". Fond cream. Grid 2x2 de 4 cartes valeurs
 * (Exigence, Transparence, Proximité, Respect), avec icônes Lucide
 * dorées et descriptions rédigées hôtelier premium.
 */
export function AboutValues() {
  return (
    <section
      id="valeurs"
      className="relative isolate overflow-hidden bg-cream text-black"
    >
      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            variants={fadeUp}
            className="eyebrow-cream block"
          >
            Nos valeurs
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="sm" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              textWrap: "balance",
            }}
          >
            Quatre valeurs tenues{" "}
            <span className="italic text-gold-dark">sans exception</span>.
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.article
                key={value.title}
                variants={fadeUp}
                className="group relative flex flex-col border border-gold-border/60 bg-white/40 backdrop-blur-md p-10 md:p-12 transition-[transform,border-color,background-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-dark/70 hover:bg-white/60 will-change-transform"
              >
                <span className="flex h-14 w-14 items-center justify-center border border-gold-dark/40 bg-gold-dark/5 mb-8 transition-all duration-500 group-hover:border-gold-dark/70 group-hover:bg-gold-dark/10">
                  <Icon
                    size={22}
                    strokeWidth={1.4}
                    className="text-gold-dark"
                  />
                </span>

                <h3
                  className="font-display font-normal text-black leading-tight"
                  style={{
                    fontSize: "clamp(24px, 2.4vw, 30px)",
                  }}
                >
                  {value.title}
                </h3>

                <div className="mt-4 h-px w-12 bg-gold-dark/40 transition-all duration-500 group-hover:w-20" />

                <p
                  className="mt-6 text-[14.5px] md:text-[15px] leading-[1.75] text-black/70 font-light"
                  style={{ textWrap: "pretty" }}
                >
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
