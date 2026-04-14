"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Coins,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { HLLogo } from "@/components/ui/HLLogo";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: TrendingUp,
    title: "Revenus maximisés",
    description:
      "Pricing dynamique, multi-diffusion internationale, optimisation continue. Nos outils captent chaque pic de demande sur le marché niçois, du Carnaval au Yacht Show de Monaco.",
  },
  {
    icon: Clock,
    title: "Votre temps préservé",
    description:
      "Nous prenons en charge l'intégralité du cycle locatif. Aucune décision, aucune coordination, aucun imprévu ne vous sollicite au quotidien. Vous recevez vos revenus, simplement.",
  },
  {
    icon: ShieldCheck,
    title: "Conformité sans zone d'ombre",
    description:
      "Déclaration en mairie, règlement Nice 2026, loi Le Meur, régime LMNP. Votre bien respecte scrupuleusement chaque obligation réglementaire et fiscale, sans stress administratif.",
  },
  {
    icon: KeyRound,
    title: "Votre bien, toujours disponible",
    description:
      "Vous gardez la jouissance totale de votre résidence. Bloquez vos dates en deux clics, nous préparons le bien pour vos séjours personnels avec la même attention que pour vos hôtes.",
  },
];

interface Step {
  roman: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    roman: "I.",
    icon: MessageCircle,
    title: "Diagnostic et rencontre",
    description:
      "Vous nous confiez vos objectifs. Nous analysons le potentiel de votre bien sur le marché niçois et vous présentons une feuille de route chiffrée en rendez-vous, physique ou en visioconférence.",
  },
  {
    roman: "II.",
    icon: Sparkles,
    title: "Mise en lumière éditoriale",
    description:
      "Shooting professionnel, rédaction sur mesure, diffusion sur plus de quinze plateformes internationales. Votre bien devient une adresse qui séduit dès la première impression.",
  },
  {
    roman: "III.",
    icon: Coins,
    title: "Gestion quotidienne et reporting",
    description:
      "Accueil, ménage, maintenance, optimisation tarifaire : tout est pris en charge. Chaque mois, vos revenus nets et un reporting détaillé arrivent sur votre compte, sans effort.",
  },
];

interface StatProof {
  value: string;
  label: string;
  note?: string;
}

const STATS: StatProof[] = [
  {
    value: "78 %",
    label: "Taux d'occupation visé en année pleine sous gestion H&L.",
    note: "Objectif de maison",
  },
  {
    value: "37 k€",
    label: "Revenu médian annuel d'un bien géré à Nice.",
    note: "Source Airbtics 2025",
  },
  {
    value: "0 €",
    label: "Aucun frais fixe. Nous sommes rémunérés au succès, sur vos revenus.",
    note: "Engagement maison",
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_PROPRIETAIRES: FaqItem[] = [
  {
    question: "Quel est le niveau d'engagement attendu ?",
    answer:
      "Aucun engagement de durée minimale. Notre conviction est qu'un propriétaire satisfait reste naturellement. Le contrat est résiliable avec un préavis de trente jours, sans frais, sans justification. Nous préférons mériter votre confiance chaque mois plutôt que de la verrouiller contractuellement.",
  },
  {
    question: "Comment se passe le reversement de mes revenus ?",
    answer:
      "Vos revenus nets sont reversés chaque mois, entre le cinq et le dix, accompagnés d'un reporting détaillé : séjours de la période, chiffre d'affaires brut, commission H&L, frais documentés, revenu net. Les documents comptables sont fournis dans un format exploitable par votre expert-comptable ou votre fiscaliste, notamment pour votre déclaration LMNP.",
  },
  {
    question: "Puis-je continuer à occuper mon bien quand je le souhaite ?",
    answer:
      "Absolument. Votre bien vous appartient et vous en gardez la pleine jouissance. Vous bloquez vos dates personnelles sur votre espace propriétaire, nous préparons le bien avant votre arrivée et le remettons en gestion à votre départ. Les dates bloquées ne génèrent évidemment aucune commission de notre part.",
  },
  {
    question: "Êtes-vous conformes à la nouvelle réglementation niçoise ?",
    answer:
      "Oui, complètement. Nous maîtrisons le cadre de la loi Le Meur, les obligations de déclaration en mairie de Nice, les règles de changement d'usage, les quotas de nuitées applicables à certaines résidences principales et les évolutions de la réglementation prévues en 2026. Chaque bien mis en gestion fait l'objet d'un audit de conformité en amont.",
  },
  {
    question: "Que se passe-t-il si mon bien est vacant un mois ?",
    answer:
      "Notre commission étant proportionnelle aux revenus générés, vous ne payez rien en l'absence de réservation : nous sommes rémunérés au succès. Cela aligne nos intérêts avec les vôtres et garantit que nos équipes pricing et commercialisation travaillent activement à remplir votre calendrier. En cas de période creuse prolongée, un rendez-vous stratégique est systématiquement proposé pour ajuster le positionnement.",
  },
];

/**
 * Page dédiée aux propriétaires souhaitant confier leur bien à H&L.
 * Structure : Hero → Bénéfices (cream) → Comment ça marche (dark) →
 * Preuve sociale (cream) → FAQ (cream) → CTA final (dark).
 * Reprend strictement le design system des sections landing.
 */
export function ProprietairesPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section
        className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
        style={{
          paddingTop: "calc(var(--header-height) + 4rem)",
          paddingBottom: "6rem",
        }}
      >
        <div className="glow-orb h-[640px] w-[640px] -top-44 -left-28 opacity-55" />
        <div className="glow-orb h-[520px] w-[520px] top-16 -right-24 opacity-50" />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container-hl relative z-10 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow block">
            Propriétaires · Nice &amp; Côte d&apos;Azur
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="md" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-10 font-display font-light text-bone leading-[1.02] tracking-[-0.015em]"
            style={{
              fontSize: "clamp(40px, 6.4vw, 84px)",
              maxWidth: "960px",
              textWrap: "balance",
            }}
          >
            Votre bien, entre les mains d&apos;une maison{" "}
            <span className="italic text-gold/95">qui lui ressemble</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 text-[16px] md:text-[18px] leading-[1.75] text-pearl font-light"
            style={{ maxWidth: "720px", textWrap: "pretty" }}
          >
            Gestion totale, optimisation continue, et la sérénité d&apos;un
            service hôtelier de prestige pour votre résidence secondaire ou
            votre investissement locatif à Nice et sur la Côte d&apos;Azur.
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mx-auto mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10"
          >
            {[
              { icon: ShieldCheck, label: "Sans engagement" },
              { icon: Sparkles, label: "Reporting total" },
              { icon: Clock, label: "Réponse sous 24 h" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-center gap-2.5 text-pearl"
                >
                  <span className="flex h-7 w-7 items-center justify-center border border-gold/35 bg-gold/5">
                    <Icon
                      size={12}
                      strokeWidth={1.6}
                      className="text-gold"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[12.5px] uppercase tracking-[0.22em] font-medium">
                    {item.label}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PremiumButton
              href="/diagnostic"
              variant="primary"
              size="lg"
              withArrow
            >
              Lancer mon diagnostic gratuit
            </PremiumButton>
            <PremiumButton href="/services" variant="secondary" size="lg">
              Découvrir nos packs
            </PremiumButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-14">
            <GoldDivider width="md" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== BÉNÉFICES (cream) ========== */}
      <section
        id="benefices"
        className="relative isolate overflow-hidden bg-cream text-black"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #8A7030 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <motion.div
          {...viewInProps}
          variants={staggerContainer}
          className="container-hl relative z-10 py-24 md:py-32"
        >
          <div className="max-w-3xl">
            <motion.span variants={fadeUp} className="eyebrow-cream block">
              Ce que vous gagnez
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                textWrap: "balance",
              }}
            >
              Quatre bénéfices concrets, aucun{" "}
              <span className="italic text-gold-dark">effet de manche</span>.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
              style={{ maxWidth: "680px", textWrap: "pretty" }}
            >
              Nos propriétaires nous choisissent pour des raisons précises. Les
              voici, formulées sans embellissement, comme nous les mesurons sur
              le terrain chaque mois.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.article
                  key={benefit.title}
                  variants={fadeUp}
                  className="group relative flex flex-col border border-gold-border/60 bg-white/40 backdrop-blur-md p-8 md:p-10 transition-[transform,border-color,background-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-dark/70 hover:bg-white/60 will-change-transform"
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-gold-dark/40 bg-gold-dark/5 mb-6 transition-all duration-500 group-hover:border-gold-dark/70 group-hover:bg-gold-dark/10">
                    <Icon
                      size={19}
                      strokeWidth={1.4}
                      className="text-gold-dark"
                      aria-hidden="true"
                    />
                  </span>

                  <h3
                    className="font-display font-normal text-black leading-tight"
                    style={{
                      fontSize: "clamp(22px, 2.2vw, 28px)",
                      textWrap: "balance",
                    }}
                  >
                    {benefit.title}
                  </h3>

                  <div className="mt-4 h-px w-10 bg-gold-dark/40 transition-all duration-500 group-hover:w-16" />

                  <p
                    className="mt-5 text-[14.5px] leading-[1.7] text-black/70 font-light"
                    style={{ textWrap: "pretty" }}
                  >
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-20">
            <GoldDivider width="md" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== COMMENT ÇA MARCHE (dark) ========== */}
      <section
        id="how-it-works"
        className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
      >
        <div className="glow-orb h-[560px] w-[560px] -top-36 right-0 opacity-30" />
        <div className="glow-orb h-[500px] w-[500px] -bottom-28 -left-20 opacity-25" />

        <motion.div
          {...viewInProps}
          variants={staggerContainer}
          className="container-hl relative z-10 py-24 md:py-32"
        >
          <div className="max-w-3xl">
            <motion.span variants={fadeUp} className="eyebrow block">
              Votre parcours, en trois temps
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display font-light text-bone leading-[1.05] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                textWrap: "balance",
              }}
            >
              Du premier contact à{" "}
              <span className="italic text-gold/95">vos premiers revenus</span>.
            </motion.h2>
          </div>

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
                  className="group relative flex flex-col border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 transition-[transform,border-color,background-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/[0.05] will-change-transform"
                >
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
                      <Icon size={18} strokeWidth={1.4} className="text-gold" />
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

          <motion.div variants={fadeUp} className="mt-20">
            <GoldDivider width="md" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== PREUVE SOCIALE / STATS (cream) ========== */}
      <section
        id="chiffres"
        className="relative isolate overflow-hidden bg-cream text-black"
      >
        <motion.div
          {...viewInProps}
          variants={staggerContainer}
          className="container-hl relative z-10 py-24 md:py-32"
        >
          <div className="max-w-3xl">
            <motion.span variants={fadeUp} className="eyebrow-cream block">
              Nos repères
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                textWrap: "balance",
              }}
            >
              Trois chiffres qui cadrent{" "}
              <span className="italic text-gold-dark">notre ambition</span>.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
              style={{ maxWidth: "680px", textWrap: "pretty" }}
            >
              Nous venons de lancer la maison et assumons de parler en objectifs
              plutôt qu&apos;en résultats passés. Ces repères fixent le cap que
              nous nous donnons sur chaque bien pris en gestion.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {STATS.map((stat) => (
              <motion.article
                key={stat.label}
                variants={fadeUp}
                className="group relative overflow-hidden border border-gold-border/60 bg-white/40 backdrop-blur-md p-8 md:p-10 transition-[transform,border-color,background-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-dark/70 hover:bg-white/60 will-change-transform"
              >
                <div
                  className="font-display font-light text-gold-dark leading-none tracking-[-0.02em]"
                  style={{ fontSize: "clamp(48px, 5.5vw, 80px)" }}
                >
                  {stat.value}
                </div>
                <div className="mt-5 h-px w-10 bg-gold-dark/40 transition-all duration-500 group-hover:w-16" />
                <p className="mt-5 text-[14px] leading-[1.6] text-black/70 font-light">
                  {stat.label}
                </p>
                {stat.note && (
                  <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/40">
                    {stat.note}
                  </p>
                )}
              </motion.article>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-12 italic text-[12px] text-black/40 font-light"
          >
            Objectifs de maison au lancement. Les résultats effectifs vous
            seront communiqués de manière transparente, bien par bien, mois
            après mois.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-20">
            <GoldDivider width="md" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== FAQ (cream) ========== */}
      <section
        id="faq"
        className="relative isolate overflow-hidden bg-cream text-black"
      >
        <motion.div
          {...viewInProps}
          variants={staggerContainer}
          className="container-hl relative z-10 py-24 md:py-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <motion.span variants={fadeUp} className="eyebrow-cream block">
                Questions de propriétaires
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
                Les réponses aux questions qui reviennent{" "}
                <span className="italic text-gold-dark">le plus souvent</span>.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
                style={{ maxWidth: "640px", textWrap: "pretty" }}
              >
                Une question ne figure pas ici&nbsp;? Écrivez-nous. Nous
                répondons personnellement à chaque propriétaire sous 24 heures,
                sans filtre commercial.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-7">
              <Accordion className="flex w-full flex-col divide-y divide-gold-dark/20 border-y border-gold-dark/25">
                {FAQ_PROPRIETAIRES.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-prop-${idx}`}
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

          <motion.div variants={fadeUp} className="mt-20">
            <GoldDivider width="md" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== CTA FINAL (dark) ========== */}
      <section
        id="cta"
        className="relative isolate overflow-hidden bg-black grain-overlay"
        style={{
          background:
            "radial-gradient(ellipse at center, #151515 0%, #0A0A0A 75%)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-24 h-[640px] w-[640px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-24 h-[640px] w-[640px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <motion.div
          {...viewInProps}
          variants={staggerContainer}
          className="container-hl relative z-10 py-24 md:py-32 text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <HLLogo variant="gold" size={110} />
          </motion.div>

          <motion.span variants={fadeUp} className="eyebrow block mt-10">
            Prêt à confier votre bien
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="md" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-10 font-display font-light text-bone leading-[1.05] tracking-[-0.015em]"
            style={{
              fontSize: "clamp(34px, 5.4vw, 72px)",
              maxWidth: "800px",
              textWrap: "balance",
            }}
          >
            Découvrez en deux minutes ce que votre bien{" "}
            <span className="italic text-gold/95">peut réellement générer</span>
            .
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 text-[16px] md:text-[18px] leading-[1.75] text-pearl font-light"
            style={{ maxWidth: "620px", textWrap: "pretty" }}
          >
            Diagnostic gratuit, sans inscription, basé sur les données réelles
            du marché niçois et les caractéristiques uniques de votre bien.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PremiumButton
              href="/diagnostic"
              variant="primary"
              size="lg"
              withArrow
            >
              Lancer mon diagnostic
            </PremiumButton>
            <PremiumButton href="/contact" variant="ghost" size="lg">
              Nous contacter
            </PremiumButton>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-10 italic text-[13px] text-pearl/80 font-light"
            style={{ textWrap: "pretty" }}
          >
            Réponse personnelle sous 24 heures · Rendez-vous physique ou
            visioconférence · Aucun engagement
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
