"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * Section 02 : Promise
 * Fond noir profond. Statement philosophique centré, respiration maximale.
 * Inaugure le rythme dark / cream qui structure la landing.
 */
export function Promise() {
  return (
    <section
      id="promise"
      className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
    >
      {/* Glow orb ambient très discret */}
      <div
        aria-hidden="true"
        className="glow-orb h-[520px] w-[520px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35"
      />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-28 md:py-36 lg:py-40 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="eyebrow block"
        >
          Notre philosophie
        </motion.span>

        <motion.div variants={fadeUp} className="mt-8">
          <GoldDivider width="md" />
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          className="mx-auto mt-12 font-display font-light italic text-bone leading-[1.2]"
          style={{
            fontSize: "clamp(28px, 4vw, 56px)",
            maxWidth: "820px",
            textWrap: "balance",
          }}
        >
          «&nbsp;Confier son bien à H&amp;L, c&apos;est choisir une maison de
          gestion qui traite chaque appartement comme une suite, chaque voyageur
          comme un hôte, et chaque propriétaire comme un partenaire de long
          terme.&nbsp;»
        </motion.blockquote>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-12 text-[15px] md:text-[16px] leading-[1.8] text-pearl font-light"
          style={{ maxWidth: "620px", textWrap: "pretty" }}
        >
          Nous croyons qu&apos;une conciergerie premium se mesure à trois
          choses&nbsp;: la rigueur de l&apos;exécution, la qualité de
          l&apos;expérience offerte aux voyageurs, et la transparence absolue
          avec les propriétaires. Ces trois exigences guident chacune de nos
          décisions.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-14">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
