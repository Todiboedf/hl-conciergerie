import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "dark" | "cream";
  glow?: boolean;
  highlighted?: boolean;
}

/**
 * Carte glassmorphism premium réutilisable. Variante "dark" pour
 * fonds noirs (utilise white/5 + border/10), variante "cream" pour
 * sections claires. Le flag highlighted ajoute une bordure or fine
 * (utilisé pour le pack Premium par ex.).
 */
export function GlassCard({
  children,
  variant = "dark",
  glow = false,
  highlighted = false,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden backdrop-blur-md transition-all duration-500",
        variant === "dark" &&
          "bg-white/[0.03] border border-white/10 text-bone",
        variant === "cream" &&
          "bg-cream/40 border border-gold-border/30 text-black",
        highlighted && "border-gold/60 shadow-[0_0_60px_-20px_rgba(201,168,76,0.35)]",
        "hover:border-gold/40",
        className,
      )}
      {...props}
    >
      {glow && (
        <span className="glow-orb h-40 w-40 -top-16 -right-16 opacity-60" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
