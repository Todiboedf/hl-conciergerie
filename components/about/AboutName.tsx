"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * Section "Le nom H&L". Fond noir sobre, container étroit centré.
 * Deux paragraphes pour expliciter la double lecture du nom :
 * initiales Haas & Lieater et double sens Harmonie & Luxe.
 * S'intercale entre AboutStory (cream) et AboutTeam (noir).
 */
export function AboutName() {
  return (
    <section
      id="le-nom"
      className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
    >
      <div className="glow-orb h-[460px] w-[460px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-25" />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-20 md:py-24 text-center"
      >
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <motion.span variants={fadeUp} className="eyebrow block">
            Le nom
          </motion.span>

          <motion.div variants={fadeUp} className="mt-8">
            <GoldDivider width="sm" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-10 font-display font-light text-bone leading-[1.1] tracking-[-0.01em]"
            style={{
              fontSize: "clamp(30px, 4vw, 52px)",
              textWrap: "balance",
            }}
          >
            Deux lettres, deux héritages,{" "}
            <span className="italic text-gold/95">une maison</span>.
          </motion.h2>

          <div className="mt-12 space-y-6 text-[15.5px] md:text-[16.5px] leading-[1.85] text-pearl font-light text-left md:text-center mx-auto">
            <motion.p variants={fadeUp} style={{ textWrap: "pretty" }}>
              H&amp;L porte les initiales de ses deux co-fondateurs, Haas et
              Lieater. Deux amis, deux familles de l&apos;immobilier azuréen,
              deux sensibilités complémentaires&nbsp;: l&apos;une tournée vers
              la technologie et la stratégie de marque, l&apos;autre vers
              l&apos;excellence opérationnelle et la relation humaine.
            </motion.p>

            <motion.p variants={fadeUp} style={{ textWrap: "pretty" }}>
              Mais H&amp;L se lit aussi comme Harmonie &amp; Luxe.
              L&apos;harmonie, c&apos;est celle qui s&apos;installe quand un
              propriétaire peut enfin confier son bien en toute confiance. Le
              luxe, c&apos;est celui d&apos;un service pensé avec
              l&apos;exigence d&apos;un hôtel de prestige. Les deux réunies
              définissent notre promesse.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="mt-16">
            <GoldDivider width="md" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
