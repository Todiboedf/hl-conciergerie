"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Home,
  Loader2,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioCard } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  DIAGNOSTIC_STEPS,
  DiagnosticProgress,
} from "@/components/diagnostic/DiagnosticProgress";
import {
  BATHROOM_LABELS,
  BEDROOM_LABELS,
  CURRENT_RENTAL_LABELS,
  ELEVATOR_LABELS,
  FLOOR_LABELS,
  GUEST_CAPACITY_LABELS,
  NICE_AREA_LABELS,
  PROPERTY_TYPE_LABELS,
  STANDING_LABELS,
  VIEW_LABELS,
  type BathroomCount,
  type BedroomCount,
  type CurrentRental,
  type DiagnosticInput,
  type Elevator,
  type FloorLevel,
  type GuestCapacity,
  type NiceArea,
  type PropertyType,
  type Standing,
  type ViewType,
} from "@/lib/types/diagnostic";

/**
 * Formulaire de diagnostic multi-étapes H&L (lead magnet #1 du site).
 * 4 étapes avec validation Zod progressive, transitions Framer Motion,
 * glass card cream, composants primitives @base-ui/react.
 *
 * Appelle POST /api/diagnostic à la soumission et passe le résultat
 * + l'input au parent (app/diagnostic/page.tsx) via onSuccess pour
 * basculer sur l'écran DiagnosticResult.
 */

type StepErrors = Record<string, string>;

interface FormState {
  // Étape 1
  propertyType: PropertyType | "";
  surfaceSqm: string; // string pour compat Input controlled
  bedrooms: BedroomCount | "";
  bathrooms: BathroomCount | "";
  guestCapacity: GuestCapacity | "";
  // Étape 2
  area: NiceArea | "";
  view: ViewType | "";
  floor: FloorLevel | "";
  elevator: Elevator | "";
  // Étape 3
  airConditioning: boolean;
  balcony: boolean;
  parking: boolean;
  pool: boolean;
  garden: boolean;
  standing: Standing | "";
  currentRental: CurrentRental | "";
  // Étape 4
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rgpd: boolean;
}

const INITIAL_STATE: FormState = {
  propertyType: "",
  surfaceSqm: "",
  bedrooms: "",
  bathrooms: "",
  guestCapacity: "",
  area: "",
  view: "",
  floor: "",
  elevator: "",
  airConditioning: false,
  balcony: false,
  parking: false,
  pool: false,
  garden: false,
  standing: "",
  currentRental: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  rgpd: false,
};

// Schémas Zod par étape. Utilisés uniquement côté client pour
// valider avant de passer à l'étape suivante. Le serveur re-valide
// la soumission finale sur la route /api/diagnostic.
const step1Schema = z.object({
  propertyType: z.enum([
    "studio",
    "t1",
    "t2",
    "t3",
    "t4-plus",
    "maison",
    "villa",
  ]),
  surfaceSqm: z
    .number({ message: "Surface requise" })
    .int()
    .min(15, "Minimum 15 m²")
    .max(500, "Maximum 500 m²"),
  bedrooms: z.enum(["0", "1", "2", "3", "4", "5-plus"]),
  bathrooms: z.enum(["1", "2", "3-plus"]),
  guestCapacity: z.enum(["2", "3", "4", "5", "6", "7", "8", "9-plus"]),
});

const step2Schema = z.object({
  area: z.enum([
    "vieux-nice",
    "carre-or",
    "promenade",
    "port",
    "liberation",
    "mont-boron",
    "cimiez",
    "fabron",
    "saint-jean-angely",
    "californie",
    "riquier",
    "magnan",
    "saint-roch",
    "autre-nice",
    "saint-laurent-var",
    "villefranche",
    "beaulieu",
    "cap-ail",
  ]),
  view: z.enum([
    "mer-panoramique",
    "mer-partielle",
    "jardin-cour",
    "ville",
    "aucune",
  ]),
  floor: z.enum([
    "rdc",
    "1er",
    "2e",
    "3e",
    "4e",
    "5e-plus",
    "dernier",
    "villa-individuelle",
  ]),
  elevator: z.enum(["oui", "non", "non-applicable"]),
});

const step3Schema = z.object({
  standing: z.enum(["standard", "bon", "haut", "tres-haut", "exceptionnel"]),
  currentRental: z.enum(["regulier", "ponctuel", "jamais"]),
});

const step4Schema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis").max(80),
  lastName: z.string().trim().min(1, "Nom requis").max(80),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  rgpd: z.literal(true, {
    message: "Consentement requis pour continuer",
  }),
});

// Types iconiques par étape (eyebrow)
const STEP_ICONS: Record<number, LucideIcon> = {
  0: Home,
  1: MapPin,
  2: Building2,
  3: User,
};

export interface DiagnosticFormProps {
  onSuccess: (args: {
    input: DiagnosticInput;
    result: import("@/lib/types/diagnostic").DiagnosticResult;
  }) => void;
}

export function DiagnosticForm({ onSuccess }: DiagnosticFormProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = DIAGNOSTIC_STEPS.length;
  const isLast = step === totalSteps - 1;

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    setErrors((e) => {
      if (!(key in e)) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    const schemas = [step1Schema, step2Schema, step3Schema, step4Schema];
    const payloads = [
      {
        propertyType: state.propertyType || undefined,
        surfaceSqm: state.surfaceSqm ? Number(state.surfaceSqm) : undefined,
        bedrooms: state.bedrooms || undefined,
        bathrooms: state.bathrooms || undefined,
        guestCapacity: state.guestCapacity || undefined,
      },
      {
        area: state.area || undefined,
        view: state.view || undefined,
        floor: state.floor || undefined,
        elevator: state.elevator || undefined,
      },
      {
        standing: state.standing || undefined,
        currentRental: state.currentRental || undefined,
      },
      {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phone: state.phone,
        rgpd: state.rgpd || undefined,
      },
    ];

    const schema = schemas[step];
    const payload = payloads[step];
    if (!schema) return true;

    const result = schema.safeParse(payload);
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: StepErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    setErrors(fieldErrors);

    // Message de politesse + défilement vers le premier champ erroné
    toast.error("Merci de compléter les champs requis avant de continuer.");
    return false;
  }, [step, state]);

  const goNext = useCallback(() => {
    if (!validateCurrentStep()) return;
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step, totalSteps, validateCurrentStep]);

  const goBack = useCallback(() => {
    if (step === 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
    setErrors({});
  }, [step]);

  const handleSubmit = useCallback(async () => {
    if (!validateCurrentStep()) return;

    // On bascule toutes les valeurs en types stricts pour l'envoi.
    const input: DiagnosticInput = {
      propertyType: state.propertyType as PropertyType,
      surfaceSqm: Number(state.surfaceSqm),
      bedrooms: state.bedrooms as BedroomCount,
      bathrooms: state.bathrooms as BathroomCount,
      guestCapacity: state.guestCapacity as GuestCapacity,
      area: state.area as NiceArea,
      view: state.view as ViewType,
      floor: state.floor as FloorLevel,
      elevator: state.elevator as Elevator,
      airConditioning: state.airConditioning,
      balcony: state.balcony,
      parking: state.parking,
      pool: state.pool,
      garden: state.garden,
      standing: state.standing as Standing,
      currentRental: state.currentRental as CurrentRental,
      firstName: state.firstName.trim(),
      lastName: state.lastName.trim(),
      email: state.email.trim(),
      phone: state.phone.trim() || undefined,
      rgpd: true,
    };

    setSubmitting(true);
    try {
      const response = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        result?: import("@/lib/types/diagnostic").DiagnosticResult;
        error?: string;
      };

      if (!response.ok || !data.success || !data.result) {
        setSubmitting(false);
        toast.error(
          data.error ??
            "Nous n'avons pas pu calculer votre estimation. Merci de réessayer dans un instant.",
        );
        return;
      }

      toast.success("Estimation personnalisée générée.");
      onSuccess({ input, result: data.result });
    } catch {
      setSubmitting(false);
      toast.error(
        "Nous rencontrons une difficulté technique. Merci de réessayer ou de nous écrire à contact@hl-conciergerie.com.",
      );
    }
  }, [state, validateCurrentStep, onSuccess]);

  const HeaderIcon = STEP_ICONS[step];

  const stepContent = useMemo(() => {
    switch (step) {
      case 0:
        return (
          <Step1
            state={state}
            errors={errors}
            update={update}
          />
        );
      case 1:
        return (
          <Step2
            state={state}
            errors={errors}
            update={update}
          />
        );
      case 2:
        return (
          <Step3
            state={state}
            errors={errors}
            update={update}
          />
        );
      case 3:
        return (
          <Step4
            state={state}
            errors={errors}
            update={update}
          />
        );
      default:
        return null;
    }
  }, [step, state, errors, update]);

  return (
    <div className="w-full">
      <DiagnosticProgress currentStep={step} className="mb-10 md:mb-12" />

      <GlassCard variant="cream" className="p-5 sm:p-8 md:p-10 lg:p-12">
        {/* Eyebrow + titre de l'étape */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="flex h-9 w-9 items-center justify-center border border-gold-dark/40 bg-white/60">
            <HeaderIcon
              size={15}
              strokeWidth={1.5}
              className="text-gold-dark"
              aria-hidden="true"
            />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-gold-dark font-medium">
              Étape {step + 1} / {totalSteps}
            </span>
            <h2 className="font-display text-[24px] md:text-[28px] leading-tight text-black">
              {DIAGNOSTIC_STEPS[step]?.label}
            </h2>
          </div>
        </div>

        {/* Contenu animé */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction === 1 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 1 ? -40 : 40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {stepContent}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 pt-6 border-t border-gold-dark/20 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {step > 0 && !submitting && (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-black/60 hover:text-gold-dark transition-colors font-medium"
              >
                <ArrowLeft size={14} strokeWidth={1.5} />
                Retour
              </button>
            )}
          </div>

          <PremiumButton
            variant="primary"
            size={isLast ? "lg" : "md"}
            type="button"
            onClick={isLast ? handleSubmit : goNext}
            disabled={submitting}
            className={cn(isLast && "w-full sm:w-auto")}
          >
            {submitting ? (
              <>
                <Loader2 size={14} strokeWidth={1.8} className="animate-spin" />
                Analyse en cours
              </>
            ) : isLast ? (
              <>
                <Sparkles size={14} strokeWidth={1.8} />
                Obtenir mon estimation
              </>
            ) : (
              <>
                Suivant
                <ArrowRight size={14} strokeWidth={1.5} />
              </>
            )}
          </PremiumButton>
        </div>
      </GlassCard>
    </div>
  );
}

/* ============================================================
   SOUS-COMPOSANTS DE CHAQUE ÉTAPE
   ============================================================ */

interface StepProps {
  state: FormState;
  errors: StepErrors;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}

function FieldLabel({
  children,
  required,
  error,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label
        htmlFor={htmlFor}
        className="text-[10.5px] uppercase tracking-[0.22em] text-gold-dark font-medium"
      >
        {children}
        {required && <span className="text-gold-dark/60 ml-0.5">*</span>}
        {error && (
          <span className="normal-case tracking-normal text-[11.5px] text-red-700 font-medium ml-2">
            {error}
          </span>
        )}
      </Label>
    </div>
  );
}

const CREAM_INPUT_CLS =
  "h-11 bg-white/60 border-gold-dark/30 text-black placeholder:text-black/35 focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px] px-3.5";

const CREAM_SELECT_TRIGGER_CLS =
  "h-11 w-full bg-white/60 border-gold-dark/30 text-black focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px] px-3.5";

/* ========== ÉTAPE 1 ========== */

const PROPERTY_TYPE_DESCRIPTIONS: Record<PropertyType, string> = {
  studio: "Pièce unique",
  t1: "1 pièce + cuisine",
  t2: "1 chambre séparée",
  t3: "2 chambres",
  "t4-plus": "3 chambres et plus",
  maison: "Maison individuelle",
  villa: "Villa avec extérieur",
};

function Step1({ state, errors, update }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <FieldLabel required error={errors.propertyType}>
          Type de bien
        </FieldLabel>
        <RadioGroup
          value={state.propertyType || undefined}
          onValueChange={(value) =>
            update("propertyType", value as PropertyType)
          }
          className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
        >
          {(Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[]).map((type) => (
            <RadioCard
              key={type}
              value={type}
              label={PROPERTY_TYPE_LABELS[type]}
              description={PROPERTY_TYPE_DESCRIPTIONS[type]}
            />
          ))}
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FieldLabel htmlFor="diag-surface" required error={errors.surfaceSqm}>
          Surface habitable (m²)
          <Input
            id="diag-surface"
            type="number"
            min={15}
            max={500}
            inputMode="numeric"
            value={state.surfaceSqm}
            onChange={(e) => update("surfaceSqm", e.target.value)}
            className={CREAM_INPUT_CLS}
            placeholder="Ex. 65"
          />
        </FieldLabel>

        <FieldLabel required error={errors.bedrooms}>
          Nombre de chambres
          <Select
            value={state.bedrooms || undefined}
            onValueChange={(value) =>
              update("bedrooms", (value ?? "") as BedroomCount)
            }
          >
            <SelectTrigger
              className={cn(
                CREAM_SELECT_TRIGGER_CLS,
                !state.bedrooms && "text-black/40",
              )}
            >
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent className="bg-cream border border-gold-dark/30 text-black rounded-none">
              {(Object.keys(BEDROOM_LABELS) as BedroomCount[]).map((key) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-black focus:bg-gold-dark/10 focus:text-black"
                >
                  {BEDROOM_LABELS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldLabel>

        <FieldLabel required error={errors.bathrooms}>
          Salles de bain
          <Select
            value={state.bathrooms || undefined}
            onValueChange={(value) =>
              update("bathrooms", (value ?? "") as BathroomCount)
            }
          >
            <SelectTrigger
              className={cn(
                CREAM_SELECT_TRIGGER_CLS,
                !state.bathrooms && "text-black/40",
              )}
            >
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent className="bg-cream border border-gold-dark/30 text-black rounded-none">
              {(Object.keys(BATHROOM_LABELS) as BathroomCount[]).map((key) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-black focus:bg-gold-dark/10 focus:text-black"
                >
                  {BATHROOM_LABELS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldLabel>
      </div>

      <FieldLabel required error={errors.guestCapacity}>
        Capacité d&apos;accueil voyageurs
        <Select
          value={state.guestCapacity || undefined}
          onValueChange={(value) =>
            update("guestCapacity", (value ?? "") as GuestCapacity)
          }
        >
          <SelectTrigger
            className={cn(
              CREAM_SELECT_TRIGGER_CLS,
              !state.guestCapacity && "text-black/40",
            )}
          >
            <SelectValue placeholder="Nombre de voyageurs" />
          </SelectTrigger>
          <SelectContent className="bg-cream border border-gold-dark/30 text-black rounded-none">
            {(Object.keys(GUEST_CAPACITY_LABELS) as GuestCapacity[]).map(
              (key) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-black focus:bg-gold-dark/10 focus:text-black"
                >
                  {GUEST_CAPACITY_LABELS[key]}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </FieldLabel>
    </div>
  );
}

/* ========== ÉTAPE 2 ========== */

function Step2({ state, errors, update }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <FieldLabel required error={errors.area}>
        Quartier
        <Select
          value={state.area || undefined}
          onValueChange={(value) => update("area", (value ?? "") as NiceArea)}
        >
          <SelectTrigger
            className={cn(
              CREAM_SELECT_TRIGGER_CLS,
              !state.area && "text-black/40",
            )}
          >
            <SelectValue placeholder="Sélectionner un quartier" />
          </SelectTrigger>
          <SelectContent className="bg-cream border border-gold-dark/30 text-black rounded-none max-h-[320px]">
            {(Object.keys(NICE_AREA_LABELS) as NiceArea[]).map((key) => (
              <SelectItem
                key={key}
                value={key}
                className="text-black focus:bg-gold-dark/10 focus:text-black"
              >
                {NICE_AREA_LABELS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldLabel>

      <div>
        <FieldLabel required error={errors.view}>
          Vue depuis le bien
        </FieldLabel>
        <RadioGroup
          value={state.view || undefined}
          onValueChange={(value) => update("view", value as ViewType)}
          className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
        >
          {(Object.keys(VIEW_LABELS) as ViewType[]).map((key) => (
            <RadioCard key={key} value={key} label={VIEW_LABELS[key]} />
          ))}
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FieldLabel required error={errors.floor}>
          Étage
          <Select
            value={state.floor || undefined}
            onValueChange={(value) =>
              update("floor", (value ?? "") as FloorLevel)
            }
          >
            <SelectTrigger
              className={cn(
                CREAM_SELECT_TRIGGER_CLS,
                !state.floor && "text-black/40",
              )}
            >
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent className="bg-cream border border-gold-dark/30 text-black rounded-none">
              {(Object.keys(FLOOR_LABELS) as FloorLevel[]).map((key) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-black focus:bg-gold-dark/10 focus:text-black"
                >
                  {FLOOR_LABELS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldLabel>

        <div>
          <FieldLabel required error={errors.elevator}>
            Ascenseur
          </FieldLabel>
          <RadioGroup
            value={state.elevator || undefined}
            onValueChange={(value) => update("elevator", value as Elevator)}
            className="mt-3 grid grid-cols-3 gap-2.5"
          >
            {(Object.keys(ELEVATOR_LABELS) as Elevator[]).map((key) => (
              <RadioCard key={key} value={key} label={ELEVATOR_LABELS[key]} />
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

/* ========== ÉTAPE 3 ========== */

const STANDING_DESCRIPTIONS: Record<Standing, string> = {
  standard: "Finition correcte, pas de valorisation particulière",
  bon: "Rénovation récente, équipement soigné",
  haut: "Matériaux de qualité, décoration travaillée",
  "tres-haut": "Prestations hôtelières, mobilier designer",
  exceptionnel: "Bien d'exception, pièce rare du marché",
};

const EQUIPMENTS: Array<{
  key: keyof Pick<
    FormState,
    "airConditioning" | "balcony" | "parking" | "pool" | "garden"
  >;
  label: string;
  hint: string;
}> = [
  { key: "airConditioning", label: "Climatisation", hint: "Critique l'été" },
  { key: "balcony", label: "Balcon ou terrasse", hint: "Bonus d'ADR" },
  { key: "parking", label: "Parking privé", hint: "Rare à Nice" },
  { key: "pool", label: "Piscine privée", hint: "Majeur en haute saison" },
  { key: "garden", label: "Jardin privatif", hint: "Valorise les villas" },
];

function Step3({ state, errors, update }: StepProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Switches équipements */}
      <div>
        <FieldLabel>Équipements principaux</FieldLabel>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EQUIPMENTS.map((item) => {
            const id = `diag-equip-${item.key}`;
            return (
              <label
                key={item.key}
                htmlFor={id}
                className={cn(
                  "flex items-start justify-between gap-4 border px-4 py-3.5 cursor-pointer transition-all",
                  state[item.key]
                    ? "border-gold-dark bg-white shadow-[0_6px_20px_-12px_rgba(138,112,48,0.35)]"
                    : "border-gold-dark/25 bg-white/40 hover:border-gold-dark/55 hover:bg-white/60",
                )}
              >
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="text-[14px] text-black leading-tight font-medium">
                    {item.label}
                  </span>
                  <span className="text-[12px] text-black/55 leading-snug font-light">
                    {item.hint}
                  </span>
                </div>
                <Switch
                  id={id}
                  checked={state[item.key]}
                  onCheckedChange={(value) =>
                    update(item.key, Boolean(value))
                  }
                  className="mt-0.5"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Standing */}
      <div>
        <FieldLabel required error={errors.standing}>
          Standing général du bien
        </FieldLabel>
        <RadioGroup
          value={state.standing || undefined}
          onValueChange={(value) => update("standing", value as Standing)}
          className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2.5"
        >
          {(Object.keys(STANDING_LABELS) as Standing[]).map((key) => (
            <RadioCard
              key={key}
              value={key}
              label={STANDING_LABELS[key]}
              description={STANDING_DESCRIPTIONS[key]}
            />
          ))}
        </RadioGroup>
      </div>

      {/* Historique location courte durée */}
      <div>
        <FieldLabel required error={errors.currentRental}>
          Bien déjà loué en courte durée actuellement
        </FieldLabel>
        <RadioGroup
          value={state.currentRental || undefined}
          onValueChange={(value) =>
            update("currentRental", value as CurrentRental)
          }
          className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2.5"
        >
          {(Object.keys(CURRENT_RENTAL_LABELS) as CurrentRental[]).map(
            (key) => (
              <RadioCard
                key={key}
                value={key}
                label={CURRENT_RENTAL_LABELS[key]}
              />
            ),
          )}
        </RadioGroup>
      </div>
    </div>
  );
}

/* ========== ÉTAPE 4 ========== */

function Step4({ state, errors, update }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldLabel htmlFor="diag-firstname" required error={errors.firstName}>
          Prénom
          <Input
            id="diag-firstname"
            type="text"
            autoComplete="given-name"
            value={state.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={CREAM_INPUT_CLS}
            placeholder="Votre prénom"
          />
        </FieldLabel>

        <FieldLabel htmlFor="diag-lastname" required error={errors.lastName}>
          Nom
          <Input
            id="diag-lastname"
            type="text"
            autoComplete="family-name"
            value={state.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={CREAM_INPUT_CLS}
            placeholder="Votre nom"
          />
        </FieldLabel>
      </div>

      <FieldLabel htmlFor="diag-email" required error={errors.email}>
        Email
        <Input
          id="diag-email"
          type="email"
          autoComplete="email"
          value={state.email}
          onChange={(e) => update("email", e.target.value)}
          className={CREAM_INPUT_CLS}
          placeholder="vous@exemple.com"
        />
      </FieldLabel>

      <FieldLabel htmlFor="diag-phone" error={errors.phone}>
        Téléphone (optionnel)
        <Input
          id="diag-phone"
          type="tel"
          autoComplete="tel"
          value={state.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={CREAM_INPUT_CLS}
          placeholder="+33 6 XX XX XX XX"
        />
      </FieldLabel>

      <div className="mt-2 flex items-start gap-3">
        <Checkbox
          id="diag-rgpd"
          checked={state.rgpd}
          onCheckedChange={(checked) => update("rgpd", checked === true)}
          className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded-none border-gold-dark/50 data-checked:border-gold-dark data-checked:bg-gold-dark data-checked:text-cream"
        />
        <Label
          htmlFor="diag-rgpd"
          className="text-[12.5px] leading-[1.65] text-black/75 font-light cursor-pointer"
        >
          J&apos;accepte que H&amp;L Conciergerie traite mes données pour me
          fournir une estimation personnalisée et me recontacter dans le cadre
          de ma demande.{" "}
          <a
            href="/confidentialite"
            className="text-gold-dark underline underline-offset-2 hover:text-gold-dark/80"
          >
            Voir la politique de confidentialité
          </a>
          .
        </Label>
      </div>
      {errors.rgpd && (
        <p className="text-[12px] text-red-700 font-medium -mt-3">
          {errors.rgpd}
        </p>
      )}

      <div className="mt-2 flex items-start gap-2.5 text-[12px] text-black/55 leading-relaxed italic font-light">
        <Sparkles size={13} strokeWidth={1.5} className="mt-0.5 text-gold-dark shrink-0" />
        Nos équipes préparent votre estimation en moins de 15 secondes à partir
        des caractéristiques que vous venez de renseigner.
      </div>
    </div>
  );
}
