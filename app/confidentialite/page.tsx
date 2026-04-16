import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de H&L Conciergerie : finalités, base légale, durée de conservation, droits des utilisateurs et cookies.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      lastUpdate="avril 2026"
      intro="La présente politique de confidentialité décrit la manière dont HL GROUP SAS (ci-après « H&L Conciergerie ») collecte, utilise et protège les données à caractère personnel des visiteurs et des utilisateurs du site hlconciergerie.fr, conformément au Règlement général sur la protection des données (RGPD, Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée."
    >
      <LegalSection number="1." title="Responsable du traitement">
        <p>
          Le responsable du traitement est <strong>HL GROUP SAS</strong>,
          société par actions simplifiée{" "}
          <strong>{"en cours d'immatriculation"}</strong> à Nice
          (Alpes-Maritimes, France), agissant sous l&apos;enseigne commerciale{" "}
          <strong>H&amp;L Conciergerie</strong>. Toute demande relative au
          traitement de vos données personnelles peut être adressée à :{" "}
          <a
            href="mailto:contact@hlconciergerie.fr"
            className="text-gold-dark underline underline-offset-4"
          >
            contact@hlconciergerie.fr
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="2." title="Données personnelles collectées">
        <p>
          Nous collectons uniquement les données strictement nécessaires à
          la fourniture de nos services, et toujours de manière transparente.
          Les catégories de données concernées sont les suivantes&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            <strong>Données d&apos;identification</strong>&nbsp;: prénom, nom,
            adresse email, numéro de téléphone (facultatif). Collectées via
            les formulaires de contact et de diagnostic.
          </li>
          <li>
            <strong>Données relatives au bien</strong>&nbsp;: type de bien,
            surface, localisation, caractéristiques, standing. Collectées
            uniquement via le formulaire de diagnostic de rentabilité.
          </li>
          <li>
            <strong>Données de navigation</strong>&nbsp;: pages visitées,
            durée de visite, appareil utilisé, parcours sur le site,
            interactions avec les boutons et formulaires. Collectées via
            Microsoft Clarity et Vercel Analytics, dans une démarche
            d&apos;amélioration de l&apos;expérience utilisateur.
          </li>
          <li>
            <strong>Données techniques</strong>&nbsp;: adresse IP (anonymisée),
            type de navigateur, système d&apos;exploitation, langue.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="3." title="Finalités du traitement">
        <p>Vos données personnelles sont traitées pour les finalités suivantes&nbsp;:</p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            Répondre à vos demandes de contact, de qualification et de
            devis, et vous adresser des réponses personnalisées.
          </li>
          <li>
            Générer une estimation indicative de rentabilité locative via
            notre outil de diagnostic, à partir des caractéristiques
            déclarées de votre bien.
          </li>
          <li>
            Assurer la gestion de la relation commerciale et opérationnelle
            avec les propriétaires ayant signé un mandat de gestion.
          </li>
          <li>
            Améliorer la qualité du site et de nos services, analyser
            l&apos;audience de manière agrégée et anonymisée, et prévenir
            les usages abusifs.
          </li>
          <li>
            Répondre à nos obligations légales, fiscales et réglementaires.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="4." title="Base légale des traitements">
        <p>
          Les traitements sont fondés sur les bases légales suivantes au
          sens de l&apos;article 6 du RGPD&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            <strong>Consentement</strong> (art. 6.1.a) pour les données de
            navigation issues d&apos;outils de mesure d&apos;audience et
            pour la newsletter le cas échéant.
          </li>
          <li>
            <strong>Exécution d&apos;un contrat ou de mesures
            précontractuelles</strong> (art. 6.1.b) pour les demandes de
            contact, le diagnostic et la gestion des mandats.
          </li>
          <li>
            <strong>Obligation légale</strong> (art. 6.1.c) pour la
            conservation de certaines pièces comptables, fiscales et
            réglementaires.
          </li>
          <li>
            <strong>Intérêt légitime</strong> (art. 6.1.f) pour la sécurité
            du site et la prévention des abus.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="5." title="Durée de conservation">
        <p>
          Les durées de conservation des données sont alignées sur les
          finalités de traitement&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            Données des formulaires de contact et de diagnostic&nbsp;: jusqu&apos;à
            <strong> 3 ans </strong> à compter du dernier échange, au titre
            de la prospection commerciale.
          </li>
          <li>
            Données des mandats de gestion&nbsp;:
            <strong> 5 ans </strong> à compter de la fin du contrat, au
            titre de la responsabilité contractuelle.
          </li>
          <li>
            Données comptables et fiscales&nbsp;:
            <strong> 10 ans </strong> conformément aux obligations légales
            applicables.
          </li>
          <li>
            Données de navigation anonymisées&nbsp;:
            <strong> 13 mois </strong> maximum.
          </li>
        </ul>
        <p className="mt-4">
          À l&apos;expiration de ces durées, les données sont supprimées ou
          anonymisées de manière irréversible.
        </p>
      </LegalSection>

      <LegalSection number="6." title="Destinataires des données">
        <p>
          Vos données personnelles sont destinées exclusivement à HL GROUP
          SAS et à ses équipes habilitées (fondateurs, opérations, relation
          propriétaire). Elles peuvent être partagées, dans la stricte
          mesure nécessaire à l&apos;exécution de nos services, avec les
          sous-traitants suivants&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            <strong>Vercel Inc.</strong> (États-Unis) pour
            l&apos;hébergement du site, sous couvert des clauses
            contractuelles types de la Commission européenne.
          </li>
          <li>
            <strong>Resend</strong> (États-Unis) pour l&apos;envoi des
            emails transactionnels issus des formulaires.
          </li>
          <li>
            <strong>Anthropic (Claude API)</strong> (États-Unis) pour le
            traitement du diagnostic de rentabilité&nbsp;; aucune donnée
            personnelle directement identifiante n&apos;est transmise à ce
            sous-traitant.
          </li>
          <li>
            <strong>Microsoft Clarity</strong> et <strong>Vercel Analytics</strong>{" "}
            pour l&apos;analyse anonymisée de l&apos;audience.
          </li>
        </ul>
        <p className="mt-4">
          Aucune donnée personnelle n&apos;est vendue, louée ou cédée à des
          tiers à des fins commerciales.
        </p>
      </LegalSection>

      <LegalSection number="7." title="Vos droits">
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous
          disposez des droits suivants sur vos données personnelles&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            <strong>Droit d&apos;accès</strong>&nbsp;: obtenir la
            confirmation que vos données sont traitées et en recevoir copie.
          </li>
          <li>
            <strong>Droit de rectification</strong>&nbsp;: faire corriger
            des données inexactes ou incomplètes.
          </li>
          <li>
            <strong>Droit à l&apos;effacement</strong>&nbsp;: demander la
            suppression de vos données (droit à l&apos;oubli).
          </li>
          <li>
            <strong>Droit à la limitation</strong>&nbsp;: demander le gel
            temporaire du traitement de vos données.
          </li>
          <li>
            <strong>Droit à la portabilité</strong>&nbsp;: recevoir vos
            données dans un format structuré et interopérable.
          </li>
          <li>
            <strong>Droit d&apos;opposition</strong>&nbsp;: vous opposer au
            traitement pour motifs légitimes, notamment à la prospection
            commerciale.
          </li>
          <li>
            <strong>Droit de retirer votre consentement</strong> à tout
            moment, sans porter atteinte à la licéité du traitement antérieur.
          </li>
        </ul>
        <p className="mt-4">
          Pour exercer ces droits, contactez-nous à{" "}
          <a
            href="mailto:contact@hlconciergerie.fr"
            className="text-gold-dark underline underline-offset-4"
          >
            contact@hlconciergerie.fr
          </a>{" "}
          en précisant votre demande et en joignant, si nécessaire, une
          pièce d&apos;identité. Nous vous répondrons dans un délai maximal
          d&apos;un mois. En cas de désaccord, vous pouvez introduire une
          réclamation auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-dark underline underline-offset-4"
          >
            www.cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection number="8." title="Cookies et traceurs">
        <p>
          Le site hlconciergerie.fr utilise des cookies et traceurs dans une
          double finalité&nbsp;:
        </p>
        <ul className="mt-4 space-y-2 list-disc list-outside pl-6 marker:text-gold-dark">
          <li>
            <strong>Cookies strictement nécessaires</strong>&nbsp;: assurent
            le fonctionnement technique du site et la sécurité des sessions.
            Ils ne requièrent pas de consentement.
          </li>
          <li>
            <strong>Cookies de mesure d&apos;audience anonymisée</strong>{" "}
            (Microsoft Clarity, Vercel Analytics)&nbsp;: nous permettent de
            comprendre comment le site est utilisé et de l&apos;améliorer.
            Leur dépôt est soumis à votre consentement explicite via la
            bannière cookies affichée à votre première visite.
          </li>
        </ul>
        <p className="mt-4">
          Vous pouvez à tout moment modifier vos préférences de cookies via
          la bannière ou les paramètres de votre navigateur. Le refus des
          cookies de mesure n&apos;altère pas la navigation sur le site.
        </p>
      </LegalSection>

      <LegalSection number="9." title="Sécurité des données">
        <p>
          HL GROUP SAS met en œuvre les mesures techniques et
          organisationnelles appropriées pour protéger vos données
          personnelles contre la perte, le vol, l&apos;accès non autorisé,
          la divulgation, la modification ou la destruction. Les échanges
          avec le site sont chiffrés via HTTPS, les accès aux outils
          internes sont protégés par authentification à double facteur, et
          l&apos;accès aux données propriétaires est strictement limité aux
          personnes habilitées.
        </p>
      </LegalSection>

      <LegalSection number="10." title="Contact délégué à la protection des données">
        <p>
          HL GROUP SAS n&apos;a pas l&apos;obligation de désigner un
          délégué à la protection des données (DPO) au sens de
          l&apos;article 37 du RGPD. Pour toute question relative à la
          protection de vos données, contactez directement le responsable
          du traitement à :{" "}
          <a
            href="mailto:contact@hlconciergerie.fr"
            className="text-gold-dark underline underline-offset-4"
          >
            contact@hlconciergerie.fr
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="11." title="Évolution de la politique">
        <p>
          La présente politique de confidentialité peut évoluer pour
          prendre en compte des évolutions légales, réglementaires ou
          techniques. En cas de modification substantielle, les
          utilisateurs seront informés par un bandeau sur le site et, le
          cas échéant, par email. Nous vous invitons à consulter cette
          page régulièrement pour prendre connaissance des éventuelles
          mises à jour.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
