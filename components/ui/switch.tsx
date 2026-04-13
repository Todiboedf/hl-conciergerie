"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";

/**
 * Switch on-brand H&L (palette cream/or). Utilisé dans le formulaire
 * de diagnostic pour les équipements (climatisation, balcon, parking...).
 * Track fin, thumb carré (cohérent avec la radius 0 du design system).
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border border-gold-dark/40 bg-white/50 transition-colors outline-none",
        "focus-visible:ring-3 focus-visible:ring-gold-dark/30 focus-visible:border-gold-dark",
        "data-checked:bg-gold-dark data-checked:border-gold-dark",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-4 w-4 bg-gold-dark transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "translate-x-1 data-checked:translate-x-6 data-checked:bg-white",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
