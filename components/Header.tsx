"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HLMonogram } from "@/components/ui/HLMonogram";
import { PremiumButton } from "@/components/ui/PremiumButton";
import type { NavLink } from "@/lib/types";

const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Propriétaires", href: "/proprietaires" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md bg-black/80 border-b border-gold/15"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-hl flex items-center justify-between py-4 lg:py-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="H&L Conciergerie — accueil"
        >
          <HLMonogram size={36} className="transition-transform duration-500 group-hover:scale-105" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-[18px] tracking-[0.12em] text-bone">
              H&L
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-pearl mt-0.5">
              Conciergerie
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.18em] text-bone/80 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop + burger mobile */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <PremiumButton href="/diagnostic" variant="primary" size="sm">
              Diagnostic gratuit
            </PremiumButton>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-bone hover:text-gold transition-colors"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[64px] bottom-0 bg-black/98 backdrop-blur-xl border-t border-gold/15 transition-all duration-500",
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2",
        )}
      >
        <nav className="container-hl flex flex-col gap-1 py-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl tracking-wide text-bone hover:text-gold transition-colors py-4 border-b border-gold/10"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-8">
            <PremiumButton
              href="/diagnostic"
              variant="primary"
              size="md"
              className="w-full"
            >
              Diagnostic gratuit
            </PremiumButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
