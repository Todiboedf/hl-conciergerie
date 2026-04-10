import type { Variants, Transition } from "framer-motion";

/**
 * Courbe d'easing signature H&L : lancement rapide, décélération douce.
 * Issue de la famille des cubic-bezier "premium" (proche d'easeOutExpo).
 */
export const EASE_OUT_PREMIUM: Transition["ease"] = [0.22, 1, 0.36, 1];

/**
 * Variants "fade-up" réutilisables sur toutes les sections.
 * À combiner avec whileInView + viewport once pour les sections au scroll.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_PREMIUM },
  },
};

/**
 * Variants pour un conteneur qui orchestre les enfants avec stagger.
 * Chaque enfant doit utiliser fadeUp (ou équivalent) comme variant.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

/**
 * Props partagées pour les animations déclenchées au scroll.
 * Usage : <motion.div {...viewInProps} variants={fadeUp} />
 */
export const viewInProps = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "-80px" } as const,
};
