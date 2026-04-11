"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { FAQ_SERVICES_ITEMS } from "@/lib/faqServices";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * FAQ spécifique à /services. Fond cream, layout 2 colonnes :
 * titre à gauche, accordion à droite (5 questions sur la mécanique
 * concrète des packs, la facturation, les services à la carte).
 */
export function ServicesFAQ() {
  return (
    <section
      id="faq-services"
      className="relative isolate overflow-hidden bg-cream text-black"
    >
      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Colonne gauche */}
          <div className="lg:col-span-5">
            <motion.span
              variants={fadeUp}
              className="eyebrow-cream block"
            >
              Questions fréquentes sur nos packs
            </motion.span>

            <motion.div variants={fadeUp} className="mt-6">
              <GoldDivider width="sm" align="left" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                textWrap: "balance",
              }}
            >
              Ce que nos propriétaires nous demandent{" "}
              <span className="italic text-gold-dark">le plus souvent</span>.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
              style={{ maxWidth: "700px", textWrap: "pretty" }}
            >
              Commission, facturation, services à la carte, changement de
              pack en cours de mandat : voici les points qui reviennent le
              plus souvent dans nos entretiens de qualification.
            </motion.p>
          </div>

          {/* Colonne droite : accordion */}
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <Accordion className="flex w-full flex-col divide-y divide-gold-dark/20 border-y border-gold-dark/25">
              {FAQ_SERVICES_ITEMS.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-services-${idx}`}
                  className="border-b-0"
                >
                  <AccordionTrigger className="group/trigger py-6 md:py-7 text-left text-black cursor-pointer hover:no-underline hover:text-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2 focus-visible:ring-offset-cream data-[panel-open]:text-gold-dark">
                    <span
                      className="font-display text-[18px] md:text-[21px] leading-snug pr-6"
                      style={{ textWrap: "balance" }}
                    >
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[14.5px] md:text-[15px] leading-[1.75] text-black/70 font-light pr-4">
                    <p style={{ textWrap: "pretty" }}>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>

        {/* Séparateur de transition */}
        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
