"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/ui/GlassCard";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { PACKS } from "@/lib/packs";
import {
  PROPERTY_TYPE_LABELS,
  NICE_AREA_LABELS,
  type DiagnosticInput,
  type DiagnosticResult as DiagnosticResultType,
} from "@/lib/types/diagnostic";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Écran de résultat du diagnostic. Affiche l'estimation principale
 * (gros chiffre or, fourchette), les métriques détaillées (ADR,
 * occupation, annuel), la justification, les points forts, les
 * optimisations, le pack recommandé et les CTAs de conversion.
 *
 * Reçoit un forwardRef pour que le parent puisse scroller vers ce
 * composant après succès (spec : scroll automatique vers le résultat).
 */

interface DiagnosticResultProps {
  input: DiagnosticInput;
  result: DiagnosticResultType;
  onRestart: () => void;
}

function fmtEur(value: number): string {
  return `${Math.round(value).toLocaleString("fr-FR")} €`;
}

export const DiagnosticResult = forwardRef<HTMLDivElement, DiagnosticResultProps>(
  function DiagnosticResult({ input, result, onRestart }, ref) {
    const [emailStatus, setEmailStatus] = useState<
      "idle" | "loading" | "sent"
    >("idle");

    const pack = PACKS.find((p) => p.id === result.packRecommande);
    const contactHref = [
      "/contact?",
      `firstName=${encodeURIComponent(input.firstName)}`,
      `&lastName=${encodeURIComponent(input.lastName)}`,
      `&email=${encodeURIComponent(input.email)}`,
      input.phone ? `&phone=${encodeURIComponent(input.phone)}` : "",
      `&source=diagnostic`,
    ].join("");

    const handleSendEmail = async () => {
      if (emailStatus !== "idle") return;
      setEmailStatus("loading");
      try {
        const response = await fetch("/api/diagnostic/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              propertyType: input.propertyType,
              area: input.area,
              standing: input.standing,
              surfaceSqm: input.surfaceSqm,
            },
            result,
          }),
        });
        const data = (await response.json().catch(() => ({}))) as {
          success?: boolean;
          error?: string;
        };
        if (!response.ok || !data.success) {
          setEmailStatus("idle");
          toast.error(
            data.error ??
              "Impossible d'envoyer l'estimation par email. Merci de réessayer.",
          );
          return;
        }
        setEmailStatus("sent");
        toast.success(
          `Estimation envoyée à ${input.email}. Pensez à vérifier vos indésirables.`,
        );
      } catch {
        setEmailStatus("idle");
        toast.error(
          "Impossible d'envoyer l'estimation par email. Merci de réessayer.",
        );
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full flex flex-col gap-8"
      >
        {/* ===== Bloc principal : estimation centrale ===== */}
        <motion.div variants={fadeUp}>
          <GlassCard variant="cream" className="p-8 md:p-12 lg:p-16 text-center">
            <span className="eyebrow-cream block">
              Votre estimation personnalisée
            </span>

            <div className="mt-6 flex justify-center">
              <GoldDivider width="md" />
            </div>

            <h2 className="mt-10 font-display font-light text-black/70 text-[18px] md:text-[22px] tracking-wide">
              Votre bien peut générer
            </h2>

            <motion.p
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.35,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display font-light text-gold-dark mt-4 leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: "clamp(56px, 11vw, 120px)" }}
            >
              {fmtEur(result.revenuMensuelEstime.central)}
            </motion.p>

            <p className="mt-4 text-[14px] md:text-[15px] text-black/65 tracking-wide font-light">
              par mois en moyenne, sous gestion H&amp;L
            </p>

            <div className="mt-10 inline-flex flex-col md:flex-row items-center gap-4 md:gap-6 px-6 py-4 bg-white/60 border border-gold-dark/25">
              <div className="text-center md:text-left">
                <p className="text-[10.5px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                  Fourchette indicative
                </p>
                <p className="text-[15px] text-black mt-1 font-light">
                  Entre{" "}
                  <span className="font-medium text-gold-dark">
                    {fmtEur(result.revenuNetProprietaire.min)}
                  </span>{" "}
                  et{" "}
                  <span className="font-medium text-gold-dark">
                    {fmtEur(result.revenuNetProprietaire.max)}
                  </span>{" "}
                  net propriétaire annuel
                </p>
              </div>
            </div>

            <p className="mt-6 text-[11.5px] uppercase tracking-[0.18em] text-black/45">
              {PROPERTY_TYPE_LABELS[input.propertyType]} · {input.surfaceSqm} m² ·{" "}
              {NICE_AREA_LABELS[input.area]}
            </p>
          </GlassCard>
        </motion.div>

        {/* ===== Métriques détaillées ===== */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <MetricCard
            label="Taux d'occupation estimé"
            value={`${result.tauxOccupationEstime}\u00A0%`}
            hint="Moyenne annuelle pondérée"
          />
          <MetricCard
            label="ADR moyen estimé"
            value={fmtEur(result.adrEstime)}
            hint="Par nuit, toutes saisons"
          />
          <MetricCard
            label="Revenu annuel brut"
            value={fmtEur(result.revenuAnnuelEstime.central)}
            hint={`Fourchette ${fmtEur(result.revenuAnnuelEstime.min)} à ${fmtEur(result.revenuAnnuelEstime.max)}`}
          />
        </motion.div>

        {/* ===== Justification ===== */}
        <motion.div variants={fadeUp}>
          <GlassCard variant="cream" className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-9 w-9 items-center justify-center border border-gold-dark/40 bg-white/60 shrink-0">
                <Sparkles
                  size={15}
                  strokeWidth={1.5}
                  className="text-gold-dark"
                  aria-hidden="true"
                />
              </span>
              <h3 className="font-display text-[22px] md:text-[26px] text-black leading-tight">
                Pourquoi cette estimation
              </h3>
            </div>
            <p className="text-[15px] md:text-[16px] leading-[1.75] text-black/80 font-light">
              {result.justification}
            </p>
          </GlassCard>
        </motion.div>

        {/* ===== Grille 2 col : points forts / optimisations ===== */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <GlassCard variant="cream" className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-9 w-9 items-center justify-center border border-gold-dark/40 bg-white/60 shrink-0">
                <Check
                  size={15}
                  strokeWidth={1.8}
                  className="text-gold-dark"
                  aria-hidden="true"
                />
              </span>
              <h3 className="font-display text-[22px] md:text-[26px] text-black leading-tight">
                Les atouts de votre bien
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {result.pointsForts.map((point, i) => (
                <li key={`point-${i}`} className="flex items-start gap-3">
                  <span className="mt-1.5 block h-1 w-4 bg-gold-dark shrink-0" />
                  <p className="text-[14.5px] leading-[1.65] text-black/80 font-light">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard variant="cream" className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-9 w-9 items-center justify-center border border-gold-dark/40 bg-white/60 shrink-0">
                <TrendingUp
                  size={15}
                  strokeWidth={1.5}
                  className="text-gold-dark"
                  aria-hidden="true"
                />
              </span>
              <h3 className="font-display text-[22px] md:text-[26px] text-black leading-tight">
                Comment aller plus loin
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {result.optimisationsPossibles.map((item, i) => (
                <li key={`opt-${i}`} className="flex items-start gap-3">
                  <span className="mt-1.5 block h-1 w-4 bg-gold-dark shrink-0" />
                  <p className="text-[14.5px] leading-[1.65] text-black/80 font-light">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        {/* ===== Pack recommandé (sombre, carte signature) ===== */}
        <motion.div variants={fadeUp}>
          <div className="relative isolate overflow-hidden bg-black grain-overlay">
            <div className="glow-orb h-[380px] w-[380px] -top-24 -right-24 opacity-60" />
            <div className="relative z-10 p-8 md:p-12 lg:p-14">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div className="max-w-xl">
                  <span className="eyebrow block">Notre recommandation</span>
                  <div className="mt-5">
                    <GoldDivider width="sm" align="left" />
                  </div>
                  <h3
                    className="mt-8 font-display font-light text-bone leading-[1.05] tracking-[-0.01em]"
                    style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
                  >
                    Pack{" "}
                    <span className="italic text-gold/95">
                      {pack?.name ?? result.packRecommande}
                    </span>
                  </h3>
                  <p className="mt-4 text-[13px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                    Commission {result.commissionHL}&nbsp;% sur le revenu généré
                  </p>
                  <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-bone/80 font-light">
                    {result.raisonPackRecommande}
                  </p>
                </div>

                <div className="shrink-0">
                  <PremiumButton
                    href={`/services#${result.packRecommande}`}
                    variant="secondary"
                    size="lg"
                    withArrow
                  >
                    Voir le détail
                  </PremiumButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== CTAs finaux ===== */}
        <motion.div variants={fadeUp} className="text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-medium">
            Prochaine étape
          </p>
          <div className="mt-4">
            <GoldDivider width="sm" />
          </div>
          <h3
            className="mt-8 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Discutons de votre bien avec{" "}
            <span className="italic text-gold-dark">nos associés</span>.
          </h3>
          <p className="mt-5 mx-auto max-w-xl text-[15px] md:text-[16px] leading-[1.7] text-black/65 font-light">
            Une estimation automatisée reste indicative. Une visite, une
            discussion et vous saurez précisément comment maximiser les revenus
            de votre bien sans vous en occuper.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PremiumButton
              href={contactHref}
              variant="primary"
              size="lg"
              withArrow
            >
              Prendre rendez-vous
            </PremiumButton>

            <PremiumButton
              variant="ghost"
              size="lg"
              onCream
              onClick={handleSendEmail}
              disabled={emailStatus !== "idle"}
            >
              {emailStatus === "loading" ? (
                <>
                  <Loader2 size={14} strokeWidth={1.8} className="animate-spin" />
                  Envoi en cours
                </>
              ) : emailStatus === "sent" ? (
                <>
                  <Check size={14} strokeWidth={1.8} />
                  Estimation envoyée
                </>
              ) : (
                <>
                  <Mail size={14} strokeWidth={1.5} />
                  Recevoir par email
                </>
              )}
            </PremiumButton>
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="mt-8 inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.2em] text-black/55 hover:text-gold-dark transition-colors font-medium"
          >
            <RotateCcw size={12} strokeWidth={1.6} />
            Refaire un diagnostic
          </button>
        </motion.div>

        {/* ===== Disclaimer ===== */}
        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center text-[11.5px] leading-[1.7] text-black/50 italic font-light px-4"
        >
          Cette estimation est indicative et non contractuelle. Le revenu réel
          dépend de nombreux facteurs (qualité de la gestion, qualité des
          photos, prix pratiqués, saisonnalité effective, événements locaux).
          H&amp;L Conciergerie se tient à votre disposition pour un diagnostic
          détaillé et un audit sur place.
        </motion.p>
      </motion.div>
    );
  },
);

interface MetricCardProps {
  label: string;
  value: string;
  hint: string;
}

function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <div className="relative border border-gold-dark/25 bg-white/60 px-6 py-6 md:py-7">
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 p-2 text-gold-dark/30"
      >
        <ArrowUpRight size={14} strokeWidth={1.5} />
      </span>
      <p className="text-[10.5px] uppercase tracking-[0.22em] text-gold-dark font-medium">
        {label}
      </p>
      <p
        className="mt-3 font-display font-light text-black leading-none tracking-[-0.01em]"
        style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
      >
        {value}
      </p>
      <p className="mt-3 text-[12px] text-black/55 leading-relaxed font-light">
        {hint}
      </p>
    </div>
  );
}
