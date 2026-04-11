"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PACKS } from "@/lib/packs";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CellValue = boolean | string;

interface ComparatorRow {
  group: string;
  feature: string;
  essentiel: CellValue;
  premium: CellValue;
  signature: CellValue;
}

/**
 * Matrice complète des fonctionnalités pour le tableau comparatif.
 * Les valeurs booléennes deviennent Check / dash, les strings sont
 * rendues tel quel (pour détailler une ligne quand pertinent).
 * Ordre délibéré : opérations, commercialisation, expérience voyageur,
 * propriétaire, conformité, reporting.
 */
const COMPARATOR_ROWS: ComparatorRow[] = [
  {
    group: "Commercialisation",
    feature: "Création et optimisation des annonces",
    essentiel: true,
    premium: true,
    signature: true,
  },
  {
    group: "Commercialisation",
    feature: "Shooting photo professionnel",
    essentiel: false,
    premium: "Annuel",
    signature: "Saisonnier",
  },
  {
    group: "Commercialisation",
    feature: "Multi-diffusion plateformes",
    essentiel: "Airbnb · Booking · Vrbo",
    premium: "12+ plateformes",
    signature: "Sélection internationale",
  },
  {
    group: "Commercialisation",
    feature: "Pricing dynamique piloté par IA",
    essentiel: false,
    premium: true,
    signature: true,
  },
  {
    group: "Commercialisation",
    feature: "Community management éditorial",
    essentiel: false,
    premium: true,
    signature: true,
  },
  {
    group: "Opérations",
    feature: "Gestion 7j/7 des réservations",
    essentiel: true,
    premium: true,
    signature: true,
  },
  {
    group: "Opérations",
    feature: "Check-in et check-out personnalisés",
    essentiel: true,
    premium: true,
    signature: "Majordome dédié",
  },
  {
    group: "Opérations",
    feature: "Ménage hôtelier entre séjours",
    essentiel: true,
    premium: true,
    signature: true,
  },
  {
    group: "Opérations",
    feature: "Linge professionnel",
    essentiel: "Standard premium",
    premium: "Standard premium",
    signature: "Marques partenaires",
  },
  {
    group: "Opérations",
    feature: "Maintenance préventive et artisans",
    essentiel: false,
    premium: true,
    signature: true,
  },
  {
    group: "Expérience voyageur",
    feature: "Kit d'accueil et produits d'hygiène",
    essentiel: "Premium",
    premium: "Premium",
    signature: "Cosmétiques signature",
  },
  {
    group: "Expérience voyageur",
    feature: "Conciergerie voyageur",
    essentiel: false,
    premium: true,
    signature: "Majordome sur demande",
  },
  {
    group: "Expérience voyageur",
    feature: "Fleurs fraîches et mise en scène",
    essentiel: false,
    premium: false,
    signature: true,
  },
  {
    group: "Expérience voyageur",
    feature: "Sélection VIP des voyageurs",
    essentiel: false,
    premium: false,
    signature: true,
  },
  {
    group: "Propriétaire",
    feature: "Gestionnaire dédié",
    essentiel: false,
    premium: "Trimestriel",
    signature: "Joignable 7j/7",
  },
  {
    group: "Propriétaire",
    feature: "Conciergerie pour vos usages personnels",
    essentiel: false,
    premium: false,
    signature: true,
  },
  {
    group: "Propriétaire",
    feature: "Couverture événementielle",
    essentiel: false,
    premium: false,
    signature: true,
  },
  {
    group: "Conformité",
    feature: "Déclarations réglementaires complètes",
    essentiel: true,
    premium: true,
    signature: true,
  },
  {
    group: "Conformité",
    feature: "Gestion fiscale LMNP",
    essentiel: false,
    premium: false,
    signature: true,
  },
  {
    group: "Reporting",
    feature: "Reporting détaillé",
    essentiel: "Mensuel",
    premium: "Bi-mensuel",
    signature: "Hebdomadaire + main propre",
  },
  {
    group: "Reporting",
    feature: "Analyse comparative de marché",
    essentiel: false,
    premium: true,
    signature: true,
  },
  {
    group: "Reporting",
    feature: "Audit annuel de valorisation",
    essentiel: false,
    premium: false,
    signature: true,
  },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center border border-gold-dark/40 bg-gold-dark/5">
        <Check
          size={13}
          strokeWidth={2}
          className="text-gold-dark"
          aria-label="Inclus"
        />
      </span>
    );
  }
  if (value === false) {
    return (
      <Minus
        size={14}
        strokeWidth={1.8}
        className="text-black/25"
        aria-label="Non inclus"
      />
    );
  }
  return (
    <span className="text-[13px] leading-tight text-black/75 font-light italic">
      {value}
    </span>
  );
}

/**
 * Tableau comparatif des 3 packs. Colonne Premium légèrement surlignée,
 * badge "Le plus choisi" en sticky au-dessus de la colonne Premium.
 * Le tableau regroupe les features par catégories (Commercialisation,
 * Opérations, Expérience voyageur, etc.), avec une ligne d'en-tête
 * discrète pour marquer chaque groupe.
 */
export function ServicesComparator() {
  const essentiel = PACKS[0];
  const premium = PACKS[1];
  const signature = PACKS[2];

  // Regroupement par catégorie pour affichage.
  const grouped = COMPARATOR_ROWS.reduce<Record<string, ComparatorRow[]>>(
    (acc, row) => {
      acc[row.group] = acc[row.group] ?? [];
      acc[row.group].push(row);
      return acc;
    },
    {},
  );
  const groupNames = Array.from(new Set(COMPARATOR_ROWS.map((r) => r.group)));

  return (
    <section
      id="comparatif"
      className="relative isolate overflow-hidden bg-cream text-black"
    >
      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            variants={fadeUp}
            className="eyebrow-cream block"
          >
            Choisir en un coup d&apos;œil
          </motion.span>

          <motion.div variants={fadeUp} className="mt-6">
            <GoldDivider width="sm" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display font-light text-black leading-[1.05] tracking-[-0.01em]"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              textWrap: "balance",
            }}
          >
            Le pack qui vous correspond.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[15px] md:text-[16px] leading-relaxed text-black/60 font-light mx-auto"
            style={{ maxWidth: "600px", textWrap: "pretty" }}
          >
            Chaque ligne ci-dessous documente une composante concrète du
            service. Les trois packs partagent le même socle de rigueur,
            puis se différencient par l&apos;ampleur et l&apos;intensité de
            l&apos;accompagnement.
          </motion.p>
        </div>

        {/* Tableau comparatif */}
        <motion.div
          variants={fadeUp}
          className="mt-14 md:mt-20 border border-gold-dark/25 bg-white/50 backdrop-blur-sm overflow-hidden"
        >
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="border-b border-gold-dark/30 hover:bg-transparent">
                <TableHead className="w-[42%] min-w-[200px] h-auto py-6 px-4 md:px-6 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-gold-dark whitespace-normal">
                  Prestation
                </TableHead>
                <TableHead className="w-[19.33%] h-auto py-6 px-3 align-bottom text-center text-[11px] font-medium uppercase tracking-[0.18em] text-black/60 whitespace-normal">
                  <div className="flex h-full flex-col items-center justify-end gap-1">
                    <span className="font-display text-[18px] md:text-[22px] font-normal text-black not-uppercase tracking-normal normal-case">
                      {essentiel.name}
                    </span>
                    <span className="text-[10px] text-black/50">
                      {essentiel.commission}% de commission
                    </span>
                  </div>
                </TableHead>
                <TableHead className="w-[19.33%] h-auto py-6 px-3 align-bottom text-center whitespace-normal bg-gold-dark/[0.06]">
                  <div className="flex h-full flex-col items-center justify-end gap-1">
                    {/* Badge intégré au flux normal pour éviter toute coupure */}
                    <span className="mb-3 inline-flex items-center gap-2 border border-gold-dark/60 bg-cream px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-gold-dark font-medium whitespace-nowrap">
                      <span className="block h-1 w-1 rotate-45 bg-gold-dark" />
                      Le plus choisi
                      <span className="block h-1 w-1 rotate-45 bg-gold-dark" />
                    </span>
                    <span className="font-display text-[18px] md:text-[22px] font-normal text-black not-uppercase tracking-normal normal-case">
                      {premium.name}
                    </span>
                    <span className="text-[10px] text-black/60">
                      {premium.commission}% de commission
                    </span>
                  </div>
                </TableHead>
                <TableHead className="w-[19.33%] h-auto py-6 px-3 align-bottom text-center text-[11px] font-medium uppercase tracking-[0.18em] text-black/60 whitespace-normal">
                  <div className="flex h-full flex-col items-center justify-end gap-1">
                    <span className="font-display text-[18px] md:text-[22px] font-normal text-black not-uppercase tracking-normal normal-case">
                      {signature.name}
                    </span>
                    <span className="text-[10px] text-black/50">
                      {signature.commission}% de commission
                    </span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupNames.map((groupName) => (
                <GroupRows
                  key={groupName}
                  groupName={groupName}
                  rows={grouped[groupName]}
                />
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Note de bas */}
        <motion.p
          variants={fadeUp}
          className="mt-10 text-center italic text-[13px] md:text-[14px] text-black/55 font-light mx-auto"
          style={{ maxWidth: "720px", textWrap: "pretty" }}
        >
          Tous les packs incluent la conformité réglementaire loi Le Meur et
          règlement Nice 2026, ainsi que notre garantie de satisfaction.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-20">
          <GoldDivider width="md" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function GroupRows({
  groupName,
  rows,
}: {
  groupName: string;
  rows: ComparatorRow[];
}) {
  return (
    <>
      <TableRow className="hover:bg-transparent border-0">
        <TableCell
          colSpan={4}
          className="bg-gold-dark/[0.04] border-y border-gold-dark/20 px-4 md:px-6 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-gold-dark"
        >
          {groupName}
        </TableCell>
      </TableRow>
      {rows.map((row, idx) => (
        <TableRow
          key={`${row.group}-${idx}`}
          className={cn(
            "border-b border-gold-dark/12 hover:bg-white/40 transition-colors",
          )}
        >
          <TableCell className="px-4 md:px-6 py-4 text-[13.5px] md:text-[14px] text-black/80 font-light whitespace-normal">
            {row.feature}
          </TableCell>
          <TableCell className="px-3 py-4 text-center whitespace-normal">
            <Cell value={row.essentiel} />
          </TableCell>
          <TableCell className="px-3 py-4 text-center bg-gold-dark/[0.04] whitespace-normal">
            <Cell value={row.premium} />
          </TableCell>
          <TableCell className="px-3 py-4 text-center whitespace-normal">
            <Cell value={row.signature} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
