"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CalendarClock } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { fadeUp, staggerContainer, viewInProps } from "@/lib/motion";

/**
 * Section principale de la page /contact. Fond cream.
 * Grid 12 cols desktop : 5/12 infos directes à gauche, 7/12 form à droite.
 */
export function ContactSection() {
  return (
    <section
      id="formulaire"
      className="relative isolate overflow-hidden bg-cream text-black"
    >
      <motion.div
        {...viewInProps}
        variants={staggerContainer}
        className="container-hl relative z-10 py-24 md:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche : infos directes */}
          <div className="lg:col-span-5">
            <motion.span
              variants={fadeUp}
              className="eyebrow-cream block"
            >
              Nous joindre directement
            </motion.span>

            <motion.div variants={fadeUp} className="mt-6">
              <GoldDivider width="sm" align="left" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display font-light text-black leading-[1.1] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(30px, 3.5vw, 44px)",
                textWrap: "balance",
              }}
            >
              La porte est ouverte.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[15px] md:text-[16px] leading-[1.8] text-black/65 font-light"
              style={{ maxWidth: "440px", textWrap: "pretty" }}
            >
              Vous préférez un contact direct&#8239;? Écrivez-nous, appelez-nous
              ou prenez rendez-vous. L&apos;un des fondateurs vous répondra
              personnellement.
            </motion.p>

            {/* Contacts */}
            <motion.ul variants={staggerContainer} className="mt-10 space-y-6">
              <motion.li variants={fadeUp} className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center border border-gold-dark/40 bg-white/40 shrink-0">
                  <Mail size={16} strokeWidth={1.5} className="text-gold-dark" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                    Email
                  </p>
                  <a
                    href="mailto:contact@hlconciergerie.fr"
                    className="mt-1 block text-[15px] text-black hover:text-gold-dark transition-colors"
                  >
                    contact@hlconciergerie.fr
                  </a>
                </div>
              </motion.li>

              <motion.li variants={fadeUp} className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center border border-gold-dark/40 bg-white/40 shrink-0">
                  <Phone size={16} strokeWidth={1.5} className="text-gold-dark" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                    Téléphone
                  </p>
                  <p className="mt-1 text-[15px] text-black">
                    +33 (0) 4 XX XX XX XX
                  </p>
                  <p className="mt-1 text-[12px] text-black/55 italic">
                    Du lundi au samedi, de 9h à 19h
                  </p>
                </div>
              </motion.li>

              <motion.li variants={fadeUp} className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center border border-gold-dark/40 bg-white/40 shrink-0">
                  <MapPin size={16} strokeWidth={1.5} className="text-gold-dark" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                    Adresse
                  </p>
                  <p className="mt-1 text-[15px] text-black leading-snug">
                    Nice, Alpes-Maritimes
                    <br />
                    Côte d&apos;Azur, France
                  </p>
                </div>
              </motion.li>
            </motion.ul>

            {/* Prendre rendez-vous */}
            <motion.div
              variants={fadeUp}
              className="mt-12 pt-10 border-t border-gold-dark/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <CalendarClock
                  size={16}
                  strokeWidth={1.5}
                  className="text-gold-dark"
                />
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                  Ou prenez rendez-vous directement
                </span>
              </div>
              <p className="mb-6 text-[14px] leading-[1.7] text-black/65 font-light">
                Choisissez un créneau de 30 minutes pour un premier échange.
                Visio ou rendez-vous physique dans nos bureaux à Nice, au
                choix.
              </p>
              <PremiumButton
                href="#formulaire"
                variant="secondary"
                size="md"
                onCream
                className="w-full sm:w-auto"
              >
                Réserver un créneau
              </PremiumButton>
              <p className="mt-3 text-[11px] italic text-black/45">
                Agenda partagé disponible prochainement
              </p>
            </motion.div>

            {/* Mini-bullets */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-black/50"
            >
              <span>Réponse sous 24h</span>
              <span className="text-gold-dark">·</span>
              <span>Physique ou visio</span>
              <span className="text-gold-dark">·</span>
              <span>Sans engagement</span>
            </motion.div>
          </div>

          {/* Colonne droite : form */}
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
