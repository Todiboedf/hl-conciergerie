import { cn } from "@/lib/utils";

interface HLMonogramProps {
  size?: number;
  className?: string;
  variant?: "gold" | "bone";
  withRing?: boolean;
  ariaLabel?: string;
}

/**
 * Monogramme signature H&L, réutilisable header / footer / hero / cover.
 * Construit en SVG pur pour rester crispy à toutes les tailles et tinter
 * via currentColor selon la variante (or signature ou bone).
 */
export function HLMonogram({
  size = 48,
  className,
  variant = "gold",
  withRing = false,
  ariaLabel = "H&L Conciergerie",
}: HLMonogramProps) {
  const color = variant === "gold" ? "#C9A84C" : "#F8F6F0";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={ariaLabel}
      className={cn("inline-block", className)}
      style={{ color }}
    >
      {withRing && (
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.5"
        />
      )}

      {/* H */}
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
        <line x1="22" y1="32" x2="22" y2="68" />
        <line x1="44" y1="32" x2="44" y2="68" />
        <line x1="22" y1="50" x2="44" y2="50" />
      </g>

      {/* esperluette discret (point central) */}
      <circle cx="50" cy="50" r="1.4" fill="currentColor" />

      {/* L */}
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
        <line x1="56" y1="32" x2="56" y2="68" />
        <line x1="56" y1="68" x2="78" y2="68" />
      </g>

      {/* fines sérifs hôtelier */}
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.85">
        <line x1="18" y1="32" x2="26" y2="32" />
        <line x1="40" y1="32" x2="48" y2="32" />
        <line x1="18" y1="68" x2="26" y2="68" />
        <line x1="40" y1="68" x2="48" y2="68" />
        <line x1="52" y1="32" x2="60" y2="32" />
        <line x1="74" y1="66" x2="82" y2="66" />
        <line x1="74" y1="70" x2="82" y2="70" />
      </g>
    </svg>
  );
}
