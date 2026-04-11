"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { HLMonogram } from "@/components/ui/HLMonogram";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface Founder {
  name: string;
  role: string;
  title: string;
  bio: string[];
  focus: string;
}

const FOUNDERS: Founder[] = [
  {
    name: "Guillaume Haas",
    role: "Co-fondateur",
    title: "Direction technologie & acquisition",
    bio: [
      "Guillaume a construit sa carrière à la croisée de la technologie produit et du marketing d'acquisition. Il a dirigé pendant plusieurs années la stratégie digitale de maisons hôtelières et de projets de luxe, où il a appris que la technologie ne vaut que par ce qu'elle permet à l'humain de mieux faire.",
      "Chez H&L, il pilote l'infrastructure technique de la maison : outils propriétaires, pricing dynamique, acquisition qualifiée et relation digitale avec les propriétaires. Son obsession : que chaque système que nous construisons libère du temps pour le service réel, celui qui se joue en face-à-face avec un hôte ou un voyageur.",
    ],
    focus:
      "Tech · marketing · pricing dynamique · relation digitale propriétaire",
  },
  {
    name: "L'associé opérations",
    role: "Co-fondateur",
    title: "Direction opérations & relation client",
    bio: [
      "Son parcours est celui d'un opérationnel formé aux standards de l'hôtellerie cinq étoiles : management d'équipes terrain, excellence d'accueil, coordination des partenaires, rigueur de l'exécution. Il a dirigé pendant plusieurs années des équipes de service en maisons de prestige sur la Côte d'Azur, où il a appris l'art discret et exigeant de l'hospitalité française.",
      "Chez H&L, il porte la promesse hôtelière sur le terrain. C'est lui qui rencontre les propriétaires, qui sélectionne les partenaires, qui forme les équipes opérationnelles et qui garantit qu'aucun bien ne reçoit un traitement en dessous du standard que nous nous sommes fixé.",
    ],
    focus:
      "Opérations · relation propriétaire · partenaires · qualité terrain",
  },
];

/**
 * Section "Les deux associés". Fond noir. 2 cards fondateurs avec
 * monogramme H&L circulaire en guise de photo placeholder, nom,
 * rôle, biographie (2 paragraphes), focus professionnel.
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
        <div className="max-w-3xl">
          <motion.span variants={fadeUp} className="eyebrow block">
            Notre équipe
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
            Les deux associés.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[15px] md:text-[16px] leading-relaxed text-bone/70 font-light"
            style={{ maxWidth: "620px", textWrap: "pretty" }}
          >
            H&amp;L est dirigée par deux co-fondateurs complémentaires, qui
            se partagent la supervision de la maison. Vous les rencontrez
            tous les deux dès la première visite de qualification.
          </motion.p>
        </div>

        {/* Grid 2 cards */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {FOUNDERS.map((founder) => (
            <motion.article
              key={founder.name}
              variants={fadeUp}
              className="group relative flex flex-col border border-white/10 bg-white/[0.03] backdrop-blur-md p-10 md:p-12 transition-all duration-500 hover:border-gold/40 hover:bg-white/[0.05]"
            >
              {/* Avatar monogramme circulaire */}
              <div className="flex items-start gap-6">
                <div className="relative shrink-0">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full blur-2xl opacity-40"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-black/40 backdrop-blur-sm">
                    <HLMonogram size={44} variant="gold" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 pt-2">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
                    {founder.role}
                  </p>
                  <h3
                    className="mt-2 font-display font-normal text-bone leading-tight"
                    style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
                  >
                    {founder.name}
                  </h3>
                  <p className="mt-2 text-[13px] text-bone/65 font-light italic">
                    {founder.title}
                  </p>
                </div>
              </div>

              {/* Séparateur */}
              <div className="mt-8 h-px w-full bg-gold/20" />

              {/* Bio */}
              <div className="mt-8 space-y-4 text-[14px] md:text-[14.5px] leading-[1.75] text-bone/75 font-light flex-1">
                {founder.bio.map((para, idx) => (
                  <p key={idx} style={{ textWrap: "pretty" }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Focus */}
              <div className="mt-8 pt-6 border-t border-gold/15">
                <p className="text-[10px] uppercase tracking-[0.22em] text-pearl/80">
                  Rôle dans la maison
                </p>
                <p className="mt-2 text-[12.5px] text-bone/85 font-light">
                  {founder.focus}
                </p>
              </div>
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
