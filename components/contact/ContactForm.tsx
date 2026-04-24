"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/ui/GlassCard";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { cn } from "@/lib/utils";

type PropertyType = "" | "appartement" | "maison" | "villa";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: PropertyType;
  location: string;
  message: string;
  rgpd: boolean;
}

const INITIAL_STATE: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  propertyType: "",
  location: "",
  message: "",
  rgpd: false,
};

type Status = "idle" | "loading" | "success" | "error";

/**
 * Champ de formulaire réutilisable avec label on-brand H&L
 * (eyebrow uppercase tracking large au-dessus de l'input).
 */
function Field({
  label,
  htmlFor,
  required = false,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label
        htmlFor={htmlFor}
        className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium"
      >
        {label}
        {required && <span className="text-gold-dark/70 ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

/**
 * Formulaire de contact H&L. Gère l'état local, la validation
 * minimale côté client, l'appel API /api/contact et les toasts
 * de feedback. Carte glassmorphism cream pour rester cohérent
 * avec la direction artistique sur fond cream.
 */
export function ContactForm() {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validations de politesse côté client (le serveur valide à nouveau)
    if (
      !state.firstName.trim() ||
      !state.lastName.trim() ||
      !state.email.trim() ||
      !state.propertyType ||
      !state.location.trim() ||
      state.message.trim().length < 10
    ) {
      toast.error("Merci de compléter l'ensemble des champs requis.");
      return;
    }
    if (!state.rgpd) {
      toast.error(
        "Vous devez accepter notre politique de confidentialité pour nous écrire.",
      );
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setStatus("error");
        toast.error(
          data.error ??
            "Une erreur est survenue lors de l'envoi. Merci de réessayer.",
        );
        return;
      }

      setStatus("success");
      toast.success(
        "Votre demande a bien été reçue. Nous vous répondons sous 24 heures.",
      );
      setState(INITIAL_STATE);
    } catch {
      setStatus("error");
      toast.error(
        "Impossible d'envoyer votre message. Merci de réessayer ou de nous écrire directement à contact@hl-conciergerie.com.",
      );
    }
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <GlassCard
      variant="cream"
      className="p-8 md:p-10 lg:p-12"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* Ligne 1 : prénom + nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Prénom" htmlFor="contact-firstname" required>
            <Input
              id="contact-firstname"
              type="text"
              autoComplete="given-name"
              required
              value={state.firstName}
              onChange={(e) =>
                setState((s) => ({ ...s, firstName: e.target.value }))
              }
              disabled={isLoading}
              className="h-12 bg-white/50 border-gold-dark/30 text-black placeholder:text-black/35 focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px]"
              placeholder="Votre prénom"
            />
          </Field>

          <Field label="Nom" htmlFor="contact-lastname" required>
            <Input
              id="contact-lastname"
              type="text"
              autoComplete="family-name"
              required
              value={state.lastName}
              onChange={(e) =>
                setState((s) => ({ ...s, lastName: e.target.value }))
              }
              disabled={isLoading}
              className="h-12 bg-white/50 border-gold-dark/30 text-black placeholder:text-black/35 focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px]"
              placeholder="Votre nom"
            />
          </Field>
        </div>

        {/* Ligne 2 : email */}
        <Field label="Email" htmlFor="contact-email" required>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            value={state.email}
            onChange={(e) =>
              setState((s) => ({ ...s, email: e.target.value }))
            }
            disabled={isLoading}
            className="h-12 bg-white/50 border-gold-dark/30 text-black placeholder:text-black/35 focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px]"
            placeholder="vous@exemple.com"
          />
        </Field>

        {/* Ligne 3 : téléphone + type bien */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Téléphone (optionnel)" htmlFor="contact-phone">
            <Input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              value={state.phone}
              onChange={(e) =>
                setState((s) => ({ ...s, phone: e.target.value }))
              }
              disabled={isLoading}
              className="h-12 bg-white/50 border-gold-dark/30 text-black placeholder:text-black/35 focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px]"
              placeholder="+33 6 XX XX XX XX"
            />
          </Field>

          <Field label="Type de bien" required>
            <Select
              value={state.propertyType}
              onValueChange={(value) =>
                setState((s) => ({
                  ...s,
                  propertyType: (value ?? "") as PropertyType,
                }))
              }
              disabled={isLoading}
            >
              <SelectTrigger
                className={cn(
                  "h-12 w-full bg-white/50 border-gold-dark/30 text-black focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px] px-3.5",
                  !state.propertyType && "text-black/40",
                )}
              >
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent className="bg-cream border border-gold-dark/30 text-black rounded-none">
                <SelectItem
                  value="appartement"
                  className="text-black focus:bg-gold-dark/10 focus:text-black"
                >
                  Appartement
                </SelectItem>
                <SelectItem
                  value="maison"
                  className="text-black focus:bg-gold-dark/10 focus:text-black"
                >
                  Maison
                </SelectItem>
                <SelectItem
                  value="villa"
                  className="text-black focus:bg-gold-dark/10 focus:text-black"
                >
                  Villa
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Ligne 4 : localisation */}
        <Field label="Localisation du bien" htmlFor="contact-location" required>
          <Input
            id="contact-location"
            type="text"
            required
            value={state.location}
            onChange={(e) =>
              setState((s) => ({ ...s, location: e.target.value }))
            }
            disabled={isLoading}
            className="h-12 bg-white/50 border-gold-dark/30 text-black placeholder:text-black/35 focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px]"
            placeholder="Carré d'Or Nice, Saint-Laurent-du-Var / Cap 3000, Villefranche-sur-Mer..."
          />
        </Field>

        {/* Ligne 5 : message */}
        <Field label="Votre message" htmlFor="contact-message" required>
          <Textarea
            id="contact-message"
            required
            rows={5}
            value={state.message}
            onChange={(e) =>
              setState((s) => ({ ...s, message: e.target.value }))
            }
            disabled={isLoading}
            className="min-h-[140px] bg-white/50 border-gold-dark/30 text-black placeholder:text-black/35 focus-visible:border-gold-dark focus-visible:ring-gold-dark/30 rounded-none text-[15px] px-3.5 py-3 resize-y"
            placeholder="Parlez-nous de votre bien, de vos objectifs locatifs, du contexte. Nous répondons personnellement à chaque message."
          />
        </Field>

        {/* RGPD */}
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="contact-rgpd"
            checked={state.rgpd}
            onCheckedChange={(checked) =>
              setState((s) => ({ ...s, rgpd: checked === true }))
            }
            disabled={isLoading}
            className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded-none border-gold-dark/50 data-checked:border-gold-dark data-checked:bg-gold-dark data-checked:text-cream"
          />
          <Label
            htmlFor="contact-rgpd"
            className="text-[12.5px] leading-[1.6] text-black/70 font-light cursor-pointer"
          >
            J&apos;ai pris connaissance de la{" "}
            <a
              href="/confidentialite"
              className="text-gold-dark underline underline-offset-2 hover:text-gold-dark/80"
            >
              politique de confidentialité
            </a>{" "}
            de H&amp;L Conciergerie et j&apos;accepte que mes données soient
            utilisées pour me recontacter dans le cadre de ma demande.
          </Label>
        </div>

        {/* Submit */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <PremiumButton
            variant="primary"
            size="lg"
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} strokeWidth={1.8} className="animate-spin" />
                Envoi en cours
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={14} strokeWidth={1.8} />
                Message envoyé
              </>
            ) : (
              <>
                <Send size={14} strokeWidth={1.8} />
                Envoyer ma demande
              </>
            )}
          </PremiumButton>
          <p className="text-[11.5px] text-black/55 italic leading-relaxed">
            Réponse personnelle sous 24 heures, en toute confidentialité.
          </p>
        </div>
      </form>
    </GlassCard>
  );
}
