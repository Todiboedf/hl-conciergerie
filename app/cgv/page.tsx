import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions générales de service",
  description:
    "Conditions générales de service de H&L Conciergerie : objet, services, engagements, tarification, durée, résiliation et responsabilité.",
  alternates: { canonical: "/cgv" },
  robots: { index: true, follow: false },
};

export default function CGVPage() {
  return (
    <LegalLayout
      eyebrow="Conditions contractuelles"
      title="Conditions générales de service"
      lastUpdate="avril 2026"
      intro="Le présent document reprend les conditions générales de service de H&L Conciergerie. Il est complété, pour chaque propriétaire ayant confié un bien à la maison, par un mandat de gestion individuel signé avec HL GROUP SAS, qui détaille les engagements particuliers liés au bien concerné. En cas de divergence entre les présentes conditions et le mandat signé, les stipulations du mandat prévalent."
    >
      <LegalSection number="1." title="Objet">
        <p>
          Les présentes conditions générales de service (ci-après les
          «&nbsp;Conditions&nbsp;») ont pour objet de définir les modalités
          selon lesquelles <strong>HL GROUP SAS</strong>, agissant sous
          l&apos;enseigne commerciale <strong>H&amp;L Conciergerie</strong>{" "}
          (ci-après «&nbsp;H&amp;L&nbsp;» ou «&nbsp;la Maison&nbsp;»),
          fournit à toute personne physique ou morale (ci-après le
          «&nbsp;Propriétaire&nbsp;») des prestations de gestion locative
          courte durée sur des biens immobiliers meublés situés à Nice et
          sur la Côte d&apos;Azur.
        </p>
        <p>
          Toute signature d&apos;un mandat de gestion avec H&amp;L implique
          l&apos;acceptation pleine et entière des présentes Conditions par
          le Propriétaire.
        </p>
      </LegalSection>

      <LegalSection number="2." title="Définitions">
        <p>
          Dans les présentes Conditions, les termes ci-après ont la
          signification suivante&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            <strong>Bien</strong>&nbsp;: logement meublé (appartement,
            maison, villa) confié par le Propriétaire à H&amp;L aux fins de
            location courte durée.
          </li>
          <li>
            <strong>Mandat</strong>&nbsp;: contrat individuel signé entre
            le Propriétaire et H&amp;L, encadrant la gestion d&apos;un Bien
            donné.
          </li>
          <li>
            <strong>Voyageur</strong>&nbsp;: toute personne ayant réservé
            un séjour dans le Bien, quelle que soit la plateforme
            d&apos;intermédiation.
          </li>
          <li>
            <strong>Pack</strong>&nbsp;: l&apos;offre de services retenue
            par le Propriétaire parmi Essentiel, Premium et Signature, dont
            le détail figure sur la page /services du site.
          </li>
          <li>
            <strong>Commission</strong>&nbsp;: rémunération de H&amp;L
            exprimée en pourcentage des revenus locatifs nets générés par
            le Bien, conformément au pack retenu.
          </li>
          <li>
            <strong>Plateforme</strong>&nbsp;: site tiers de réservation
            sur lequel le Bien est diffusé (Airbnb, Booking, Vrbo, etc.).
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="3." title="Services proposés">
        <p>
          H&amp;L propose trois niveaux de service, dont le périmètre
          précis est décrit sur la page /services du site et rappelé dans
          le Mandat&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            <strong>Pack Essentiel</strong> — gestion locative complète et
            rigoureuse, commission <strong>25&nbsp;%</strong> des revenus
            nets.
          </li>
          <li>
            <strong>Pack Premium</strong> — gestion Essentiel enrichie
            d&apos;une valorisation active et d&apos;un pricing dynamique,
            commission <strong>28&nbsp;%</strong> des revenus nets.
          </li>
          <li>
            <strong>Pack Signature</strong> — gestion hôtelière cinq
            étoiles sans compromis, commission <strong>30&nbsp;%</strong>{" "}
            des revenus nets.
          </li>
        </ul>
        <p className="mt-4">
          Le Propriétaire reconnaît avoir pris connaissance du contenu
          détaillé de chaque Pack avant la signature du Mandat. Un
          changement de Pack en cours de Mandat est possible, sur demande
          écrite du Propriétaire, avec effet au premier jour du mois
          suivant la demande.
        </p>
      </LegalSection>

      <LegalSection number="4." title="Engagements de H&L">
        <p>
          Dans le cadre du Mandat, H&amp;L s&apos;engage à&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            Exécuter l&apos;ensemble des prestations prévues au Pack retenu
            avec la diligence et le soin attendus d&apos;une maison de
            gestion professionnelle.
          </li>
          <li>
            Assurer la commercialisation du Bien dans le respect des
            règles propres à chaque Plateforme et dans l&apos;intérêt
            financier du Propriétaire.
          </li>
          <li>
            Assurer la maîtrise et le respect du cadre réglementaire
            applicable (loi Le Meur, règlement Nice 2026, obligations
            préfectorales, taxe de séjour).
          </li>
          <li>
            Remettre au Propriétaire un reporting périodique conforme au
            Pack retenu, comprenant l&apos;état des réservations, les
            revenus générés, la commission H&amp;L et les éventuels frais
            opérationnels documentés.
          </li>
          <li>
            Traiter les Voyageurs avec courtoisie, diligence et
            professionnalisme, dans le respect du standard hôtelier de la
            Maison.
          </li>
          <li>
            Informer le Propriétaire sans délai de tout incident matériel
            ou relationnel affectant le Bien ou sa gestion.
          </li>
        </ul>
        <p className="mt-4">
          Les engagements de H&amp;L constituent une obligation de moyens
          renforcée, et non une obligation de résultat, concernant le
          niveau de revenus générés par le Bien.
        </p>
      </LegalSection>

      <LegalSection number="5." title="Engagements du Propriétaire">
        <p>Le Propriétaire s&apos;engage, pour la durée du Mandat, à&nbsp;:</p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            Disposer de la pleine capacité juridique pour confier le Bien à
            la gestion de H&amp;L et, le cas échéant, justifier de
            l&apos;accord des copropriétaires ou du règlement de
            copropriété autorisant la location courte durée.
          </li>
          <li>
            Fournir à H&amp;L l&apos;ensemble des documents administratifs
            nécessaires à la gestion (titre de propriété, attestation
            d&apos;assurance, diagnostics obligatoires, règlement de
            copropriété, etc.).
          </li>
          <li>
            Garantir que le Bien est conforme aux normes de sécurité,
            d&apos;hygiène et de décence applicables à la location meublée
            courte durée.
          </li>
          <li>
            Laisser à H&amp;L la libre disposition du Bien pour les
            besoins de la gestion locative, dans le respect des termes
            convenus dans le Mandat.
          </li>
          <li>
            Respecter les éventuelles décisions éditoriales, de tarification
            et de positionnement commercial prises par H&amp;L dans
            l&apos;intérêt financier du Bien.
          </li>
          <li>
            Régler, dans les délais convenus, les éventuelles factures de
            services à la carte, frais exceptionnels ou travaux préalablement
            validés par écrit.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="6." title="Tarifs et modalités de paiement">
        <p>
          La rémunération de H&amp;L est constituée d&apos;une commission
          calculée en pourcentage des revenus nets générés par le Bien,
          selon le Pack retenu&nbsp;: 25&nbsp;% pour Essentiel, 28&nbsp;%
          pour Premium, 30&nbsp;% pour Signature. Cette commission est
          prélevée sur les revenus encaissés par H&amp;L avant reversement
          au Propriétaire.
        </p>
        <p>
          Le reversement des revenus nets au Propriétaire intervient entre
          le 5 et le 10 du mois suivant la période concernée, après
          encaissement définitif des Plateformes et déduction de la
          commission et des éventuels frais opérationnels documentés.
          Chaque virement est accompagné d&apos;un relevé détaillé transmis
          au Propriétaire.
        </p>
        <p>
          Les frais de ménage entre séjours et la rotation du linge
          professionnel sont refacturés aux Voyageurs via les frais de
          ménage prélevés sur chaque réservation, et ne constituent pas un
          coût pour le Propriétaire. Les consommables (produits
          d&apos;accueil, fleurs, kits d&apos;arrivée) sont refacturés à
          prix coûtant et détaillés dans le reporting mensuel.
        </p>
        <p>
          Les services à la carte (home-staging, travaux, shooting
          exceptionnel, etc.) font l&apos;objet d&apos;un devis préalable,
          accepté par écrit par le Propriétaire avant toute exécution.
        </p>
      </LegalSection>

      <LegalSection number="7." title="Durée du Mandat">
        <p>
          Sauf stipulation contraire du Mandat, celui-ci est conclu pour
          une durée initiale d&apos;un an à compter de la date de prise
          d&apos;effet, renouvelable tacitement par périodes successives
          d&apos;un an.
        </p>
      </LegalSection>

      <LegalSection number="8." title="Résiliation">
        <p>
          Chaque partie peut mettre fin au Mandat à tout moment, par
          courrier recommandé avec accusé de réception ou par email
          confirmé, moyennant un préavis de <strong>trois mois</strong>.
          Ce préavis permet à H&amp;L d&apos;honorer les réservations
          déjà engagées et d&apos;organiser la transition dans
          l&apos;intérêt du Bien et des Voyageurs concernés.
        </p>
        <p>
          En cas de manquement grave de l&apos;une des parties à ses
          obligations, la partie lésée pourra résilier le Mandat de plein
          droit, sans préavis, après mise en demeure restée sans effet
          pendant quinze jours, sous réserve de tous droits et dommages et
          intérêts.
        </p>
        <p>
          À la cessation du Mandat, H&amp;L remet au Propriétaire
          l&apos;ensemble des accès, documents et justificatifs afférents
          au Bien, et procède au reversement des revenus restant dus dans
          les conditions prévues à l&apos;article 6.
        </p>
      </LegalSection>

      <LegalSection number="9." title="Responsabilité">
        <p>
          H&amp;L s&apos;engage à exécuter les prestations avec le soin
          attendu d&apos;un professionnel de la gestion locative premium.
          Sa responsabilité est engagée en cas de faute avérée dans
          l&apos;exécution de ses obligations. H&amp;L ne saurait toutefois
          être tenue responsable&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            Des dommages causés par les Voyageurs au Bien, qui relèvent de
            l&apos;assurance locative courte durée souscrite par le
            Propriétaire ou par le Voyageur via la Plateforme.
          </li>
          <li>
            Des variations de revenus imputables aux dynamiques de marché,
            à la saisonnalité, aux décisions préfectorales, aux évolutions
            réglementaires ou à toute cause extérieure à sa volonté.
          </li>
          <li>
            Des dysfonctionnements des Plateformes tierces, de leurs
            systèmes de paiement ou de leurs algorithmes de classement.
          </li>
          <li>
            Des conséquences d&apos;informations inexactes ou incomplètes
            fournies par le Propriétaire sur le Bien ou sur sa situation
            juridique, fiscale ou administrative.
          </li>
        </ul>
        <p className="mt-4">
          En tout état de cause, la responsabilité pécuniaire de H&amp;L
          ne saurait excéder le montant des commissions perçues au titre
          du Mandat au cours des douze mois précédant la survenance du
          fait générateur de responsabilité.
        </p>
      </LegalSection>

      <LegalSection number="10." title="Force majeure">
        <p>
          Aucune des parties ne pourra être tenue responsable de
          l&apos;inexécution ou de la mauvaise exécution de ses obligations
          contractuelles si celle-ci résulte d&apos;un cas de force majeure
          au sens de l&apos;article 1218 du Code civil (intempéries
          exceptionnelles, catastrophes naturelles, décisions des pouvoirs
          publics, grèves générales, pandémie, guerre, etc.). La partie
          concernée s&apos;engage à en informer l&apos;autre dans les
          meilleurs délais.
        </p>
      </LegalSection>

      <LegalSection number="11." title="Assurances">
        <p>
          H&amp;L justifie d&apos;une assurance responsabilité civile
          professionnelle couvrant les conséquences pécuniaires de sa
          responsabilité professionnelle dans le cadre des prestations
          décrites aux présentes. Les attestations d&apos;assurance sont
          communiquées sur simple demande du Propriétaire.
        </p>
        <p>
          Le Propriétaire s&apos;engage pour sa part à souscrire et
          maintenir une assurance multirisque habitation couvrant la
          location meublée courte durée, et à en justifier à H&amp;L
          avant la prise d&apos;effet du Mandat. Les garanties des
          assurances proposées par les Plateformes viennent en complément
          de cette couverture et ne s&apos;y substituent pas.
        </p>
      </LegalSection>

      <LegalSection number="12." title="Propriété intellectuelle">
        <p>
          Les créations intellectuelles réalisées par H&amp;L dans le
          cadre de la gestion du Bien (rédaction éditoriale, shooting
          photographique, mises en scène, supports de promotion, etc.)
          restent la propriété exclusive de H&amp;L. H&amp;L consent au
          Propriétaire, pour la durée du Mandat, une licence d&apos;usage
          non exclusive, non transférable et strictement limitée à la
          commercialisation locative du Bien.
        </p>
        <p>
          À la cessation du Mandat, le Propriétaire s&apos;engage à cesser
          tout usage des créations H&amp;L, sauf accord écrit contraire.
        </p>
      </LegalSection>

      <LegalSection number="13." title="Confidentialité">
        <p>
          Les parties s&apos;engagent réciproquement à tenir strictement
          confidentielles l&apos;ensemble des informations techniques,
          commerciales, financières, stratégiques ou personnelles échangées
          dans le cadre du Mandat, et à ne pas les divulguer à des tiers
          sans l&apos;accord écrit préalable de l&apos;autre partie. Cet
          engagement survit à la cessation du Mandat pour une durée de
          cinq ans.
        </p>
      </LegalSection>

      <LegalSection number="14." title="Protection des données personnelles">
        <p>
          Dans le cadre de l&apos;exécution du Mandat, H&amp;L agit en
          qualité de responsable du traitement des données personnelles
          collectées auprès du Propriétaire, des Voyageurs et des
          éventuels tiers concernés, conformément au Règlement général
          sur la protection des données (RGPD). Les modalités détaillées
          de ce traitement figurent dans la politique de confidentialité
          accessible sur le site hlconciergerie.fr.
        </p>
      </LegalSection>

      <LegalSection number="15." title="Modification des présentes Conditions">
        <p>
          H&amp;L se réserve le droit de modifier les présentes Conditions
          à tout moment pour tenir compte des évolutions légales,
          réglementaires ou opérationnelles de son activité. Toute
          modification substantielle sera notifiée au Propriétaire par
          email au moins trente jours avant son entrée en vigueur. En cas
          de désaccord, le Propriétaire dispose de la faculté de résilier
          le Mandat dans les conditions prévues à l&apos;article 8, sans
          application d&apos;un préavis.
        </p>
      </LegalSection>

      <LegalSection number="16." title="Droit applicable et juridiction compétente">
        <p>
          Les présentes Conditions et le Mandat qui en découle sont régis
          par le droit français. Tout litige relatif à leur
          interprétation, leur validité ou leur exécution, qui
          n&apos;aurait pu être résolu à l&apos;amiable, sera soumis à la
          compétence exclusive des tribunaux du ressort de la Cour
          d&apos;appel d&apos;Aix-en-Provence, nonobstant pluralité de
          défendeurs, appel en garantie ou demande incidente, et
          notamment du Tribunal de commerce de Nice pour les litiges
          entre professionnels.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
