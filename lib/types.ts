/**
 * H&L Conciergerie · Types partagés
 */

export type PackId = "essentiel" | "premium" | "signature";

export interface Pack {
  id: PackId;
  name: string;
  commission: number; // pourcentage (25, 28, 30)
  tagline: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface MarketStat {
  value: string;
  label: string;
  source?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Données brutes des benchmarks Nice, réutilisées :
 * - Par la section MarketStats (affichage)
 * - Par le prompt du diagnostic Claude en Session 4 (calculs)
 */
export interface NiceBenchmarks {
  occupancyRateMedian: number; // 0 à 1 (ex : 0.78)
  adrMedianEur: number; // tarif journalier moyen
  annualRevenueMedianEur: number; // revenu annuel médian par bien
  activeListings: number; // nombre d'annonces actives
  ranking: string; // positionnement national
  sources: string[]; // sources sourcées pour audit
}
