"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { cn } from "@/lib/utils";

/**
 * Wrappers RadioGroup + RadioGroupItem basés sur @base-ui/react.
 * Style aligné sur le reste du système H&L (checkbox, switch, input) :
 * palette cream sur fond clair, focus ring or.
 */
function RadioGroup<Value extends string>({
  className,
  ...props
}: RadioGroupPrimitive.Props<Value>) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

interface RadioGroupItemProps {
  value: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
}

/**
 * Radio circulaire minimaliste H&L. Utilisé principalement via le
 * composant `RadioCard` ci-dessous qui englobe tout le label dans
 * une zone cliquable plus large (motif récurrent du diagnostic).
 */
function RadioGroupItem({
  className,
  value,
  id,
  disabled,
  "aria-label": ariaLabel,
}: RadioGroupItemProps) {
  return (
    <RadioPrimitive.Root
      value={value}
      id={id}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold-dark/40 bg-transparent transition-colors outline-none",
        "focus-visible:border-gold-dark focus-visible:ring-3 focus-visible:ring-gold-dark/30",
        "data-checked:border-gold-dark data-checked:bg-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <RadioPrimitive.Indicator
        className="block h-2 w-2 rounded-full bg-gold-dark"
      />
    </RadioPrimitive.Root>
  );
}

/**
 * Carte radio premium : toute la carte est cliquable. État coché
 * (détecté via l'attribut data-checked du Radio.Root sous-jacent)
 * appliqué par sélection ciblée pour éviter un state React en plus.
 */
interface RadioCardProps {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

function RadioCard({
  value,
  label,
  description,
  disabled,
  className,
}: RadioCardProps) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer items-start gap-3 border border-gold-dark/25 bg-white/40 px-4 py-3.5 transition-all",
        "hover:border-gold-dark/55 hover:bg-white/60",
        "has-[[data-checked]]:border-gold-dark has-[[data-checked]]:bg-white",
        "has-[[data-checked]]:shadow-[0_6px_20px_-10px_rgba(138,112,48,0.35)]",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <RadioGroupItem value={value} disabled={disabled} className="mt-0.5" />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] text-black leading-tight font-medium">
          {label}
        </span>
        {description && (
          <span className="text-[12.5px] text-black/60 leading-snug font-light">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}

export { RadioGroup, RadioGroupItem, RadioCard };
