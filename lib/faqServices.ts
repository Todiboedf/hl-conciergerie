import type { FAQItem } from "./types";

/**
 * FAQ spécifique à la page /services : questions fréquentes sur
 * la mécanique des packs, la commission, la facturation et la
 * relation avec H&L une fois le mandat signé. Rédaction hôtelière
 * premium, sans promesse ferme, toujours formulée au présent.
 */
export const FAQ_SERVICES_ITEMS: FAQItem[] = [
  {
    question: "Puis-je changer de pack en cours de mandat ?",
    answer:
      "Oui, et nous l'encourageons lorsque cela sert votre bien. Un changement de pack (à la hausse comme à la baisse) peut être demandé à tout moment, avec une mise en application au début du mois suivant. Nous organisons un rendez-vous avec votre gestionnaire pour analyser ensemble les raisons du changement : ajustement saisonnier, évolution du bien, arrivée d'un événement particulier. Aucun frais administratif n'est facturé pour ce type de bascule. Notre souci est toujours de maintenir la bonne adéquation entre votre bien et le niveau de service qui lui correspond vraiment.",
  },
  {
    question:
      "La commission inclut-elle les frais de ménage et de linge ?",
    answer:
      "Le ménage hôtelier entre chaque séjour et la rotation du linge professionnel sont inclus dans l'ensemble des packs, sans surcoût pour vous. Ce sont les voyageurs qui règlent ces prestations, via les frais de ménage prélevés sur chaque réservation, ajustés finement au bien et au standard attendu. La commission H&L ne s'applique que sur les revenus nets reversés au propriétaire, après déduction des frais voyageurs. Les consommables (produits d'hygiène premium, kit d'accueil, fleurs fraîches en Signature) sont systématiquement détaillés dans votre reporting mensuel.",
  },
  {
    question:
      "Comment se passe la facturation et le reversement des revenus ?",
    answer:
      "Nous reversons vos revenus nets entre le 5 et le 10 du mois suivant, après encaissement définitif des plateformes et déduction de notre commission ainsi que des éventuels frais opérationnels documentés. Un relevé détaillé vous est transmis avec chaque virement : séjours de la période, chiffre d'affaires brut, commission H&L, frais techniques, revenu net. Tous les documents comptables vous sont fournis au format exploitable par votre expert-comptable ou votre fiscaliste, dans le cadre de votre déclaration LMNP le cas échéant.",
  },
  {
    question: "Que se passe-t-il si mon bien est vacant un mois ?",
    answer:
      "Notre commission étant proportionnelle aux revenus générés, vous ne payez rien en l'absence de réservation : nous sommes rémunérés au succès. Cela aligne nos intérêts avec les vôtres et garantit que nos équipes pricing, marketing et commercialisation travaillent activement à remplir votre calendrier toute l'année. En cas de période creuse prolongée, un rendez-vous stratégique est systématiquement proposé pour comprendre les freins, ajuster le positionnement, ou explorer des pistes complémentaires (événementiel, moyen terme, corporate, captation saisonnière).",
  },
  {
    question: "Puis-je ajouter des services à la carte ?",
    answer:
      "Absolument. Chaque pack est un socle, mais nous savons que certains propriétaires souhaitent des prestations ponctuelles : home-staging saisonnier, travaux de rafraîchissement, audit technique approfondi, photographies événementielles, préparation d'un accueil VIP exceptionnel. Notre catalogue de services à la carte est disponible sur simple demande, avec un tarif transparent et un devis préalable. Les propriétaires du pack Signature bénéficient par ailleurs d'un quota d'heures de conciergerie incluses pour leurs propres usages du bien.",
  },
];
