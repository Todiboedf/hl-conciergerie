import Image from "next/image";
import { cn } from "@/lib/utils";

type Variant = "gold" | "bone" | "raw";

interface HLLogoProps {
  /** Variante de teinte. "raw" = JPEG original sur fond blanc (pour fonds clairs). */
  variant?: Variant;
  /** Largeur du logo en pixels. Hauteur auto-calculée (préserve le ratio natif). */
  size?: number;
  /** Charge prioritaire (above-the-fold, ex. Hero). */
  priority?: boolean;
  className?: string;
}

// Dimensions natives du logo après crop des whitespaces (670x298).
const NATIVE_WIDTH = 670;
const NATIVE_HEIGHT = 298;
const RATIO = NATIVE_HEIGHT / NATIVE_WIDTH; // ~0.4448

// Fichiers prérendus :
// - hl-logo-gold.png  : teinte or #C9A84C, fond transparent
// - hl-logo-bone.png  : teinte bone #F8F6F0, fond transparent
// - hl-logo.jpeg      : original gris sur fond blanc (pour fonds clairs)
const SRC_MAP: Record<Variant, string> = {
  gold: "/brand/hl-logo-gold.png",
  bone: "/brand/hl-logo-bone.png",
  raw: "/brand/hl-logo.jpeg",
};

/**
 * Logo officiel H&L Conciergerie. Charge le fichier tinté correspondant à
 * la variante demandée (gold/bone prérendus en PNG transparent, raw = JPEG
 * original pour fonds clairs). Conserve le ratio natif 670:298.
 */
export function HLLogo({
  variant = "gold",
  size = 180,
  priority = false,
  className,
}: HLLogoProps) {
  const height = Math.round(size * RATIO);

  return (
    <Image
      src={SRC_MAP[variant]}
      alt="H&L Conciergerie"
      width={size}
      height={height}
      priority={priority}
      sizes={`${size}px`}
      quality={95}
      className={cn("block h-auto select-none", className)}
      style={{ width: size, height }}
      draggable={false}
    />
  );
}
