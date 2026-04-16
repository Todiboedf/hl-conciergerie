"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { HLMonogram } from "@/components/ui/HLMonogram";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface Founder {
  name: string;
  role: string;
  description: string;
}

const FOUNDERS: Founder[] = [
  {
    name: "Guillaume Haas",
    role: "Co-fondateur · Direction tech & marketing",
    description:
      "Guillaume dirige la partie technologique et marketing de H&L. Il est responsable des outils propriétaires de la maison (channel management, pricing dynamique, reporting en temps réel, diagnostic de rentabilité), de la stratégie de positionnement et du développement commercial. Issu d'une famille profondément ancrée dans l'immobilier azuréen, il a nourri très tôt une conviction : les meilleurs outils ne remplacent jamais l'attention humaine, mais ils en décuplent la valeur quand ils sont pensés intelligemment.",
  },
  {
    name: "Luis-Henry Lietaer",
    role: "Co-fondateur · Direction opérations & relation propriétaires",
    description:
      "Luis-Henry dirige la partie opérationnelle et la relation propriétaires. Il orchestre quotidiennement les interventions terrain, l'accueil des voyageurs, la coordination des partenaires (ménage, maintenance, artisans) et la qualité de l'expérience livrée dans chaque bien. Comme Guillaume, il a grandi au contact du secteur immobilier de la Côte d'Azur. Il porte l'exigence hôtelière dans le quotidien opérationnel de la maison, avec une conviction simple : ce sont les détails qu'on soigne qui distinguent une bonne gestion d'une excellente gestion.",
  },
];

/**
 * Section "Les deux fondateurs". Fond noir. 2 cards fondateurs avec
 * monogramme H&L circulaire or (120px), nom, rôle, biographie.
 * Injecte les vrais fondateurs : Guillaume Haas et Luis-Henry Lietaer.
 */
export function AboutTeam() {
  return (
    <section
      id="equipe"
      className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
    >
      <div className="glow-orb h-[600px] w-[600px] top-32 -left-40 opacity-25" />
      <div className="glow-orb h-[560px] w-[560px] bottom-0 -right-32 opacity-25" />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.span variants={fadeUp} className="eyebrow block">
            Notre équipe
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="sm" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-8 font-display font-light text-bone leading-[1.05] tracking-[-0.01em]"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              textWrap: "balance",
            }}
          >
            Les deux <span className="italic text-gold/95">fondateurs</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 mx-auto text-[15px] md:text-[16px] leading-relaxed text-bone/70 font-light"
            style={{ maxWidth: "620px", textWrap: "pretty" }}
          >
            H&amp;L est dirigée par deux co-fondateurs amis de longue date,
            dont la complémentarité structure chaque aspect de la maison. Vous
            les rencontrez tous les deux dès la première visite de
            qualification.
          </motion.p>
        </div>

        {/* Grid 2 cards fondateurs */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {FOUNDERS.map((founder) => (
            <motion.article
              key={founder.name}
              variants={fadeUp}
              className="group relative flex flex-col items-center text-center border border-white/10 bg-white/[0.03] backdrop-blur-md p-10 md:p-12 transition-[transform,border-color,background-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/[0.05] will-change-transform"
            >
              {/* Monogramme circulaire or ~120px */}
              <div className="relative shrink-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full blur-2xl opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201,168,76,0.45) 0%, transparent 70%)",
                  }}
                />
                <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border border-gold/50 bg-black/40 backdrop-blur-sm transition-colors duration-500 group-hover:border-gold/80">
                  <HLMonogram size={56} variant="gold" />
                </div>
              </div>

              {/* Nom */}
              <h3
                className="mt-8 font-display font-normal text-bone leading-tight"
                style={{ fontSize: "28px" }}
              >
                {founder.name}
              </h3>

              {/* Rôle */}
              <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
                {founder.role}
              </p>

              {/* Séparateur */}
              <div className="mt-6 h-px w-12 bg-gold/40 transition-all duration-500 group-hover:w-20" />

              {/* Description */}
              <p
                className="mt-6 text-[14.5px] leading-[1.75] text-pearl font-light"
                style={{ textWrap: "pretty" }}
              >
                {founder.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
