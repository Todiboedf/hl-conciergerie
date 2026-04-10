import type { FAQItem } from "./types";

/**
 * 6 questions clés affichées sur la landing et la page Services.
 * Rédigé dans un ton hôtelier premium, sans promesse ferme.
 */
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Quels biens acceptez-vous en gestion ?",
    answer:
      "Nous accompagnons principalement des appartements, maisons et villas situés à Nice et dans un rayon proche de la Côte d'Azur : Villefranche, Beaulieu, Cap-Ferrat, Antibes, Cannes. Chaque bien est évalué lors d'une visite préalable, menée personnellement par l'un des fondateurs, pour garantir que notre niveau de service est adapté à son positionnement. Nous sélectionnons nos adresses avec soin afin de préserver la qualité de notre maison.",
  },
  {
    question: "Quelle est votre commission et que comprend-elle exactement ?",
    answer:
      "Nos commissions s'échelonnent de 25 % à 30 % des revenus nets générés, selon le pack retenu (Essentiel, Premium ou Signature). Elles couvrent l'intégralité des opérations courantes : diffusion sur les plateformes, gestion des réservations, accueil des voyageurs, ménage hôtelier, maintenance et conformité réglementaire. Aucun frais caché. Les consommables (linge, produits d'accueil, interventions artisans exceptionnelles) sont refacturés à prix coûtant et documentés dans votre reporting mensuel.",
  },
  {
    question: "Quelle est la durée d'engagement ?",
    answer:
      "Nos contrats sont annuels, renouvelables tacitement chaque saison. Vous pouvez reprendre la main sur votre bien à tout moment, moyennant un préavis de trois mois pour nous permettre d'honorer les réservations déjà engagées. Nous préférons bâtir une relation de confiance durable plutôt qu'imposer un engagement forcé : notre ambition est d'être la dernière conciergerie que vous choisirez.",
  },
  {
    question: "Comment gérez-vous la conformité réglementaire à Nice ?",
    answer:
      "Nice impose depuis 2026 un cadre précis pour la location courte durée : numéro d'enregistrement obligatoire, quotas de nuitées, respect du règlement d'urbanisme. Nous prenons en charge l'intégralité de ces démarches, de la déclaration en mairie à la tenue du registre des séjours, dans le strict respect de la loi Le Meur et du règlement métropolitain. Nous assumons en continu la veille réglementaire, pour que votre tranquillité ne soit jamais compromise par un changement de norme.",
  },
  {
    question: "Comment puis-je suivre les performances de mon bien ?",
    answer:
      "Vous recevez chaque mois un reporting détaillé : chiffre d'affaires, taux d'occupation, séjours passés et à venir, dépenses engagées et revenu net versé. Un rendez-vous trimestriel avec votre gestionnaire permet de faire le point sur la stratégie et d'ajuster la feuille de route. À partir du pack Premium, vous accédez également à une analyse comparative de marché pour situer la performance de votre bien parmi les biens similaires à Nice.",
  },
  {
    question: "Proposez-vous des services événementiels (privatisations, mariages) ?",
    answer:
      "Oui, dans le cadre du pack Signature. Si votre bien s'y prête, nous pouvons orchestrer des privatisations événementielles : mariages intimes, tournages, séminaires corporate, shootings éditoriaux. Chaque projet est étudié au cas par cas pour garantir l'adéquation avec la nature de votre bien et vos préférences personnelles. Une étude de faisabilité et un devis détaillé vous sont systématiquement remis avant tout engagement.",
  },
];
