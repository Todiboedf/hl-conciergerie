import type { MarketStat, NiceBenchmarks } from "./types";

/**
 * Benchmarks marché Nice (location courte durée), source unique.
 * Utilisé par :
 * - components/landing/MarketStats.tsx (affichage)
 * - lib/prompts/diagnostic.ts (contexte Claude pour estimations)
 * Sources à date : Airbtics (novembre 2024 à octobre 2025), Welkeys, AirDNA Global Index.
 */
export const NICE_BENCHMARKS: NiceBenchmarks = {
  occupancyRateMedian: 0.78,
  adrMedianEur: 132,
  annualRevenueMedianEur: 37000,
  activeListings: 9400,
  ranking: "Top 1% France",
  sources: ["Airbtics (2025)", "Welkeys", "AirDNA Global Index"],
};

/**
 * Version formatée pour affichage dans MarketStats.
 * Les valeurs utilisent des séparateurs typographiques français
 * (espace insécable fine avant l'unité).
 */
export const MARKET_STATS: MarketStat[] = [
  {
    value: "78\u00A0%",
    label: "Taux d'occupation médian, Top 1% France",
    source: "Airbtics 2025",
  },
  {
    value: "132\u00A0€",
    label: "Tarif journalier moyen (ADR)",
    source: "Airbtics 2025",
  },
  {
    value: "37\u202F000\u00A0€",
    label: "Revenu annuel médian par bien",
    source: "Welkeys",
  },
  {
    value: "9\u202F400+",
    label: "Annonces actives à Nice",
    source: "AirDNA Global Index",
  },
];

/**
 * Note de bas de section sur les sources (utilisée par MarketStats).
 */
export const BENCHMARKS_SOURCE_NOTE =
  "Sources : Airbtics (novembre 2024 à octobre 2025), Welkeys, AirDNA Global Index.";
