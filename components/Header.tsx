"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HLLogo } from "@/components/ui/HLLogo";
import { PremiumButton } from "@/components/ui/PremiumButton";
import type { NavLink } from "@/lib/types";

const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Propriétaires", href: "/proprietaires" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

/** Retourne true si le lien correspond à la page courante. */
function isLinkActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
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
        {/* Logo officiel H&L */}
        <Link
          href="/"
          className="group inline-flex items-center"
          aria-label="H&L Conciergerie, retour à l'accueil"
        >
          <HLLogo
            variant="gold"
            size={96}
            priority
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black",
                  active
                    ? "text-gold"
                    : "text-bone/80 hover:text-gold",
                )}
              >
                <span className="relative">
                  {link.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 right-0 -bottom-1.5 h-px bg-gold"
                    />
                  )}
                </span>
              </Link>
            );
          })}
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
            className="lg:hidden p-2 text-bone hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
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
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-display text-3xl tracking-wide py-4 border-b border-gold/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  active ? "text-gold" : "text-bone hover:text-gold",
                )}
              >
                {link.label}
              </Link>
            );
          })}
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
