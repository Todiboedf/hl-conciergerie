"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdate: string;
  intro?: string;
  children: ReactNode;
}

/**
 * Layout partagé par les pages légales (mentions, confidentialité, CGV).
 * Fond cream, container étroit (max-w 760px), typographie calme.
 * Toutes les sections partagent la même anatomie : hero compact,
 * corps en sections numérotées, cross-links en bas.
 */
export function LegalLayout({
  eyebrow,
  title,
  lastUpdate,
  intro,
  children,
}: LegalLayoutProps) {
  return (
    <section className="relative isolate overflow-hidden bg-cream text-black">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container-hl relative z-10"
        style={{
          paddingTop: "calc(var(--header-height) + 5rem)",
          paddingBottom: "8rem",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "760px" }}>
          {/* En-tête */}
          <motion.span
            variants={fadeUp}
            className="block text-[11px] font-medium uppercase tracking-[0.22em] text-gold-dark"
          >
            {eyebrow}
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="sm" align="left" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              textWrap: "balance",
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[12px] uppercase tracking-[0.18em] text-black/50"
          >
            Dernière mise à jour · {lastUpdate}
          </motion.p>

          {intro && (
            <motion.p
              variants={fadeUp}
              className="mt-10 text-[15px] md:text-[16px] leading-[1.8] text-black/75 font-light"
              style={{ textWrap: "pretty" }}
            >
              {intro}
            </motion.p>
          )}

          <motion.div variants={fadeUp} className="mt-12">
            <GoldDivider width="md" align="left" />
          </motion.div>

          {/* Corps du document */}
          <motion.div
            variants={fadeUp}
            className="legal-body mt-14 text-[15px] leading-[1.85] text-black/80 font-light"
          >
            {children}
          </motion.div>

          {/* Cross-links */}
          <motion.div
            variants={fadeUp}
            className="mt-20 pt-10 border-t border-gold-dark/25"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-dark">
              Autres documents
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-black hover:text-gold-dark transition-colors underline underline-offset-4 decoration-gold-dark/30 hover:decoration-gold-dark"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-black hover:text-gold-dark transition-colors underline underline-offset-4 decoration-gold-dark/30 hover:decoration-gold-dark"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="text-black hover:text-gold-dark transition-colors underline underline-offset-4 decoration-gold-dark/30 hover:decoration-gold-dark"
                >
                  Conditions générales de service
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

interface LegalSectionProps {
  number: string;
  title: string;
  children: ReactNode;
}

/**
 * Section typée pour documents légaux : numéro romain/arabe discret,
 * titre serif, corps. On l'utilise à l'intérieur de LegalLayout.
 */
export function LegalSection({ number, title, children }: LegalSectionProps) {
  return (
    <section className="mt-12 first:mt-0 scroll-mt-28">
      <div className="flex items-baseline gap-4">
        <span className="font-display font-light text-gold-dark leading-none text-[22px]">
          {number}
        </span>
        <h2
          className="font-display font-normal text-black leading-tight"
          style={{
            fontSize: "clamp(22px, 2.4vw, 28px)",
            textWrap: "balance",
          }}
        >
          {title}
        </h2>
      </div>
      <div className="mt-5 space-y-4 text-[14.5px] md:text-[15px] leading-[1.85] text-black/75 font-light">
        {children}
      </div>
    </section>
  );
}
