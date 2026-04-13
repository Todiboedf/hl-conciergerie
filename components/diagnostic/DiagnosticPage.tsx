"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Clock, Cpu, Sparkles } from "lucide-react";
import { DiagnosticForm } from "@/components/diagnostic/DiagnosticForm";
import { DiagnosticResult } from "@/components/diagnostic/DiagnosticResult";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type {
  DiagnosticInput,
  DiagnosticResult as DiagnosticResultType,
  DiagnosticState,
} from "@/lib/types/diagnostic";

/**
 * Page /diagnostic. Orchestre le flux complet :
 * - Hero de page (fond noir, glow or)
 * - DiagnosticForm (fond cream) tant que l'utilisateur n'a pas soumis
 * - DiagnosticResult (fond cream) avec reveal animé après soumission
 * - Bandeau de confiance sous le form (algorithme, données, rapidité)
 *
 * Scroll automatique vers le résultat une fois la réponse reçue,
 * comme spécifié dans le brief Session 4.
 */

export function DiagnosticPage() {
  const [state, setState] = useState<DiagnosticState>({ status: "idle" });
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleSuccess = useCallback(
    ({
      input,
      result,
    }: {
      input: DiagnosticInput;
      result: DiagnosticResultType;
    }) => {
      setState({ status: "success", data: result, input });

      // Scroll fluide vers le résultat, avec un léger délai pour
      // laisser le DOM se monter et AnimatePresence jouer l'entrée.
      requestAnimationFrame(() => {
        setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 120);
      });
    },
    [],
  );

  const handleRestart = useCallback(() => {
    setState({ status: "idle" });
    // Revient en haut de la zone formulaire quand on relance.
    requestAnimationFrame(() => {
      const anchor = document.getElementById("diagnostic-form-anchor");
      anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const showResult = state.status === "success";

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="relative isolate overflow-hidden bg-black radial-dark grain-overlay"
        style={{
          paddingTop: "calc(var(--header-height) + 4rem)",
          paddingBottom: "5rem",
        }}
      >
        {/* Glow orbs */}
        <div className="glow-orb h-[600px] w-[600px] -top-40 -left-32 opacity-50" />
        <div className="glow-orb h-[500px] w-[500px] top-10 -right-20 opacity-45" />

        {/* Pattern points dorés subtils */}
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
            Outil de diagnostic
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="md" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-10 font-display font-light text-bone leading-[1.04] tracking-[-0.015em]"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              maxWidth: "960px",
              textWrap: "balance",
            }}
          >
            Combien votre bien peut-il vraiment rapporter à{" "}
            <span className="italic text-gold/95">Nice&nbsp;?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 text-[16px] md:text-[18px] leading-[1.7] text-pearl font-light"
            style={{ maxWidth: "700px", textWrap: "pretty" }}
          >
            En deux minutes, obtenez une estimation personnalisée basée sur les
            données réelles du marché niçois et les caractéristiques uniques de
            votre bien.
          </motion.p>

          {/* 3 mini-bullets */}
          <motion.ul
            variants={staggerContainer}
            className="mx-auto mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10"
          >
            {[
              { icon: CheckCircle, label: "Gratuit" },
              { icon: Sparkles, label: "Sans inscription" },
              { icon: Cpu, label: "Analyse IA en temps réel" },
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

          <motion.div variants={fadeUp} className="mt-14">
            <GoldDivider width="md" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== ZONE PRINCIPALE (fond cream) ===== */}
      <section
        className="relative bg-cream"
        style={{
          paddingTop: "5rem",
          paddingBottom: "6rem",
        }}
      >
        {/* Pattern points dorés atténué en fond */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #8A7030 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          id="diagnostic-form-anchor"
          className="relative z-10 container-hl"
          style={{ scrollMarginTop: "calc(var(--header-height) + 2rem)" }}
        >
          <div className="mx-auto" style={{ maxWidth: "900px" }}>
            <AnimatePresence mode="wait" initial={false}>
              {showResult ? (
                <motion.div
                  key="result"
                  ref={resultRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {state.status === "success" && (
                    <DiagnosticResult
                      input={state.input}
                      result={state.data}
                      onRestart={handleRestart}
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DiagnosticForm onSuccess={handleSuccess} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===== BANDEAU DE CONFIANCE (masqué quand résultat affiché pour ne pas parasiter le CTA final) ===== */}
      {!showResult && (
        <section className="relative bg-cream border-t border-gold-dark/15">
          <div className="container-hl py-16 md:py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                {
                  icon: Cpu,
                  title: "Algorithme H&L propriétaire",
                  description:
                    "Croisement des données marché et des 11 facteurs multiplicateurs spécifiques à Nice.",
                },
                {
                  icon: Sparkles,
                  title: "Données réelles Nice 2025",
                  description:
                    "Sources Airbtics, Welkeys, AirDNA sur la période novembre 2024 à octobre 2025.",
                },
                {
                  icon: Clock,
                  title: "Réponse en 15 secondes",
                  description:
                    "Analyse IA instantanée, sans formulaire de qualification ni inscription préalable.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="border border-gold-dark/25 bg-white/50 p-6 md:p-8"
                  >
                    <span className="flex h-10 w-10 items-center justify-center border border-gold-dark/40 bg-white/70 mb-5">
                      <Icon
                        size={15}
                        strokeWidth={1.5}
                        className="text-gold-dark"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="font-display text-[20px] md:text-[22px] text-black leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.65] text-black/65 font-light">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
