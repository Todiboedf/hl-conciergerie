"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { PACKS } from "@/lib/packs";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { PackId } from "@/lib/types";

interface PackProfile {
  audience: string;
  example: {
    label: string;
    monthly: string;
    description: string;
  };
}

/**
 * Profil type propriétaire + exemple de rendement pour chaque pack.
 * Les montants sont des fourchettes indicatives cohérentes avec les
 * benchmarks Nice (ADR 132€, occupation 78%). Les quartiers sont
 * volontairement variés pour illustrer la diversité du marché.
 */
const PACK_PROFILES: Record<PackId, PackProfile> = {
  essentiel: {
    audience:
      "Vous possédez un appartement fonctionnel à Nice et cherchez une délégation totale sans concession sur la qualité. Vous n'habitez pas la région, vous ne souhaitez plus vous charger des voyageurs, du ménage, du reporting et des démarches. Vous voulez simplement constater chaque mois un virement sur votre compte, accompagné d'un compte-rendu clair et honnête. L'Essentiel répond exactement à ce cahier des charges, avec la rigueur hôtelière H&L en standard.",
    example: {
      label: "T2 de 48 m² · Libération, Nice",
      monthly: "1 850 à 2 400 €",
      description:
        "Revenu mensuel net estimé pour le propriétaire, commission H&L déduite, sur la base d'un taux d'occupation annuel de 76% et d'un ADR moyen de 112€. Périodes hautes (juillet, août, Carnaval) pondérées en saisonnalité.",
    },
  },
  premium: {
    audience:
      "Vous disposez d'un bien de qualité, bien situé, et vous savez qu'il peut performer au-delà des standards du marché niçois. Vous attendez une valorisation active : shooting saisonnier, pricing dynamique, multi-diffusion, community management, conciergerie voyageur. Vous voulez une maison de gestion capable d'optimiser votre yield au fil des saisons et de vous remettre une analyse comparative lisible à chaque fin de période. Le pack Premium est notre offre la plus adoptée pour cette raison.",
    example: {
      label: "T3 vue mer de 72 m² · Carré d'Or, Nice",
      monthly: "3 600 à 4 400 €",
      description:
        "Revenu mensuel net estimé pour le propriétaire, commission H&L déduite, sur la base d'un taux d'occupation annuel de 81% et d'un ADR moyen de 178€. Le pricing dynamique active les pics saisonniers liés à l'événementiel niçois (festivals, congrès).",
    },
  },
  signature: {
    audience:
      "Votre bien est un bien d'exception : appartement signature du Carré d'Or, villa avec piscine sur la Colline des Baumettes, propriété vue mer à Cap-Ferrat, penthouse à Beaulieu. Vous attendez une expérience hôtelière cinq étoiles sans compromis : majordome sur demande, fleurs fraîches, cosmétiques partenaires, sélection VIP des voyageurs, couverture événementielle, gestion fiscale intégrale. Le pack Signature s'adresse aux propriétaires qui refusent tout compromis sur la qualité et souhaitent traiter leur bien comme une adresse d'hôtellerie particulière.",
    example: {
      label: "Villa 4 chambres avec piscine · Mont-Boron, Nice",
      monthly: "9 800 à 13 500 €",
      description:
        "Revenu mensuel net estimé pour le propriétaire, commission H&L déduite, sur la base d'un taux d'occupation annuel de 72% et d'un ADR moyen de 650€. Privatisations événementielles (mariages, tournages) possibles, avec impact significatif sur certains mois.",
    },
  },
};

/**
 * Section détaillée pack par pack. Fond noir, 2 colonnes desktop :
 * - gauche : nom + commission géante + description + liste features
 * - droite : profil propriétaire cible + GlassCard avec exemple chiffré
 * Ancres #essentiel, #premium, #signature pour lier depuis Header/Footer.
 */
export function ServicesPackDetail() {
  return (
    <section
      id="detail"
      className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
    >
      <div className="glow-orb h-[540px] w-[540px] top-40 -left-32 opacity-35" />
      <div className="glow-orb h-[500px] w-[500px] bottom-40 -right-24 opacity-30" />

      <div className="container-hl relative z-10 py-24 md:py-32">
        {PACKS.map((pack, idx) => {
          const profile = PACK_PROFILES[pack.id];
          const isLast = idx === PACKS.length - 1;
          return (
            <div key={pack.id} id={pack.id} className="scroll-mt-28">
              <motion.article
                {...viewInProps}
                variants={staggerContainer}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                {/* Colonne gauche : identité pack + features */}
                <div className="lg:col-span-7">
                  <motion.span
                    variants={fadeUp}
                    className="eyebrow block"
                  >
                    {pack.tagline}
                  </motion.span>

                  <motion.div variants={fadeUp} className="mt-6">
                    <GoldDivider width="sm" align="left" />
                  </motion.div>

                  <motion.h2
                    variants={fadeUp}
                    className="mt-8 font-display font-light text-bone leading-[1]"
                    style={{
                      fontSize: "clamp(44px, 6vw, 88px)",
                      textWrap: "balance",
                    }}
                  >
                    {pack.name}
                  </motion.h2>

                  <motion.div
                    variants={fadeUp}
                    className="mt-8 flex items-baseline gap-4"
                  >
                    <span
                      className="font-display font-light text-gold/95 leading-none"
                      style={{ fontSize: "clamp(64px, 8vw, 120px)" }}
                    >
                      {pack.commission}%
                    </span>
                    <span className="text-[13px] uppercase tracking-[0.22em] text-pearl">
                      de commission
                    </span>
                  </motion.div>

                  <motion.p
                    variants={fadeUp}
                    className="mt-8 text-[16px] md:text-[17px] leading-[1.8] text-bone/80 font-light"
                    style={{ maxWidth: "580px", textWrap: "pretty" }}
                  >
                    {pack.description}
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    className="mt-10 h-px w-full max-w-md bg-gold/25"
                  />

                  <motion.h3
                    variants={fadeUp}
                    className="mt-10 text-[11px] uppercase tracking-[0.22em] text-gold font-medium"
                  >
                    Ce que ce pack inclut
                  </motion.h3>

                  <motion.ul
                    variants={staggerContainer}
                    className="mt-6 space-y-4"
                  >
                    {pack.features.map((feature) => (
                      <motion.li
                        key={feature}
                        variants={fadeUp}
                        className="flex items-start gap-3 text-[14.5px] md:text-[15px] leading-[1.65] text-bone/85 font-light"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-gold/40 bg-gold/5"
                        >
                          <Check
                            size={11}
                            strokeWidth={2}
                            className="text-gold"
                          />
                        </span>
                        <span style={{ textWrap: "pretty" }}>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Colonne droite : profil + exemple */}
                <div className="lg:col-span-5 lg:sticky lg:top-32">
                  <motion.div variants={fadeUp}>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
                      À qui s&apos;adresse ce pack&#8239;?
                    </span>

                    <p
                      className="mt-6 text-[15px] md:text-[15.5px] leading-[1.8] text-bone/75 font-light"
                      style={{ textWrap: "pretty" }}
                    >
                      {profile.audience}
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-10">
                    <GlassCard
                      variant="dark"
                      highlighted={pack.highlighted}
                      glow={pack.highlighted}
                      className="p-8 md:p-10"
                    >
                      <span className="text-[10px] uppercase tracking-[0.22em] text-gold font-medium">
                        Exemple de rendement
                      </span>

                      <p
                        className="mt-4 font-display text-bone leading-[1.25]"
                        style={{
                          fontSize: "clamp(20px, 2vw, 24px)",
                          textWrap: "balance",
                        }}
                      >
                        {profile.example.label}
                      </p>

                      <div className="mt-6 flex items-baseline gap-2">
                        <span
                          className="font-display font-light text-gold/95 leading-none"
                          style={{ fontSize: "clamp(32px, 3.5vw, 44px)" }}
                        >
                          {profile.example.monthly}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.22em] text-pearl">
                          net / mois
                        </span>
                      </div>

                      <div className="mt-6 h-px w-12 bg-gold/40" />

                      <p
                        className="mt-6 text-[12.5px] md:text-[13px] leading-[1.65] text-pearl font-light italic"
                        style={{ textWrap: "pretty" }}
                      >
                        {profile.example.description}
                      </p>

                      <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-pearl/70">
                        Estimation indicative · non contractuelle
                      </p>
                    </GlassCard>
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-8">
                    <PremiumButton
                      href="/diagnostic"
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto"
                      withArrow
                    >
                      Estimer mon bien
                    </PremiumButton>
                  </motion.div>
                </div>
              </motion.article>

              {/* Séparateur entre packs */}
              {!isLast && (
                <motion.div
                  {...viewInProps}
                  variants={fadeUp}
                  className={cn("my-24 md:my-32")}
                >
                  <GoldDivider width="lg" />
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Séparateur de transition vers ServicesFAQ */}
        <motion.div
          {...viewInProps}
          variants={fadeUp}
          className="mt-20 md:mt-24"
        >
          <GoldDivider width="md" />
        </motion.div>
      </div>
    </section>
  );
}
