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
              className="block text-[11px] font-medium uppercase tracking-[0.22em] text-gold-dark"
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
              Genèse de H&amp;L.
            </motion.h2>

            <div className="mt-10 space-y-6 text-[15px] md:text-[16px] leading-[1.85] text-black/75 font-light">
              <motion.p
                variants={fadeUp}
                style={{ textWrap: "pretty" }}
              >
                H&amp;L Conciergerie voit le jour en 2026 à Nice, sous
                l&apos;impulsion de deux associés de longue date. L&apos;un
                vient du monde de la technologie et du marketing
                d&apos;acquisition, l&apos;autre de l&apos;opérationnel et du
                service client en hôtellerie haut de gamme. Leur rencontre
                professionnelle date de plusieurs années&nbsp;; leur
                complémentarité est devenue, au fil du temps, une évidence.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{ textWrap: "pretty" }}
              >
                Pendant plusieurs saisons, tous deux observent le marché
                niçois de la location courte durée. Ils y voient un
                paradoxe&nbsp;: des biens magnifiques, un marché parmi les
                plus performants d&apos;Europe, et pourtant une grande
                majorité de propriétaires mal servis par des plateformes
                automatisées ou des conciergeries opportunistes. Le standard
                hôtelier cinq étoiles qu&apos;ils connaissent dans leur vie
                professionnelle reste, pour la gestion locative premium, une
                exception.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{ textWrap: "pretty" }}
              >
                L&apos;idée prend forme en fin d&apos;année 2025&nbsp;: bâtir
                une maison de gestion qui traite chaque bien comme une suite
                d&apos;hôtel particulier, chaque voyageur comme un hôte
                précieux et chaque propriétaire comme un partenaire de long
                terme. Pas une plateforme. Pas un prestataire. Une
                maison&nbsp;: un lieu, une équipe, une signature.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{ textWrap: "pretty" }}
              >
                Le nom H&amp;L, pour Harmonie &amp; Luxe, condense cette
                ambition. L&apos;harmonie, parce que nous croyons qu&apos;un
                bien bien géré est un bien qui respire&nbsp;: rythme saisonnier
                juste, accueil chaleureux, entretien continu, relation sereine
                avec le propriétaire. Le luxe, parce que nous refusons
                d&apos;en rabattre sur l&apos;exigence du service, du choix
                des partenaires et du soin accordé à chaque détail. La maison
                ouvre ses portes au printemps 2026.
              </motion.p>
            </div>
          </div>

          {/* Colonne droite : citation */}
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
                  className="mt-8 font-display font-light italic text-black leading-[1.3]"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 28px)",
                    textWrap: "balance",
                  }}
                >
                  «&nbsp;Nous avons bâti H&amp;L parce que nous voulions,
                  avant tout, être les propriétaires de nos propres clients.
                  Si nous ne confierions pas notre bien à cette maison, c&apos;est
                  que nous n&apos;avons pas encore fini de la construire.&nbsp;»
                </blockquote>

                <div className="mt-8 h-px w-12 bg-gold-dark/40" />

                <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                  Les fondateurs · Nice, 2026
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
