"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Handshake,
  Home,
  KeyRound,
  Lock,
  Search,
  Sparkles,
  Users,
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
    icon: Home,
    title: "Adresses sélectionnées",
    description:
      "Une poignée de biens choisis pour leur caractère, leur emplacement et leur standing. Appartements face mer, villas d'exception, pieds-à-terre intimistes. Chaque adresse est personnellement visitée et validée.",
  },
  {
    icon: Users,
    title: "Accueil personnalisé",
    description:
      "Un membre de l'équipe vous accueille en personne dès votre arrivée. Visite du bien, recommandations locales, remise des clés et réponses à vos questions : tout se fait en confiance, jamais dans une boîte à clés anonyme.",
  },
  {
    icon: Sparkles,
    title: "Conciergerie dédiée",
    description:
      "Chef privé, chauffeur, réservations dans les plus belles tables, expériences sur mesure, préparation d'anniversaire ou de demande en mariage. Nous orchestrons tout ce que votre séjour peut exiger.",
  },
  {
    icon: Lock,
    title: "Confidentialité absolue",
    description:
      "Aucune adresse n'est publiée en accès libre. Chaque demande est étudiée par nos équipes pour préserver le calme et la discrétion de nos maisons, et composer le séjour qui vous correspond vraiment.",
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
    icon: Search,
    title: "Vous nous décrivez votre séjour",
    description:
      "Dates, nombre de voyageurs, préférences de quartier, exigences particulières : notre équipe vous recontacte sous 24 heures avec une sélection personnalisée de biens disponibles et de services associés.",
  },
  {
    roman: "II.",
    icon: Handshake,
    title: "Réservation et règlement sécurisés",
    description:
      "Devis détaillé, paiement en ligne sécurisé, contrat de séjour transparent. Tous les détails opérationnels sont calés en amont pour que vous n'ayez à vous soucier de rien à votre arrivée.",
  },
  {
    roman: "III.",
    icon: KeyRound,
    title: "Arrivée et séjour orchestrés",
    description:
      "Accueil sur place par un membre de l'équipe, présentation complète du bien, conciergerie à votre disposition 7 jours sur 7. Profitez simplement de la Côte d'Azur, nous nous occupons du reste.",
  },
];

interface StatProof {
  value: string;
  label: string;
  note?: string;
}

const STATS: StatProof[] = [
  {
    value: "5★",
    label:
      "Notre ambition : une qualité d'accueil et de prestation digne d'un hôtel cinq étoiles, sur chaque séjour.",
    note: "Engagement maison",
  },
  {
    value: "24 h",
    label:
      "Délai de réponse garanti à toute demande de séjour, traitée personnellement par notre équipe.",
    note: "Notre promesse",
  },
  {
    value: "15+",
    label:
      "Partenaires locaux sélectionnés pour vos expériences : chef privé, chauffeur, restaurants, bateaux, wellness.",
    note: "Réseau H&L",
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_VOYAGEURS: FaqItem[] = [
  {
    question: "Comment réserver l'une de vos adresses ?",
    answer:
      "Vous nous écrivez via la page contact en précisant vos dates, le nombre de voyageurs et vos préférences. Nous revenons vers vous sous 24 heures avec une sélection personnalisée correspondant à votre demande, accompagnée d'un devis détaillé. La réservation est confirmée après signature du contrat et versement de l'acompte.",
  },
  {
    question: "Quels services la conciergerie peut-elle organiser ?",
    answer:
      "Chef à domicile, chauffeur privé, transferts aéroport, réservations dans les plus belles tables de la région, location de bateau, excursions personnalisées, soins wellness, fleuriste, préparation d'événements spéciaux. Notre équipe coordonne l'ensemble avec nos partenaires locaux sélectionnés pour leur niveau de prestation.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Paiement par carte bancaire via une plateforme sécurisée (Visa, Mastercard, American Express) ou par virement bancaire pour les séjours supérieurs à cinq mille euros. Un acompte de trente pour cent est demandé à la réservation, le solde étant réglé au plus tard quinze jours avant votre arrivée.",
  },
  {
    question: "Quelle est votre politique d'annulation ?",
    answer:
      "Annulation gratuite jusqu'à soixante jours avant l'arrivée, remboursement intégral de l'acompte. Entre soixante et trente jours avant l'arrivée, l'acompte est conservé. À moins de trente jours, le montant total du séjour reste dû. Nous recommandons systématiquement la souscription d'une assurance annulation pour les séjours de longue durée.",
  },
  {
    question: "Les animaux de compagnie sont-ils acceptés ?",
    answer:
      "La politique animale est définie bien par bien par le propriétaire. Nous vous indiquons dès votre première demande quelles adresses acceptent les animaux et dans quelles conditions (supplément ménage éventuel, taille maximale, etc.). Précisez-le dans votre message initial, nous adaptons la sélection en conséquence.",
  },
];

/**
 * Page dédiée aux voyageurs souhaitant séjourner dans une adresse H&L.
 * Structure : Hero → Bénéfices (cream) → Comment ça marche (dark) →
 * Repères (cream) → FAQ (cream) → CTA final (dark) avec id="contact"
 * pour recevoir l'ancre du CTA hero.
 */
export function VoyageursPage() {
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
        <div className="glow-orb h-[640px] w-[640px] -top-44 -right-28 opacity-55" />
        <div className="glow-orb h-[520px] w-[520px] top-16 -left-24 opacity-50" />

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
            Voyageurs · Nice &amp; Côte d&apos;Azur
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
            L&apos;art de séjourner sur la{" "}
            <span className="italic text-gold/95">Côte d&apos;Azur</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 text-[16px] md:text-[18px] leading-[1.75] text-pearl font-light"
            style={{ maxWidth: "720px", textWrap: "pretty" }}
          >
            Une sélection confidentielle d&apos;adresses d&apos;exception à Nice
            et sur la Riviera, accompagnées d&apos;une conciergerie dédiée pour
            orchestrer chaque détail de votre séjour.
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mx-auto mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10"
          >
            {[
              { icon: Home, label: "Adresses triées sur le volet" },
              { icon: Users, label: "Accueil personnel" },
              { icon: Clock, label: "Conciergerie 7j/7" },
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
            <PremiumButton href="#contact" variant="primary" size="lg" withArrow>
              Demander un séjour
            </PremiumButton>
            <PremiumButton href="/contact" variant="secondary" size="lg">
              Nous écrire
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
              Ce que vous recevez
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                textWrap: "balance",
              }}
            >
              Quatre engagements pour un séjour{" "}
              <span className="italic text-gold-dark">sans concession</span>.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
              style={{ maxWidth: "680px", textWrap: "pretty" }}
            >
              Nous ne gérons qu&apos;un nombre limité d&apos;adresses, et ce
              n&apos;est pas un hasard. Chaque séjour mérite notre pleine
              attention, de la première réponse à la remise des clés.
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
        <div className="glow-orb h-[560px] w-[560px] -top-36 left-0 opacity-30" />
        <div className="glow-orb h-[500px] w-[500px] -bottom-28 -right-20 opacity-25" />

        <motion.div
          {...viewInProps}
          variants={staggerContainer}
          className="container-hl relative z-10 py-24 md:py-32"
        >
          <div className="max-w-3xl">
            <motion.span variants={fadeUp} className="eyebrow block">
              De la demande au départ
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-display font-light text-bone leading-[1.05] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                textWrap: "balance",
              }}
            >
              Votre séjour, orchestré{" "}
              <span className="italic text-gold/95">de bout en bout</span>.
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

      {/* ========== REPÈRES (cream) ========== */}
      <section
        id="reperes"
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
              Trois engagements qui cadrent{" "}
              <span className="italic text-gold-dark">chaque séjour</span>.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
              style={{ maxWidth: "680px", textWrap: "pretty" }}
            >
              Nous lançons notre activité en 2026 et préférons parler
              d&apos;ambition plutôt que d&apos;avis clients fabriqués. Voici
              les repères que nous nous imposons dès la première prise de
              contact.
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
                Questions de voyageurs
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
                Tout ce qu&apos;il vous faut savoir{" "}
                <span className="italic text-gold-dark">avant de réserver</span>
                .
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-[17px] md:text-[18px] leading-[1.6] text-black/60 font-light"
                style={{ maxWidth: "640px", textWrap: "pretty" }}
              >
                Une question ne figure pas ici&nbsp;? Écrivez-nous. Notre équipe
                vous répond personnellement sous 24 heures, jamais par un
                chatbot.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-7">
              <Accordion className="flex w-full flex-col divide-y divide-gold-dark/20 border-y border-gold-dark/25">
                {FAQ_VOYAGEURS.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-voy-${idx}`}
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

      {/* ========== CTA FINAL (dark) — ancre #contact pour le hero ========== */}
      <section
        id="contact"
        className="relative isolate overflow-hidden bg-black grain-overlay"
        style={{
          background:
            "radial-gradient(ellipse at center, #151515 0%, #0A0A0A 75%)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 h-[640px] w-[640px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-24 h-[640px] w-[640px] rounded-full pointer-events-none"
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
            Demander un séjour
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="md" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-10 font-display font-light text-bone leading-[1.05] tracking-[-0.015em]"
            style={{
              fontSize: "clamp(34px, 5.4vw, 72px)",
              maxWidth: "820px",
              textWrap: "balance",
            }}
          >
            Envie de découvrir la Côte d&apos;Azur{" "}
            <span className="italic text-gold/95">autrement</span>&nbsp;?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 text-[16px] md:text-[18px] leading-[1.75] text-pearl font-light"
            style={{ maxWidth: "640px", textWrap: "pretty" }}
          >
            Confiez-nous votre séjour. Notre équipe vous répond sous 24 heures
            avec une sélection personnalisée d&apos;adresses et de services.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PremiumButton
              href="/contact"
              variant="primary"
              size="lg"
              withArrow
            >
              Nous écrire
            </PremiumButton>
            <PremiumButton href="/a-propos" variant="ghost" size="lg">
              Découvrir la maison
            </PremiumButton>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-10 italic text-[13px] text-pearl/80 font-light"
            style={{ textWrap: "pretty" }}
          >
            Réponse personnelle sous 24 heures · Devis détaillé · Paiement
            sécurisé
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
