"use client";

import { motion } from "framer-motion";
import { FileCheck2, Hash, CalendarClock, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface ComplianceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ITEMS: ComplianceItem[] = [
  {
    icon: FileCheck2,
    title: "Autorisations préfectorales",
    description:
      "Déclaration en mairie, changement d'usage si requis, respect des quotas et du zonage : nous assumons l'intégralité des démarches administratives, en relation directe avec la mairie de Nice et la préfecture des Alpes-Maritimes.",
  },
  {
    icon: Hash,
    title: "Numéro d'enregistrement",
    description:
      "Chaque bien dispose de son numéro d'enregistrement à 13 caractères, rendu obligatoire par le règlement métropolitain. Nous le publions sur toutes les annonces, gérons les renouvellements et conservons les justificatifs dans votre dossier.",
  },
  {
    icon: CalendarClock,
    title: "Limite des 90 nuits résidence principale",
    description:
      "Pour les biens relevant de la résidence principale, nous assurons un suivi rigoureux du plafond des 120 nuits annuelles instauré par la loi Le Meur, avec alertes et reporting dédiés pour garantir votre conformité.",
  },
  {
    icon: Receipt,
    title: "Taxe de séjour métropolitaine",
    description:
      "Collecte automatisée de la taxe de séjour sur toutes les plateformes, reversement à la métropole Nice Côte d'Azur, déclarations périodiques et archivage des justificatifs. Aucune exposition administrative pour le propriétaire.",
  },
];

/**
 * Section "Conformité". Fond noir. Intro + 4 cartes points clés
 * avec icônes Lucide. Disclaimer en bas sur les partenariats pros
 * et l'accompagnement fiscaliste.
 */
export function AboutCompliance() {
  return (
    <section
      id="conformite"
      className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
    >
      <div className="glow-orb h-[520px] w-[520px] top-10 right-0 opacity-25" />
      <div className="glow-orb h-[480px] w-[480px] -bottom-32 -left-24 opacity-25" />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        <div className="max-w-3xl">
          <motion.span variants={fadeUp} className="eyebrow block">
            Notre engagement conformité
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="sm" align="left" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-8 font-display font-light text-bone leading-[1.05] tracking-[-0.01em]"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              textWrap: "balance",
            }}
          >
            Une maison rigoureuse sur le cadre réglementaire.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-[15px] md:text-[16.5px] leading-[1.85] text-bone/80 font-light"
            style={{ maxWidth: "720px", textWrap: "pretty" }}
          >
            Nice a sensiblement durci son règlement des meublés touristiques à
            compter du 1er janvier 2026. H&amp;L maîtrise intégralement ce
            cadre et accompagne ses propriétaires sur chaque démarche, avec
            la tranquillité d&apos;esprit que cela doit représenter.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className="group relative flex flex-col border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:border-gold/40 hover:bg-white/[0.05]"
              >
                <span className="flex h-12 w-12 items-center justify-center border border-gold/40 bg-gold/5 mb-6 transition-all duration-500 group-hover:border-gold/70 group-hover:bg-gold/10">
                  <Icon
                    size={19}
                    strokeWidth={1.4}
                    className="text-gold"
                  />
                </span>

                <h3
                  className="font-display font-normal text-bone leading-tight"
                  style={{
                    fontSize: "clamp(20px, 2vw, 24px)",
                    textWrap: "balance",
                  }}
                >
                  {item.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-16" />

                <p
                  className="mt-5 text-[14px] leading-[1.7] text-pearl font-light"
                  style={{ textWrap: "pretty" }}
                >
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={fadeUp}
          className="mt-16 text-center italic text-[13px] md:text-[14px] leading-[1.8] text-pearl/80 font-light mx-auto"
          style={{ maxWidth: "780px", textWrap: "pretty" }}
        >
          Nous adhérons aux démarches des acteurs professionnels locaux et
          travaillons avec un avocat fiscaliste partenaire pour sécuriser
          chaque dossier propriétaire. La conformité n&apos;est jamais une
          case à cocher&nbsp;: c&apos;est une ligne rouge que nous ne
          franchissons pas.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
