"use client";

import { motion } from "framer-motion";
import { Handshake, Sparkles, Coins } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface Step {
  roman: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    roman: "I.",
    icon: Handshake,
    title: "Vous nous confiez votre bien",
    description:
      "Nous venons à votre rencontre pour comprendre votre bien, vos attentes et vos contraintes. Cette première visite, menée personnellement par l'un des fondateurs, est le socle de notre engagement : nous ne prenons en gestion qu'un nombre limité d'adresses, chacune recevant notre pleine attention.",
  },
  {
    roman: "II.",
    icon: Sparkles,
    title: "Nous l'optimisons et le mettons en lumière",
    description:
      "Shooting professionnel, rédaction éditoriale sur mesure, multi-diffusion internationale, pricing dynamique au quotidien. Notre équipe valorise votre bien sur tous les canaux pertinents pendant que nos outils propriétaires ajustent les tarifs au fil des saisons pour maximiser le yield.",
  },
  {
    roman: "III.",
    icon: Coins,
    title: "Vous percevez vos revenus en toute sérénité",
    description:
      "Pendant que vous vaquez à vos occupations, nous orchestrons l'ensemble : accueil premium des voyageurs, ménage hôtelier, maintenance, conformité. Chaque fin de mois, un reporting transparent et le reversement de vos revenus nets, simplement.",
  },
];

/**
 * Section 04 : HowItWorks
 * Fond noir. Parcours propriétaire en trois temps avec numéros romains or,
 * icônes Lucide, typographie serif pour les titres.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
    >
      <div className="glow-orb h-[600px] w-[600px] -top-40 right-0 opacity-30" />
      <div className="glow-orb h-[500px] w-[500px] -bottom-32 -left-24 opacity-25" />

      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        {/* En-tête */}
        <div className="max-w-3xl">
          <motion.span variants={fadeUp} className="eyebrow block">
            Votre parcours, en trois temps
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display font-light text-bone leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", textWrap: "balance" }}
          >
            De la première rencontre à votre tranquillité.
          </motion.h2>
        </div>

        {/* 3 cartes étapes */}
        <motion.div
          variants={staggerContainer}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.roman}
                variants={fadeUp}
                className="group relative flex flex-col border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 transition-all duration-500 hover:border-gold/40 hover:bg-white/[0.05]"
              >
                {/* Numéro romain + icône */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-display font-light text-gold/90 leading-none"
                    style={{ fontSize: "52px", letterSpacing: "-0.02em" }}
                  >
                    {step.roman}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center border border-gold/30 bg-gold/5 transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/10"
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.4}
                      className="text-gold"
                    />
                  </span>
                </div>

                <div className="mt-10 h-px w-12 bg-gold/40 transition-all duration-500 group-hover:w-20" />

                <h3
                  className="mt-6 font-display font-normal text-bone leading-[1.15]"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 28px)",
                    textWrap: "balance",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="mt-5 text-[14.5px] leading-[1.7] text-pearl font-light"
                  style={{ textWrap: "pretty" }}
                >
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Transition */}
        <motion.div variants={fadeUp} className="mt-20 md:mt-24">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}
