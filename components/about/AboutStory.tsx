"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * Section "Genèse de H&L". Fond cream, layout 2 colonnes :
 * - gauche : récit fondateur en 3-4 paragraphes
 * - droite : carte glassmorphism cream avec une citation fondatrice
 */
export function AboutStory() {
  return (
    <section
      id="histoire"
      className="relative isolate overflow-hidden bg-cream text-black"
    >
      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche : récit */}
          <div className="lg:col-span-7">
            <motion.span
              variants={fadeUp}
              className="eyebrow-cream block"
            >
              Notre histoire
            </motion.span>

            <motion.div variants={fadeUp} className="mt-6">
              <GoldDivider width="sm" align="left" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                textWrap: "balance",
              }}
            >
              <span className="italic text-gold-dark">Genèse</span> de
              H&amp;L.
            </motion.h2>

            <div className="mt-10 space-y-6 text-[15px] md:text-[16px] leading-[1.85] text-black/75 font-light">
              <motion.p
                variants={fadeUp}
                style={{ textWrap: "pretty" }}
              >
                H&amp;L Conciergerie est née de l&apos;amitié et de la
                conviction partagée de ses deux co-fondateurs, Guillaume Haas
                et Henry Lieater. Le H et le L du nom portent leurs initiales,
                et se lisent également comme Harmonie &amp; Luxe. Tous deux
                ont grandi au contact de l&apos;immobilier azuréen&nbsp;:
                leurs familles respectives évoluent depuis plusieurs décennies
                dans le secteur de la gestion, de la transaction et de
                l&apos;investissement sur la Côte d&apos;Azur. De cette
                exposition précoce, ils ont reçu un double héritage&nbsp;:
                la rigueur opérationnelle d&apos;un métier où rien ne
                s&apos;improvise, et le sens du service qui distingue les
                maisons de gestion les plus respectées.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{ textWrap: "pretty" }}
              >
                À force d&apos;observer le marché niçois de la location
                courte durée, un constat commun s&apos;est imposé. D&apos;un
                côté, des plateformes automatisées qui délivrent un service
                standardisé, sans attention réelle portée aux biens qu&apos;elles
                gèrent. De l&apos;autre, des acteurs locaux traditionnels,
                sérieux mais souvent en peine de professionnaliser leurs
                outils et leur communication. Entre ces deux mondes, une
                place était à prendre&nbsp;: celle d&apos;une maison
                niçoise qui combinerait la technologie native des meilleurs
                opérateurs tech et la proximité terrain d&apos;une conciergerie
                locale. Cette place, c&apos;est celle que H&amp;L a choisi
                d&apos;occuper.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{ textWrap: "pretty" }}
              >
                Leur complémentarité structure la maison. Guillaume porte la
                dimension technologique, marketing et stratégique&nbsp;:
                outils propriétaires (channel management, pricing dynamique,
                reporting en temps réel, diagnostic de rentabilité),
                positionnement de marque, communication et développement
                commercial. Henry porte la dimension opérationnelle, la
                relation propriétaire et l&apos;exécution quotidienne&nbsp;:
                coordination des interventions, accueil des voyageurs, suivi
                des partenaires, qualité terrain au jour le jour. Deux regards
                distincts, une même exigence.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{ textWrap: "pretty" }}
              >
                H&amp;L n&apos;est pas une plateforme qui cherche à prendre en
                gestion autant de biens que possible. C&apos;est une maison
                qui choisit soigneusement ses propriétaires, limite
                volontairement son nombre de mandats, et se donne pour
                ambition de devenir la référence de la gestion locative
                premium à Nice et sur la Côte d&apos;Azur. Un engagement que
                les deux fondateurs assument personnellement, dès la première
                visite de qualification jusqu&apos;au rendez-vous trimestriel
                de reporting.
              </motion.p>
            </div>
          </div>

          {/* Colonne droite : citation fondatrice */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div variants={fadeUp}>
              <GlassCard
                variant="cream"
                className="p-10 md:p-12"
              >
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                  Citation fondatrice
                </span>

                <blockquote
                  className="mt-8 font-display font-light italic text-black/85 leading-[1.35]"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 26px)",
                    textWrap: "pretty",
                  }}
                >
                  «&nbsp;Nous avons grandi avec l&apos;immobilier. Nous savons
                  ce que c&apos;est qu&apos;un bien bien tenu, et ce que
                  c&apos;est qu&apos;un bien mal géré. H&amp;L est la maison
                  que nous aurions voulu trouver pour nos propres
                  parents.&nbsp;»
                </blockquote>

                <div className="mt-8 h-px w-12 bg-gold-dark/40" />

                <p className="mt-6 text-[12px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                  Guillaume Haas &amp; Henry Lieater · Co-fondateurs
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
