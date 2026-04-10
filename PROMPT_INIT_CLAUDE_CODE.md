# PROMPT D'INITIALISATION — CLAUDE CODE — H&L CONCIERGERIE

> **Mode d'emploi** : tu es dans un dossier vide nommé `hl-conciergerie/`. Le fichier `CLAUDE.md` est déjà à la racine. Ouvre Claude Code dans ce dossier, et colle le prompt ci-dessous EN ENTIER comme premier message de la session.

---

## PROMPT À COLLER

```
Bonjour Claude,

Je lance le projet H&L Conciergerie — site internet vitrine premium pour ma société de gestion locative haut de gamme à Nice. Tout le contexte est dans CLAUDE.md à la racine, lis-le intégralement avant toute action.

CONTEXTE BUSINESS RAPIDE :
- HL GROUP SAS, conciergerie premium courte durée à Nice et Côte d'Azur
- 2 fondateurs (moi = tech/marketing, mon associé = ops/commercial)
- Lancement Q2 2026
- Identité noir & or sobre, hôtelier de prestige (penser Aman, Rosewood, Cheval Blanc)
- 3 packs : Essentiel 25%, Premium 28%, Signature 30%
- Outil de diagnostic de rentabilité automatisé via Claude API = lead magnet #1
- Le site doit ressembler à un hôtel 5*, PAS à une startup tech

AVANT D'ÉCRIRE LA MOINDRE LIGNE DE CODE :

1. Lis CLAUDE.md en entier (c'est ta source de vérité, design system inclus).

2. Vérifie si le skill "frontend-design" est disponible dans /mnt/skills/public/frontend-design/SKILL.md ou équivalent. Si oui, lis-le AVANT de coder. C'est critique pour respecter mes standards de qualité visuelle.

3. Confirme-moi que tu as bien compris :
   - Le positionnement premium (citations exactes du CLAUDE.md sur "Aman", "Cheval Blanc")
   - La palette exacte (4 couleurs hex que je veux te voir répéter)
   - Les fonts cibles (display + body)
   - L'ordre des sections de la landing page (10 sections numérotées)
   - Les pages à créer (liste exhaustive)
   - Les anti-patterns à éviter (cite-moi en 3)

4. Une fois confirmé, propose-moi un plan d'exécution en 4 sessions de travail :
   - Session 1 : Setup projet + design system + Hero + Footer + Header
   - Session 2 : Reste de la landing page (sections 2 à 11)
   - Session 3 : Page Services + Page À Propos + Page Contact
   - Session 4 : Outil de diagnostic complet (page + form multi-step + API route Claude)

5. Pour CETTE PREMIÈRE SESSION, attaque uniquement Session 1 :
   - `npx create-next-app@latest .` avec TypeScript, Tailwind, App Router, sans src/, sans Turbopack pour l'instant
   - Installer dépendances : framer-motion, lucide-react, shadcn/ui (init), resend, @anthropic-ai/sdk
   - Configurer Tailwind avec mes CSS variables exactes (--gold #C9A84C, --gold-dark #8A7030, --black #0A0A0A, --cream #F5F2EA, --pearl #A8A8A8, --bone #F8F6F0)
   - Configurer les fonts depuis Google Fonts via next/font (Cormorant Garamond pour display, Inter pour body)
   - Créer .env.example avec toutes les variables listées dans CLAUDE.md
   - Créer la structure de dossiers complète (lib/, components/landing/, components/ui/, app/...)
   - Créer les composants signature obligatoires : GoldDivider, GlassCard, PremiumButton, HLMonogram
   - Créer Header.tsx avec nav transparente devenant solide au scroll
   - Créer Footer.tsx complet avec mentions HL GROUP SAS
   - Créer Hero.tsx selon les specs CLAUDE.md (asymétrique, serif géant, 2 CTAs, glow orb doré, grain overlay)
   - Tester `npm run dev` et faire un git init + premier commit "feat: initial setup + hero"

CONTRAINTES :
- Pas d'emojis dans le code (Lucide icons only)
- Pas de "lorem ipsum", écris du vrai contenu français premium
- Tous les composants doivent être typés strict (pas de any)
- Mobile-first responsive
- Animations Framer Motion sur le Hero (staggered fade-up)
- Aucune photo de stock à ce stade — utilise des placeholders abstraits texturés (gradient + grain) ou le monogramme HL doré

OBJECTIF FIN DE SESSION 1 : je dois pouvoir lancer `npm run dev`, ouvrir localhost:3000, et voir un Hero qui me fait dire "ok, ça ressemble à du Cheval Blanc, on est dans le bon univers". Pas le site complet, mais une fondation pixel-perfect.

Vas-y. Lis CLAUDE.md, lis le skill frontend-design si dispo, confirme ta compréhension, propose le plan, puis attaque la Session 1.
```

---

## RAPPELS PRATIQUES

**Si Claude Code te répond "je n'ai pas accès au fichier CLAUDE.md"**, c'est que tu as lancé Claude Code depuis un dossier qui ne contient pas le fichier. Vérifie avec `pwd` puis `ls` que tu vois bien `CLAUDE.md`.

**Si tu veux interrompre Claude Code en pleine action** : `Esc` (ou `Ctrl+C` selon la version).

**Pour valider une commande qu'il te propose** : tape `1` puis Entrée (ou la lettre correspondante au choix "always allow this command").

**Pour la session suivante** : pas besoin de re-coller tout le prompt. Démarre simplement avec :
```
Salut Claude. On reprend H&L Conciergerie. Lis CLAUDE.md, fais un git status pour voir où on en est, et attaque la Session 2 (le reste de la landing page : sections Promise, MarketStats, HowItWorks, PacksPreview, DiagnosticTeaser, WhyHL, Testimonials, FAQ, CTAFinal).
```

**Quand quelque chose ne te plaît pas visuellement**, sois précis : pas "c'est moche", mais "le hero manque de hauteur, agrandis le titre à clamp(56px, 7vw, 110px) et ajoute 40px de padding-top" — Claude Code exécute des instructions précises beaucoup mieux que des feedbacks vagues.

**Avant chaque commit**, demande-lui de faire `npm run build` pour vérifier qu'il n'y a pas d'erreur de production.
