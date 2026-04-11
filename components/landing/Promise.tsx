"use client";

import { motion } from "framer-motion";
import { BedDouble, Users, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface PhilosophyBullet {
  icon: LucideIcon;
  eyebrow: string;
  copy: string;
}

const BULLETS: PhilosophyBullet[] = [
  {
    icon: BedDouble,
    eyebrow: "Comme une suite",
    copy: "Chaque bien préparé avec l'œil d'un hôtelier.",
  },
  {
    icon: Users,
    eyebrow: "Comme un hôte",
    copy: "Chaque voyageur accueilli personnellement.",
  },
  {
    icon: Handshake,
    eyebrow: "Comme un partenaire",
    copy: "Chaque propriétaire informé en toute transparence.",
  },
];

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

        {/* 3 sous-bullets horizontaux, incarnent les 3 engagements de la citation */}
        <motion.ul
          variants={staggerContainer}
          className="mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          style={{ maxWidth: "920px" }}
        >
          {BULLETS.map((bullet) => {
            const Icon = bullet.icon;
            return (
              <motion.li
                key={bullet.eyebrow}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center border border-gold/35 bg-gold/[0.04]"
                >
                  <Icon
                    size={16}
                    strokeWidth={1.4}
                    className="text-gold"
                  />
                </span>
                <p className="mt-5 text-[10.5px] uppercase tracking-[0.28em] text-gold font-medium">
                  {bullet.eyebrow}
                </p>
                <p className="mt-3 text-[13.5px] md:text-[14px] leading-[1.7] text-bone/80 font-light">
                  {bullet.copy}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-16 text-[15px] md:text-[16px] leading-[1.8] text-pearl font-light"
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
