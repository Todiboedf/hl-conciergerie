# H&L Conciergerie

Site vitrine premium pour HL GROUP SAS, conciergerie haut de gamme à Nice et sur la Côte d'Azur.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4**
- **Framer Motion** — animations premium
- **Lucide React** — icônes
- **Resend** — emails transactionnels (formulaire contact)
- **Anthropic Claude SDK** — moteur du diagnostic de rentabilité
- **shadcn/ui** + **Base UI** — composants accessibles (accordion, form, toasts)

## Pages

| Route                 | Description                                    |
| --------------------- | ---------------------------------------------- |
| `/`                   | Landing principale (hero, packs, diagnostic)   |
| `/services`           | Détail des 3 packs (Essentiel, Premium, Signature) et tableau comparatif |
| `/a-propos`           | Histoire, fondateurs Haas & Lieater, valeurs, conformité |
| `/contact`            | Formulaire de contact et infos directes        |
| `/diagnostic`         | Outil de diagnostic de rentabilité (bientôt)   |
| `/proprietaires`      | Espace propriétaires (bientôt)                 |
| `/voyageurs`          | Espace voyageurs (bientôt)                     |
| `/mentions-legales`   | Mentions légales                               |
| `/confidentialite`    | Politique de confidentialité                   |
| `/cgv`                | Conditions générales de vente                  |

## Développement

```bash
npm install          # installe les dépendances
npm run dev          # lance le serveur de développement sur http://localhost:3000
npm run build        # build de production
npm run lint         # vérification ESLint
npm run check        # lint + build enchaînés (à lancer avant chaque push)
```

## Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner les valeurs si besoin. Le site fonctionne sans aucune variable en développement — le formulaire de contact utilise un fallback local quand `RESEND_API_KEY` n'est pas défini, et le diagnostic Claude est pour l'instant en placeholder.

| Variable                 | Usage                                                      |
| ------------------------ | ---------------------------------------------------------- |
| `ANTHROPIC_API_KEY`      | Claude API, moteur du diagnostic de rentabilité            |
| `RESEND_API_KEY`         | Resend, emails du formulaire de contact                    |
| `RESEND_FROM_EMAIL`      | Expéditeur des emails (par défaut `onboarding@resend.dev`) |
| `RESEND_TO_EMAIL`        | Adresse de réception des demandes de contact               |
| `NEXT_PUBLIC_SITE_URL`   | URL publique du site, utilisée pour les meta Open Graph    |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity, analytics comportementales (optionnel)  |

## Déploiement

Le site est prévu pour un déploiement sur **Vercel** (région `cdg1`, Paris). Aucune variable d'environnement n'est obligatoire pour un premier déploiement : les fallbacks permettent une mise en ligne immédiate sur une URL Vercel gratuite, puis un ajout progressif des clés API et du domaine custom.

```bash
# Premier déploiement
vercel

# Mises à jour
git push             # déploiement automatique via l'intégration Git de Vercel
```

---

© HL GROUP SAS, tous droits réservés.
