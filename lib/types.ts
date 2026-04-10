/**
 * H&L Conciergerie — Types partagés
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
