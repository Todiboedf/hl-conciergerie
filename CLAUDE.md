# CLAUDE.md — H&L Conciergerie

## Projet
Site internet vitrine premium pour **H&L Conciergerie** (Harmonie & Luxe), conciergerie haut de gamme spécialisée dans la gestion locative courte durée à Nice et sur la Côte d'Azur. Société : **HL GROUP SAS**, fondée par deux associés (Guillaume Haas — tech/marketing — et son associé — opérations/commercial). Lancement : Q2 2026.

**Objectif du site** : devenir le canal d'acquisition #1 de propriétaires (résidences secondaires, investisseurs locatifs, résidents en location d'opportunité) à Nice et sur la Côte d'Azur, avec un outil de diagnostic de rentabilité automatisé comme lead magnet principal.

**Promesse centrale** : *« Maximisez vos revenus locatifs sans vous en occuper. »*

## Stack technique
- **Framework** : Next.js 15 (App Router, TypeScript strict)
- **Styling** : Tailwind CSS 4 + shadcn/ui
- **Animations** : Framer Motion (obligatoire pour les transitions premium)
- **Icônes** : Lucide React — JAMAIS d'emojis dans l'UI
- **Fonts** : voir Design System
- **IA (diagnostic)** : Claude API (claude-haiku-4-5-20251001)
- **Email (formulaire contact)** : Resend
- **Analytics** : Microsoft Clarity + Vercel Analytics
- **Hosting** : Vercel
- **Domaine** : hlconciergerie.fr (à confirmer)

## Identité de marque (CRITIQUE)
H&L est une marque PREMIUM. Direction artistique sobre, intemporelle, hôtelière de prestige. Inspirations visuelles : Aman Resorts, Cheval Blanc, Rosewood Hotels, Le Bristol. Pas de tape-à-l'œil, pas de néon, pas de SaaS-tech. C'est de l'élégance discrète.

### Palette
- **Noir profond** : `#0A0A0A` (background principal)
- **Or mat signature** : `#C9A84C` (accent principal — utilisé avec parcimonie)
- **Or sombre** : `#8A7030` (accents secondaires, hover states)
- **Crème** : `#F5F2EA` (sections alternatives, contraste)
- **Blanc cassé** : `#F8F6F0` (textes sur fond noir)
- **Gris perle** : `#A8A8A8` (textes secondaires, métadonnées)
- **Bordures** : `#D4C89A` (très subtil, sur fonds clairs)

**Règle d'or** : l'or `#C9A84C` est rare. Il souligne, il ne sature jamais. Maximum 5% de la surface visible d'un écran.

### Typographie
- **Display (titres)** : **Cormorant Garamond** ou **Tenor Sans** — serif élégant, tracking large, weights 300/400/500. Tailles très contrastées (clamp 40-96px sur le hero).
- **Body** : **Inter** ou **Manrope** — sans-serif lisible, weights 300/400/500. Tailles 15-17px.
- **INTERDIT** : Roboto, Arial, system fonts par défaut, fonts geometric froides type Montserrat. On veut du caractère hôtelier, pas du tech-bro.
- **Tracking (letter-spacing)** : généreux sur les titres (`tracking-[0.05em]` à `tracking-[0.15em]`), normal sur le body.

### Design System (STRICT)
- **Theme principal** : alterne **dark** (sections hero, statement, CTA) et **light cream** (sections explicatives, services). Pas de blanc pur.
- **Glassmorphism** sur les cartes importantes : `backdrop-blur-md` + `border border-white/8` sur fond dark, ou `border border-[#D4C89A]/30` sur fond cream.
- **Glow effects** discrets : halos dorés très atténués (`opacity 0.08-0.15`) derrière les éléments clés (logos, CTAs majeurs).
- **Gradient** : utiliser des gradients radiaux subtils noir → noir profond pour donner de la profondeur, jamais de gradients vifs.
- **Noise/grain** : overlay grain léger (`opacity 0.03`) sur les sections sombres pour casser le plat numérique.
- **Bordures dorées fines** : `border-t border-[#C9A84C]/40` pour souligner les sections clés.

### Composants signature à créer
- `components/ui/GoldDivider.tsx` — diviseur horizontal or fin avec point central (motif récurrent dans l'identité)
- `components/ui/GlassCard.tsx` — carte glassmorphism premium réutilisable
- `components/ui/PremiumButton.tsx` — bouton signature avec hover glow doré
- `components/ui/HLMonogram.tsx` — composant logo "H&L" stylisé (réutilisable header/footer/cover)

## Architecture des fichiers

```
hl-conciergerie/
├── app/
│   ├── layout.tsx                    # Layout global, fonts, Clarity, dark theme par défaut
│   ├── page.tsx                      # Landing principale (sections dans l'ordre du funnel)
│   ├── proprietaires/page.tsx        # Page dédiée propriétaires
│   ├── voyageurs/page.tsx            # Page dédiée voyageurs
│   ├── services/page.tsx             # Détail des 3 packs Essentiel/Premium/Signature
│   ├── diagnostic/page.tsx           # ⭐ Outil de diagnostic de rentabilité (lead magnet #1)
│   ├── a-propos/page.tsx             # Histoire, équipe, valeurs
│   ├── contact/page.tsx              # Formulaire de contact
│   ├── mentions-legales/page.tsx
│   ├── confidentialite/page.tsx
│   └── api/
│       ├── diagnostic/route.ts       # Claude API → estimation rentabilité personnalisée
│       └── contact/route.ts          # Resend → email équipe H&L
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Promise.tsx               # "Maximisez vos revenus..."
│   │   ├── HowItWorks.tsx            # 3 étapes : signature → onboarding → gestion
│   │   ├── PacksPreview.tsx          # Aperçu 3 packs avec CTA "Voir les détails"
│   │   ├── DiagnosticTeaser.tsx      # CTA vers /diagnostic
│   │   ├── MarketStats.tsx           # Chiffres clés Nice (78% occupation, 132€ ADR, etc.)
│   │   ├── WhyHL.tsx                 # 5 avantages compétitifs
│   │   ├── Testimonials.tsx          # Placeholders beta au lancement
│   │   ├── FAQ.tsx                   # Accordion shadcn
│   │   └── CTAFinal.tsx              # CTA conversion final
│   ├── ui/                           # shadcn/ui + composants signature
│   ├── DiagnosticForm.tsx            # Formulaire diagnostic multi-étapes
│   ├── DiagnosticResult.tsx          # Affichage du résultat avec radar/cards
│   └── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── prompts/diagnostic.ts         # Méga-prompt Claude pour le diagnostic rentabilité
│   ├── claude.ts                     # Config Claude API
│   ├── benchmarks.ts                 # Données marché Nice (sources Airbtics, Welkeys)
│   ├── packs.ts                      # Données des 3 packs (single source of truth)
│   └── types.ts                      # Types TypeScript
├── public/
│   ├── logo-hl.svg
│   ├── logo-hl-dark.svg
│   ├── og-image.jpg                  # Open Graph
│   └── fonts/                        # Si fonts custom self-hosted
├── .env.local
└── .env.example
```

## Pages — contenu détaillé

### Landing principale (`app/page.tsx`)
Sections dans l'ordre, **NE PAS MODIFIER l'ordre** :

1. **Hero** — Asymétrique. Titre serif géant à gauche ("Maximisez vos revenus locatifs sans vous en occuper."), sous-titre 1 ligne, 2 CTAs ("Diagnostic gratuit" + "Découvrir nos packs"), à droite une visual : photo intérieur premium ou rendu monogramme H&L doré sur noir avec glow.
2. **Promise** — Section sombre, statement court 2-3 lignes sur la philosophie H&L, GoldDivider.
3. **MarketStats** — Bandeau avec 4 chiffres clés sourcés du business plan (78% occupation Nice, 132€ ADR, 37 000€ revenu médian annuel, top 1% France).
4. **HowItWorks** — 3 étapes simples : "Vous nous confiez votre bien" → "Nous l'optimisons" → "Vous percevez vos revenus". Chaque étape avec icône Lucide, titre serif, description courte.
5. **PacksPreview** — 3 cartes glassmorphism côte à côte (Essentiel 25% / Premium 28% / Signature 30%). Pack Premium en avant (carte plus haute, badge "Le plus choisi"). CTA "Voir le détail" → `/services`.
6. **DiagnosticTeaser** — Section en pleine largeur sombre avec gros CTA vers `/diagnostic`. Titre type "Combien votre bien peut-il vraiment rapporter ?". Sous-titre : "Obtenez une estimation personnalisée en 2 minutes."
7. **WhyHL** — 5 raisons (un par carte) : Premium local, Tech avancée, Conformité réglementaire, Réseau partenaires, Reporting transparent.
8. **Testimonials** — Placeholders beta : "Bientôt nos premiers retours propriétaires." Avec quote stylisée.
9. **FAQ** — Accordion 6 questions clés (commission, durée engagement, conformité, biens éligibles, reporting, événementiel).
10. **CTAFinal** — Section sombre, "Prêt à confier votre bien ?", deux CTAs.
11. **Footer** — HL GROUP SAS, mentions, réseaux, contact, newsletter.

### Page Diagnostic (`app/diagnostic/page.tsx`) — LE LEAD MAGNET
**C'est la pièce maîtresse du site.** Formulaire en 4 étapes (multi-step avec progress bar) :

**Étape 1 — Bien**
- Type : appartement / maison / villa (radio cards visuelles)
- Surface (m²) : input number
- Nombre de chambres : input number

**Étape 2 — Localisation**
- Quartier de Nice : select avec liste (Carré d'Or, Vieux Nice, Musiciens, Promenade des Anglais, Libération, Cimiez, Riquier, Magnan, Mont-Boron, Autre Nice, Villefranche, Beaulieu, Cap-Ferrat, Antibes, Cannes)
- Vue mer : oui / non
- Étage : RDC / 1-2 / 3-5 / 6+ / Dernier

**Étape 3 — Équipement**
- Climatisation : oui/non
- Balcon/terrasse : oui/non
- Parking : oui/non
- Piscine : oui/non
- Standing : standard / bon / haut / très haut

**Étape 4 — Contact**
- Prénom, nom, email, téléphone (optionnel)
- Checkbox RGPD

À la soumission : appel `POST /api/diagnostic` qui :
1. Construit un prompt enrichi à partir des données du formulaire + benchmarks Nice du fichier `lib/benchmarks.ts`
2. Appelle Claude Haiku pour générer une estimation JSON structurée
3. Retourne : `{ revenuMensuelEstime, revenuAnnuelEstime, tauxOccupationEstime, adrEstime, commissionHL, revenuNetProprietaire, packRecommande, justification, pointsForts[], optimisationsPossibles[] }`

Affichage du résultat avec animation reveal staggerée, cards premium, et CTA final "Discutons de votre bien" → page `/contact` pré-remplie.

### Page Services (`app/services/page.tsx`)
Détail complet des 3 packs avec tableau comparatif. Données dans `lib/packs.ts` (single source of truth, importé partout).

### Page À Propos (`app/a-propos/page.tsx`)
- Notre histoire (ton confidentiel, posé)
- Notre vision
- L'équipe (cards des 2 fondateurs, photos en NB ou rendu illustratif)
- Nos valeurs (4 valeurs avec icônes)
- Notre engagement conformité (mention Nice métropole, loi Le Meur)

### Page Contact (`app/contact/page.tsx`)
Formulaire simple avec Resend backend. Possibilité de pré-remplir depuis le diagnostic.

## Conventions de code
- TypeScript strict, pas de `any`.
- Composants fonctionnels React avec hooks.
- PascalCase pour les fichiers de composants, camelCase pour les utils.
- Tailwind CSS variables pour les couleurs du thème (jamais de valeurs hardcodées dans les classNames).
- Chaque section landing = fichier séparé dans `components/landing/`.
- Gestion d'erreur : try/catch systématique côté API, toast shadcn/ui côté client.
- Pas de `console.log` en production.
- Mobile-first responsive obligatoire.
- Lighthouse mobile cible > 90.

## Variables d'environnement requises
```
ANTHROPIC_API_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CLARITY_ID=
RESEND_FROM_EMAIL=contact@hlconciergerie.fr
RESEND_TO_EMAIL=contact@hlconciergerie.fr
```

## Règles métier — Diagnostic rentabilité
- Le prompt Claude doit injecter les benchmarks Nice : ADR médian 132€, occupation médiane 78%, revenu médian annuel 37 000€/bien (sources : Airbtics nov 2024 - oct 2025).
- L'estimation doit être réaliste, ni gonflée, ni timide. Fourchette basse-haute (-15% / +10%) plutôt qu'un chiffre unique.
- La commission H&L à appliquer dans le calcul dépend du pack recommandé (25% / 28% / 30%).
- Le pack recommandé dépend du standing du bien : standard → Essentiel, bon/haut → Premium, très haut → Signature.
- L'estimation doit citer 2-3 facteurs spécifiques au bien dans la justification (ex : "votre vue mer dans le Carré d'Or justifie un ADR supérieur à la médiane").
- **Aucune promesse ferme** : toujours formuler en "estimation indicative basée sur les données du marché niçois".

## Règles Design Avancées (Frontend Premium — non négociables)

### Typographie
- INTERDIT : Inter en titres, Roboto, Arial, system fonts génériques, fonts géométriques type Montserrat (trop SaaS-tech).
- OBLIGATOIRE : font display serif élégante (Cormorant Garamond, Tenor Sans, Playfair Display) pour les titres + sans-serif raffinée (Inter ou Manrope) pour le body.
- Tracking généreux sur les titres `tracking-[0.05em]` minimum, jusqu'à `tracking-[0.15em]` sur les eyebrow labels.
- Tailles très contrastées : titres `clamp(40px, 6vw, 96px)`, body `15-17px`, micro-texts `12-13px` en uppercase tracking large.

### Couleurs & Profondeur
- Dark theme `#0A0A0A` + accent or `#C9A84C` = base.
- Alterner avec sections cream `#F5F2EA` pour rythme visuel.
- Glow orbs dorés `opacity-10` à `opacity-15` derrière les éléments clés.
- Glassmorphism sur les cartes premium : `backdrop-blur-md bg-white/5 border border-white/10` (fond noir) ou `bg-white/40 border border-[#D4C89A]/30` (fond cream).
- Toutes les couleurs en CSS variables Tailwind (`--gold`, `--gold-dark`, `--cream`, etc.).

### Animations & Motion
- Framer Motion obligatoire sur : hero (fade-up staggered), apparition des sections au scroll (Intersection Observer), hover des cards (scale 1.02 + glow), micro-interactions des boutons.
- Délais staggered : 0.1s, 0.2s, 0.3s pour les éléments du hero.
- Scroll-triggered : utiliser `whileInView` avec `viewport={{ once: true, margin: "-100px" }}`.
- **Pas de jank** : `transform` et `opacity` uniquement, jamais d'animation sur `width/height/top/left`.

### Composition spatiale
- Casser la grille parfois : éléments qui débordent légèrement, asymétrie hero contrôlée (texte gauche, visual droite qui dépasse), overlap entre sections.
- Negative space généreux : `py-24` à `py-32` minimum entre sections.
- Le hero peut faire `min-h-screen` avec composition asymétrique 60/40.

### Fonds & Textures
- INTERDIT : fond plat uni noir ou cream sans aucune texture.
- OBLIGATOIRE (au moins 3 sur l'ensemble du site) :
  - Gradient radial très subtil dans le hero (du centre vers les bords)
  - Noise/grain SVG overlay `opacity-[0.03]` sur les sections sombres
  - Pattern géométrique abstrait (points dorés très espacés) en fond d'une section
  - Glassmorphism sur au moins 2 séries de cards
  - Glow orbs dorés derrière les CTAs majeurs et le hero

### Anti-patterns (JAMAIS faire ça)
- Dégradés d'or trop saturés ou jaune fluo — l'or doit rester mat et discret
- Boutons plats sans hover effect — toujours glow ou shift de couleur
- Cards identiques et alignées au cordeau — varier hauteurs, ajouter hover effect
- Emojis dans l'UI — Lucide icons exclusivement
- Photos de stock évidentes (homme en costume serrant la main) — préférer photos d'intérieurs léchés, abstraits texturés, ou rendus illustratifs
- Sections qui flottent sans transition — utiliser GoldDivider ou changement de fond progressif
- "Lorem ipsum" même temporairement — toujours du contenu réel français premium

## Qualité attendue
- Lighthouse mobile > 90
- Lighthouse desktop > 95
- Responsive mobile-first impeccable (test sur 375px, 768px, 1024px, 1440px, 1920px)
- Animations fluides 60fps
- Aucun warning console
- Build Next.js sans erreur
- Le site doit donner l'impression d'un hôtel 5* — pas d'une startup tech
- Chaque section doit pouvoir être screenshotée et postée sur Instagram premium sans retouche

## Ce qui n'est PAS dans le V1 (ne pas implémenter)
- Espace propriétaire authentifié → V2
- Blog / SEO content → V2
- Multilingue (anglais, italien, allemand) → V2
- Intégration channel manager → V3 (sera dans le projet H&L Tools séparé)

## Roadmap V2 — Réservation directe
Décision fondateur (2026-04-16) : H&L ouvrira un canal de réservation directe sur le site, en parallèle des OTA (Airbnb, Booking, Vrbo). Chantier majeur V2, branche dédiée.

**Périmètre V2 :**
- Fiches biens complètes (galerie, descriptif, équipements, tarifs dynamiques)
- Calendrier temps réel synchronisé avec le channel manager
- Paiement en ligne via Stripe (acompte + solde, caution, taxe de séjour)
- Contrat voyageur généré et signé automatiquement à la réservation
- Dashboard réservation côté voyageur (récapitulatif, check-in, instructions)

**Prérequis avant démarrage :**
- Choix du channel manager : Smoobu vs Hospitable (arbitrage à trancher)
- Contrat Stripe ouvert et validé (KYC HL GROUP SAS)
- CGV voyageur rédigées et validées juridiquement
- Template fiche bien défini (structure, photos, copy, SEO)

**Priorité :** après livraison V1 du site, avant Q4 2026.

**Impact immédiat sur le V1 :** les pages `/voyageurs` et fiches biens restent des placeholders on-brand. Aucune promesse de réservation directe ou de paiement en ligne dans le copy actuel — on annonce seulement la venue prochaine.
