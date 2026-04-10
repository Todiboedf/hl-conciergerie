"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * Section 08 : Testimonials
 * Fond noir. Placeholder beta : trois cartes en verre fumé qui
 * suggèrent l'emplacement d'un futur témoignage (ligne de nom,
 * ligne de quote), sans "lorem ipsum". Élégant en attendant les vrais.
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
    >
      <div className="glow-orb h-[500px] w-[500px] top-1/4 -right-32 opacity-25" />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        {/* En-tête centré */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.span variants={fadeUp} className="eyebrow block">
            Bientôt, la parole à nos propriétaires
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="sm" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display font-light text-bone leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", textWrap: "balance" }}
          >
            Une nouvelle maison naît cette saison.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-[15px] md:text-[16px] leading-[1.8] text-pearl font-light mx-auto"
            style={{ maxWidth: "700px", textWrap: "pretty" }}
          >
            H&amp;L Conciergerie débute ses opérations cette saison à Nice. Les
            premiers retours de nos propriétaires fondateurs seront publiés ici
            dans les semaines qui viennent. En attendant, nous serons heureux
            de vous présenter notre méthode lors d&apos;un rendez-vous
            personnalisé.
          </motion.p>
        </div>

        {/* 3 cartes placeholder */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="relative flex flex-col border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-9 min-h-[280px]"
              aria-label={`Emplacement de témoignage à venir ${i + 1} sur 3`}
            >
              <Quote
                size={28}
                strokeWidth={1.2}
                className="text-gold/80"
                aria-hidden="true"
              />

              {/* Lignes de quote placeholder */}
              <div className="mt-6 space-y-2.5">
                <div className="h-px bg-gradient-to-r from-gold/20 to-transparent" />
                <div className="h-px w-[92%] bg-gradient-to-r from-gold/20 to-transparent" />
                <div className="h-px w-[85%] bg-gradient-to-r from-gold/20 to-transparent" />
                <div className="h-px w-[70%] bg-gradient-to-r from-gold/20 to-transparent" />
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Signature placeholder : avatar + nom + rôle */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-11 w-11 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center">
                  <span className="font-display text-gold/60 text-[15px]">
                    &middot;
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-px w-20 bg-gold/25" />
                  <div className="h-px w-32 bg-pearl/20" />
                </div>
              </div>

              <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-pearl/50">
                Emplacement réservé
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA ghost vers contact */}
        <motion.div variants={fadeUp} className="mt-14 flex justify-center">
          <PremiumButton href="/contact" variant="secondary" size="md" withArrow>
            Prendre rendez-vous avec nous
          </PremiumButton>
        </motion.div>

        {/* Transition */}
        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
