import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site H&L Conciergerie : éditeur, hébergement, propriété intellectuelle et droit applicable.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      lastUpdate="avril 2026"
      intro="Les présentes mentions légales sont conformes aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, dite LCEN. Elles s'appliquent à l'ensemble des visiteurs du site hl-conciergerie.com."
    >
      <LegalSection number="1." title="Éditeur du site">
        <p>
          Le site <strong>hl-conciergerie.com</strong> est édité par la société{" "}
          <strong>HL GROUP SAS</strong>, société par actions simplifiée au
          capital de 10 000 €, dont le siège social est situé à Nice
          (Alpes-Maritimes, France).
        </p>
        <p>
          Numéro d&apos;immatriculation : RCS Nice 000 000 000 · SIRET 000 000
          000 00000 · TVA intracommunautaire FR00 000 000 000. L&apos;ensemble
          de ces identifiants est mis à jour sur cette page dès la
          finalisation des formalités d&apos;immatriculation.
        </p>
        <p>
          Activité : conciergerie et gestion locative courte durée premium,
          à Nice et sur la Côte d&apos;Azur, sous l&apos;enseigne commerciale{" "}
          <strong>H&amp;L Conciergerie</strong>.
        </p>
      </LegalSection>

      <LegalSection number="2." title="Directeur de la publication">
        <p>
          Le directeur de la publication du site est M. Guillaume Haas,
          co-fondateur et représentant légal de HL GROUP SAS. Toute demande
          relative au contenu du site peut être adressée à :{" "}
          <a
            href="mailto:contact@hl-conciergerie.com"
            className="text-gold-dark underline underline-offset-4"
          >
            contact@hl-conciergerie.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="3." title="Hébergeur">
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, dont le siège
          social est situé au 340 S Lemon Ave #4133, Walnut (Californie,
          91789), États-Unis. Vercel assure l&apos;hébergement infrastructure
          du site via son réseau de distribution de contenu (CDN) mondial.
        </p>
        <p>
          Contact Vercel :{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-dark underline underline-offset-4"
          >
            vercel.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="4." title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des éléments composant le site hl-conciergerie.com
          (textes, images, graphismes, logo, monogramme H&amp;L, icônes,
          typographies, architecture, mise en page, code source) est la
          propriété exclusive de HL GROUP SAS ou de ses partenaires ayant
          consenti une licence. Ces éléments sont protégés par le droit
          français et international relatif à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication ou
          adaptation, partielle ou totale, des éléments du site, par quelque
          procédé que ce soit, est interdite sans autorisation écrite
          préalable de HL GROUP SAS. Toute exploitation non autorisée du
          site ou de l&apos;un de ses éléments est constitutive d&apos;une
          contrefaçon sanctionnée par les articles L.335-2 et suivants du
          Code de la propriété intellectuelle.
        </p>
        <p>
          La marque <strong>H&amp;L Conciergerie</strong> et son monogramme
          associé font l&apos;objet d&apos;un dépôt auprès de l&apos;Institut
          national de la propriété industrielle (INPI).
        </p>
      </LegalSection>

      <LegalSection number="5." title="Liens hypertextes">
        <p>
          Le site peut contenir des liens hypertextes vers des sites tiers
          édités ou gérés par des personnes autres que HL GROUP SAS. HL GROUP
          SAS n&apos;exerce aucun contrôle sur ces sites et décline toute
          responsabilité quant à leur contenu, leur disponibilité ou toute
          utilisation qui en serait faite.
        </p>
        <p>
          La création d&apos;un lien hypertexte pointant vers le site
          hl-conciergerie.com est soumise à l&apos;accord préalable et écrit
          de HL GROUP SAS.
        </p>
      </LegalSection>

      <LegalSection number="6." title="Données personnelles et cookies">
        <p>
          Les données personnelles collectées via le site sont traitées
          conformément à la politique de confidentialité accessible sur la
          page dédiée. Pour toute question relative à vos données, vous
          pouvez consulter notre{" "}
          <a
            href="/confidentialite"
            className="text-gold-dark underline underline-offset-4"
          >
            politique de confidentialité
          </a>{" "}
          ou nous écrire à contact@hl-conciergerie.com.
        </p>
      </LegalSection>

      <LegalSection number="7." title="Responsabilité">
        <p>
          HL GROUP SAS s&apos;efforce d&apos;assurer au mieux de ses
          possibilités l&apos;exactitude et la mise à jour des informations
          diffusées sur son site, dont elle se réserve le droit de corriger,
          à tout moment et sans préavis, le contenu. Toutefois, HL GROUP SAS
          ne peut garantir l&apos;exactitude, la précision ou
          l&apos;exhaustivité des informations mises à disposition sur son
          site.
        </p>
        <p>
          Les informations relatives aux estimations de rendement, aux
          benchmarks marché et aux prestations des packs H&amp;L sont
          fournies à titre indicatif et ne constituent en aucun cas une
          promesse contractuelle. Tout engagement formel est régi par un
          mandat de gestion signé entre le propriétaire et HL GROUP SAS.
        </p>
      </LegalSection>

      <LegalSection number="8." title="Droit applicable et juridiction compétente">
        <p>
          Les présentes mentions légales sont régies par le droit français.
          En cas de litige et à défaut de résolution amiable, les tribunaux
          compétents de Nice seront seuls compétents pour connaître de tout
          différend relatif à l&apos;interprétation ou à l&apos;exécution
          des présentes.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
