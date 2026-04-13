"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Indicateur de progression du diagnostic. 4 étapes nommées, marqueur
 * or qui se déplace sur la timeline avec animation fluide Framer
 * Motion. Accessible via aria-current sur le step actif.
 */

export const DIAGNOSTIC_STEPS = [
  { index: 0, label: "Votre bien" },
  { index: 1, label: "Localisation" },
  { index: 2, label: "Équipements" },
  { index: 3, label: "Vos coordonnées" },
] as const;

interface DiagnosticProgressProps {
  currentStep: number;
  className?: string;
}

export function DiagnosticProgress({
  currentStep,
  className,
}: DiagnosticProgressProps) {
  const total = DIAGNOSTIC_STEPS.length;
  const progressPercent = ((currentStep + 1) / total) * 100;

  return (
    <div
      className={cn("w-full", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={currentStep + 1}
      aria-label={`Étape ${currentStep + 1} sur ${total}`}
    >
      {/* Eyebrow count */}
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-medium">
          Étape {String(currentStep + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-black/55 font-light hidden sm:block">
          {DIAGNOSTIC_STEPS[currentStep]?.label}
        </p>
      </div>

      {/* Track + progress */}
      <div className="relative h-px w-full bg-gold-dark/20 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gold"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Step markers */}
      <ol className="mt-5 grid grid-cols-4 gap-2">
        {DIAGNOSTIC_STEPS.map((step) => {
          const isActive = step.index === currentStep;
          const isDone = step.index < currentStep;
          return (
            <li
              key={step.label}
              aria-current={isActive ? "step" : undefined}
              className="flex flex-col items-start gap-2"
            >
              <motion.span
                initial={false}
                animate={{
                  backgroundColor: isDone || isActive ? "#C9A84C" : "transparent",
                  borderColor:
                    isDone || isActive
                      ? "#C9A84C"
                      : "rgba(138,112,48,0.35)",
                  scale: isActive ? 1.18 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[6px] w-[6px] rotate-45 border"
                aria-hidden="true"
              />
              <span
                className={cn(
                  "hidden sm:block text-[11px] uppercase tracking-[0.16em] leading-tight",
                  isActive
                    ? "text-black font-medium"
                    : isDone
                      ? "text-black/65"
                      : "text-black/40",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
