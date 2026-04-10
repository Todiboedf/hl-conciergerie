import type { Pack } from "./types";

/**
 * Source unique de vérité pour les 3 packs H&L Conciergerie.
 * Importée par :
 * - components/landing/PacksPreview.tsx (aperçu landing)
 * - app/services/page.tsx (détail complet)
 * - lib/prompts/diagnostic.ts (recommandation pack selon standing bien)
 */
export const PACKS: Pack[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    commission: 25,
    tagline: "Gestion complète et efficace",
    description:
      "Pour les propriétaires recherchant une délégation totale et rigoureuse, sans concession sur la qualité du service.",
    features: [
      "Création et optimisation des annonces (Airbnb, Booking, Vrbo)",
      "Gestion 7j/7 des réservations et des échanges voyageurs",
      "Check-in et check-out personnalisés par un majordome H&L",
      "Ménage hôtelier entre chaque séjour, linge professionnel inclus",
      "Kit d'accueil premium et produits d'hygiène haut de gamme",
      "Reporting mensuel détaillé et reversement sécurisé",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    commission: 28,
    tagline: "Notre offre la plus choisie",
    description:
      "Tous les services Essentiel, enrichis d'une valorisation active de votre bien et d'une optimisation continue du yield.",
    features: [
      "Tous les services du pack Essentiel",
      "Shooting photo professionnel et mise à jour saisonnière",
      "Pricing dynamique piloté par notre IA propriétaire",
      "Multi-diffusion sur plus de 12 plateformes internationales",
      "Community management et positionnement éditorial",
      "Maintenance préventive et coordination des artisans",
      "Conciergerie voyageur (restaurants, chauffeurs, activités)",
      "Reporting bi-mensuel avec analyse comparative de marché",
      "Rendez-vous trimestriel avec votre gestionnaire dédié",
    ],
    highlighted: true,
  },
  {
    id: "signature",
    name: "Signature",
    commission: 30,
    tagline: "L'expérience totale",
    description:
      "Pour les biens d'exception et les propriétaires les plus exigeants. Un service hôtelier cinq étoiles sans compromis.",
    features: [
      "Tous les services du pack Premium",
      "Gestionnaire de bien dédié, joignable 7j/7",
      "Majordome sur demande pour vos hôtes en service continu",
      "Linge et cosmétiques de marques partenaires prestigieuses",
      "Service fleurs fraîches et mise en scène hôtelière à chaque arrivée",
      "Préparation sur mesure (notes d'accueil, préférences voyageurs)",
      "Sélection VIP des voyageurs qualifiés",
      "Conciergerie propriétaire pour vos usages personnels du bien",
      "Couverture événementielle (privatisations, mariages, tournages)",
      "Gestion intégrale de la fiscalité locative (déclaration LMNP)",
      "Audit annuel de valorisation et plan d'optimisation sur trois ans",
      "Rapport mensuel en main propre, rendez-vous avec les fondateurs",
    ],
    highlighted: false,
  },
];

/**
 * Retourne le pack recommandé selon le standing déclaré dans le diagnostic.
 * Utilisé par le moteur de diagnostic (Session 4).
 */
export function recommendPack(
  standing: "standard" | "bon" | "haut" | "tres-haut",
): Pack {
  switch (standing) {
    case "tres-haut":
      return PACKS[2]; // Signature
    case "haut":
    case "bon":
      return PACKS[1]; // Premium
    case "standard":
    default:
      return PACKS[0]; // Essentiel
  }
}
