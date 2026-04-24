import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { HLLogo } from "@/components/ui/HLLogo";
import { GoldDivider } from "@/components/ui/GoldDivider";

const navColumns = [
  {
    title: "Services",
    links: [
      { label: "Pack Essentiel", href: "/services#essentiel" },
      { label: "Pack Premium", href: "/services#premium" },
      { label: "Pack Signature", href: "/services#signature" },
      { label: "Diagnostic gratuit", href: "/diagnostic" },
    ],
  },
  {
    title: "Maison H&L",
    links: [
      { label: "Notre histoire", href: "/a-propos" },
      { label: "Propriétaires", href: "/proprietaires" },
      { label: "Voyageurs", href: "/voyageurs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "CGV", href: "/cgv" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-black border-t border-gold/15 grain-overlay">
      {/* Glow ambient discret */}
      <div className="glow-orb h-[500px] w-[500px] -bottom-64 left-1/2 -translate-x-1/2 opacity-30" />

      <div className="container-hl relative z-10 pt-24 pb-10">
        {/* Bloc top : logo officiel + baseline */}
        <div className="flex flex-col items-center text-center mb-16">
          <HLLogo variant="gold" size={220} />
          <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-pearl">
            Maison de gestion locative · Nice &amp; Côte d&apos;Azur
          </p>
          <GoldDivider className="mt-8" width="md" />
        </div>

        {/* Grid colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Colonne contact */}
          <div className="space-y-5">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
              Contact
            </h3>
            <div className="space-y-3 text-[14px] text-pearl">
              <a
                href="mailto:contact@hl-conciergerie.com"
                className="flex items-start gap-3 hover:text-gold transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Mail size={15} strokeWidth={1.5} className="mt-0.5 text-gold/70 group-hover:text-gold" />
                <span>contact@hl-conciergerie.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.5} className="mt-0.5 text-gold/70" />
                <span>
                  Nice, Alpes-Maritimes
                  <br />
                  France
                </span>
              </div>
            </div>
            <p className="pt-2 text-[11px] uppercase tracking-[0.22em] text-pearl/60">
              Réseaux sociaux · bientôt
            </p>
          </div>

          {/* Colonnes nav */}
          {navColumns.map((col) => (
            <div key={col.title} className="space-y-5">
              <h3 className="text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
                {col.title}
              </h3>
              <ul className="space-y-3 text-[14px] text-pearl">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar : mentions HL GROUP SAS */}
        <div className="mt-20 pt-8 border-t border-gold/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p className="text-[11px] tracking-wider text-pearl/80">
            © {year} <span className="text-bone">HL GROUP SAS</span>. Tous droits réservés.
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            Société par actions simplifiée immatriculée à Nice.
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-pearl/60">
            Élégance discrète · Excellence opérationnelle
          </p>
        </div>
      </div>
    </footer>
  );
}
