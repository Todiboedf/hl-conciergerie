import type { PackId } from "@/lib/types";

/**
 * Types stricts du moteur de diagnostic de rentabilité H&L.
 * Consommés par :
 * - components/diagnostic/DiagnosticForm.tsx (état local + validation Zod)
 * - components/diagnostic/DiagnosticResult.tsx (affichage du résultat)
 * - app/api/diagnostic/route.ts (validation body + retour)
 * - lib/prompts/diagnostic.ts (injection dans le prompt Claude)
 */

export type PropertyType =
  | "studio"
  | "t1"
  | "t2"
  | "t3"
  | "t4-plus"
  | "maison"
  | "villa";

export type BedroomCount = "0" | "1" | "2" | "3" | "4" | "5-plus";

export type BathroomCount = "1" | "2" | "3-plus";

export type GuestCapacity = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9-plus";

export type NiceArea =
  | "vieux-nice"
  | "carre-or"
  | "promenade"
  | "port"
  | "liberation"
  | "mont-boron"
  | "cimiez"
  | "fabron"
  | "saint-jean-angely"
  | "californie"
  | "riquier"
  | "magnan"
  | "saint-roch"
  | "autre-nice"
  | "villefranche"
  | "beaulieu"
  | "cap-ail";

export type ViewType =
  | "mer-panoramique"
  | "mer-partielle"
  | "jardin-cour"
  | "ville"
  | "aucune";

export type FloorLevel =
  | "rdc"
  | "1er"
  | "2e"
  | "3e"
  | "4e"
  | "5e-plus"
  | "dernier"
  | "villa-individuelle";

export type Elevator = "oui" | "non" | "non-applicable";

export type Standing =
  | "standard"
  | "bon"
  | "haut"
  | "tres-haut"
  | "exceptionnel";

export type CurrentRental = "regulier" | "ponctuel" | "jamais";

export interface DiagnosticInput {
  propertyType: PropertyType;
  surfaceSqm: number;
  bedrooms: BedroomCount;
  bathrooms: BathroomCount;
  guestCapacity: GuestCapacity;
  area: NiceArea;
  view: ViewType;
  floor: FloorLevel;
  elevator: Elevator;
  airConditioning: boolean;
  balcony: boolean;
  parking: boolean;
  pool: boolean;
  garden: boolean;
  standing: Standing;
  currentRental: CurrentRental;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  rgpd: true;
}

export interface EstimationRange {
  min: number;
  central: number;
  max: number;
}

export interface DiagnosticResult {
  revenuMensuelEstime: EstimationRange;
  revenuAnnuelEstime: EstimationRange;
  tauxOccupationEstime: number;
  adrEstime: number;
  commissionHL: 25 | 28 | 30;
  revenuNetProprietaire: EstimationRange;
  packRecommande: PackId;
  raisonPackRecommande: string;
  pointsForts: string[];
  optimisationsPossibles: string[];
  justification: string;
}

/**
 * État UI du processus de diagnostic côté page /diagnostic.
 * idle → loading → success | error, avec retour possible à idle
 * pour permettre de relancer un diagnostic.
 */
export type DiagnosticState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: DiagnosticResult; input: DiagnosticInput }
  | { status: "error"; message: string };

/**
 * Libellés français des enums pour l'UI et l'injection dans le prompt
 * Claude. Source unique de vérité pour rester cohérent entre le form,
 * le résultat et le prompt IA.
 */
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  studio: "Studio",
  t1: "T1",
  t2: "T2",
  t3: "T3",
  "t4-plus": "T4 et plus",
  maison: "Maison",
  villa: "Villa",
};

export const BEDROOM_LABELS: Record<BedroomCount, string> = {
  "0": "0 (studio)",
  "1": "1 chambre",
  "2": "2 chambres",
  "3": "3 chambres",
  "4": "4 chambres",
  "5-plus": "5 chambres et plus",
};

export const BATHROOM_LABELS: Record<BathroomCount, string> = {
  "1": "1 salle de bain",
  "2": "2 salles de bain",
  "3-plus": "3 salles de bain et plus",
};

export const GUEST_CAPACITY_LABELS: Record<GuestCapacity, string> = {
  "2": "2 voyageurs",
  "3": "3 voyageurs",
  "4": "4 voyageurs",
  "5": "5 voyageurs",
  "6": "6 voyageurs",
  "7": "7 voyageurs",
  "8": "8 voyageurs",
  "9-plus": "9 voyageurs et plus",
};

export const NICE_AREA_LABELS: Record<NiceArea, string> = {
  "vieux-nice": "Vieux-Nice",
  "carre-or": "Carré d'Or / Zone Masséna",
  promenade: "Promenade des Anglais / Negresco",
  port: "Port / Place Garibaldi",
  liberation: "Libération / Gare Thiers",
  "mont-boron": "Mont-Boron / Cap de Nice",
  cimiez: "Cimiez",
  fabron: "Fabron / La Lanterne",
  "saint-jean-angely": "Saint-Jean-d'Angély / Université",
  californie: "Californie / Lanterne",
  riquier: "Riquier",
  magnan: "Magnan",
  "saint-roch": "Saint-Roch",
  "autre-nice": "Autre quartier de Nice",
  villefranche: "Villefranche-sur-Mer",
  beaulieu: "Beaulieu-sur-Mer",
  "cap-ail": "Cap-d'Ail",
};

export const VIEW_LABELS: Record<ViewType, string> = {
  "mer-panoramique": "Vue mer panoramique",
  "mer-partielle": "Vue mer partielle",
  "jardin-cour": "Vue jardin ou cour",
  ville: "Vue ville",
  aucune: "Pas de vue particulière",
};

export const FLOOR_LABELS: Record<FloorLevel, string> = {
  rdc: "Rez-de-chaussée",
  "1er": "1er étage",
  "2e": "2e étage",
  "3e": "3e étage",
  "4e": "4e étage",
  "5e-plus": "5e étage et plus",
  dernier: "Dernier étage",
  "villa-individuelle": "Villa individuelle",
};

export const ELEVATOR_LABELS: Record<Elevator, string> = {
  oui: "Oui",
  non: "Non",
  "non-applicable": "Non applicable",
};

export const STANDING_LABELS: Record<Standing, string> = {
  standard: "Standard",
  bon: "Bon",
  haut: "Haut de gamme",
  "tres-haut": "Très haut de gamme",
  exceptionnel: "Exceptionnel",
};

export const CURRENT_RENTAL_LABELS: Record<CurrentRental, string> = {
  regulier: "Oui, régulièrement",
  ponctuel: "Oui, ponctuellement",
  jamais: "Non, jamais",
};

/**
 * Zones premium de la Côte d'Azur (prime ADR +20 à +40%).
 * Utilisé par le fallback dev et referencé dans le prompt Claude.
 */
export const PREMIUM_AREAS: ReadonlySet<NiceArea> = new Set([
  "carre-or",
  "promenade",
  "mont-boron",
  "cimiez",
  "villefranche",
  "beaulieu",
  "cap-ail",
]);
