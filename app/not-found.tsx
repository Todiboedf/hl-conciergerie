import Link from "next/link";
import type { Metadata } from "next";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";

export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "Cette page n'existe pas ou a été déplacée. Retrouvez l'ensemble de l'univers H&L Conciergerie depuis l'accueil.",
  robots: { index: false, follow: false },
};

/**
 * Page 404 sur-mesure, alignée sur l'identité H&L (noir / or).
 * Reprend les composants signature (GoldDivider, PremiumButton) pour
 * conserver la cohérence du système de design même sur les erreurs.
 */
export default function NotFound() {
  return (
    <section
      className="relative isolate overflow-hidden bg-black text-bone"
      aria-labelledby="not-found-title"
    >
      {/* Fond signature : halo doré très atténué + grain léger */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.10) 0%, rgba(10,10,10,0.6) 45%, #0A0A0A 75%)",
        }}
      />
      <div className="glow-orb h-[520px] w-[520px] -top-20 left-1/3 opacity-25" />

      <div className="container-hl relative z-10 flex min-h-[80vh] flex-col items-center justify-center py-24 text-center md:py-32">
        <span className="text-[11px] uppercase tracking-[0.32em] text-gold/80">
          Erreur 404
        </span>

        <div className="mt-6">
          <GoldDivider width="sm" />
        </div>

        <h1
          id="not-found-title"
          className="mt-8 font-display font-light leading-[1.02] tracking-[-0.015em]"
          style={{ fontSize: "clamp(48px, 7vw, 96px)", textWrap: "balance" }}
        >
          Cette page <span className="italic text-gold/95">n&apos;existe pas</span>.
        </h1>

        <p
          className="mt-8 max-w-xl text-[15px] md:text-[16px] leading-[1.8] text-pearl font-light"
          style={{ textWrap: "pretty" }}
        >
          Le lien que vous avez suivi est peut-être obsolète, ou la page a été
          déplacée. Aucun problème, l&apos;ensemble de l&apos;univers H&amp;L
          Conciergerie reste à un clic.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <PremiumButton href="/" variant="primary" size="md">
            Retour à l&apos;accueil
          </PremiumButton>
          <PremiumButton href="/diagnostic" variant="ghost" size="md">
            Diagnostic gratuit
          </PremiumButton>
        </div>

        <nav
          aria-label="Pages principales"
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.2em] text-bone/70"
        >
          <Link href="/services" className="transition-colors hover:text-gold">
            Services
          </Link>
          <span aria-hidden="true" className="text-gold/40">
            ·
          </span>
          <Link
            href="/proprietaires"
            className="transition-colors hover:text-gold"
          >
            Propriétaires
          </Link>
          <span aria-hidden="true" className="text-gold/40">
            ·
          </span>
          <Link href="/voyageurs" className="transition-colors hover:text-gold">
            Voyageurs
          </Link>
          <span aria-hidden="true" className="text-gold/40">
            ·
          </span>
          <Link href="/a-propos" className="transition-colors hover:text-gold">
            À propos
          </Link>
          <span aria-hidden="true" className="text-gold/40">
            ·
          </span>
          <Link href="/contact" className="transition-colors hover:text-gold">
            Contact
          </Link>
        </nav>
      </div>
    </section>
  );
}
