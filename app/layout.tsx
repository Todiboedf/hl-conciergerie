import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ClarityAnalytics } from "@/components/ClarityAnalytics";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Fallback Vercel preview pour le premier déploiement (sans domaine custom).
// Une fois le domaine hl-conciergerie.com branché, définir NEXT_PUBLIC_SITE_URL
// sur Vercel pour basculer les meta Open Graph sur le domaine final.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hl-conciergerie.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "H&L Conciergerie · Gestion locative premium à Nice & Côte d'Azur",
    template: "%s · H&L Conciergerie",
  },
  description:
    "Conciergerie haut de gamme spécialisée dans la location courte durée à Nice et sur la Côte d'Azur. Maximisez vos revenus locatifs sans vous en occuper.",
  alternates: { canonical: "/" },
  keywords: [
    "conciergerie Nice",
    "gestion locative Nice",
    "location courte durée Côte d'Azur",
    "Airbnb Nice",
    "conciergerie premium",
  ],
  authors: [{ name: "HL GROUP SAS" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "H&L Conciergerie",
    title: "H&L Conciergerie · Gestion locative premium à Nice",
    description:
      "Maximisez vos revenus locatifs sans vous en occuper. Conciergerie haut de gamme à Nice & Côte d'Azur.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "H&L Conciergerie",
  legalName: "HL GROUP SAS",
  url: siteUrl,
  logo: `${siteUrl}/brand/hl-logo-gold.png`,
  image: `${siteUrl}/opengraph-image`,
  description:
    "Conciergerie haut de gamme spécialisée dans la gestion locative courte durée à Nice et sur la Côte d'Azur.",
  email: "contact@hl-conciergerie.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nice",
    addressRegion: "Provence-Alpes-Côte d'Azur",
    postalCode: "06000",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Nice" },
    { "@type": "City", name: "Saint-Laurent-du-Var" },
    { "@type": "Place", name: "Côte d'Azur" },
  ],
  serviceType: "Gestion locative courte durée premium",
  priceRange: "€€€",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-bone">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors closeButton />
        <ClarityAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </body>
    </html>
  );
}
