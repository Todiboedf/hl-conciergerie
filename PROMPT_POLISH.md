# Passe de polish globale H&L Conciergerie

Sessions 1, 2, 3 validées. On fait une PASSE DE POLISH GLOBALE pour corriger les bugs visuels, harmoniser la landing au niveau qualitatif de /services et /a-propos, ET réécrire /a-propos avec les vrais fondateurs Guillaume Haas et Henry Lieater.

Ne touche PAS à /diagnostic (reste ComingSoon jusqu'à Session 4).
Ne touche PAS à /cgv, /mentions-legales, /confidentialite sauf typos.

## PARTIE A — BUGS VISUELS A CORRIGER

### A1. Hero landing, chevauchement scroll indicator

Le micro-label "ESTIMATION PERSONNALISEE · 2 MINUTES · SANS ENGAGEMENT" se chevauche avec l'indicateur "DECOUVRIR" de scroll.
Fix : deplace le micro-label pour qu'il soit positionne ENTRE la mini-explication doree "Recevez en 2 minutes..." et les 2 CTAs. L'indicateur DECOUVRIR reste seul en bas du viewport centre horizontalement sans chevauchement possible.

### A2. MarketStats, source "AIRONA" au lieu de "AIRDNA"

Sur la 4eme card (9 400+ annonces), corrige "AIRONA" en "AIRDNA" (la vraie societe). Verifie lib/benchmarks.ts et components/landing/MarketStats.tsx.

### A3. DiagnosticTeaser, text-balance rigide

Le titre "Combien votre bien peut-il vraiment rapporter a Nice ?" a un point d'interrogation orphelin. Fix : text-wrap:pretty au lieu de balance, ou br manuel, ou retire text-balance.

### A4. CTAFinal, meme probleme balance

Sur "Confiez votre bien a une maison qui le merite.", "le merite." deborde. Meme fix que A3.

### A5. Footer, transition et responsive

Verifie pt-20 a pt-24 de transition avec la section precedente, 4 colonnes bien alignees (mobile 1 col, tablette 2 col, desktop 4 col).

### A6. Accordion FAQ /services, verifier le rendu

Verifie que les items s'affichent correctement (question visible, chevron, clic revele reponse).

### A7. Section CTA finale /services, verification layout

Le bloc "Un accompagnement sur mesure" doit avoir titre et sous-titre en entier, pas tronque.

## PARTIE B — HARMONISATION QUALITATIVE DE LA LANDING

### B1. Hero landing, mini-card preuve sociale

Ajoute sous le cadre droit du Hero une mini-card glassmorphism sobre :
- "37 000 €" en serif Cormorant gold-dark 40-48px
- "revenu median annuel d'un bien gere a Nice" en Inter 12px pearl letterspaced
- "Source : Airbtics 2025" en italique 10px pearl/60

Max 280px de large, visuellement secondaire par rapport au cadre logo.

### B2. Promise, 3 sous-bullets concrets apres la citation

Garde la citation, ajoute apres 3 sous-bullets horizontaux avec icones Lucide gold :
- BedDouble : "Comme une suite" · "Chaque bien prepare avec l'oeil d'un hotelier"
- Users : "Comme un hote" · "Chaque voyageur accueilli personnellement"
- Handshake : "Comme un partenaire" · "Chaque proprietaire informe en toute transparence"

Subtils, pearl/80.

### B3. MarketStats, sous-titre plus incarne

Remplace le sous-titre actuel par :
"Plus de dix millions de visiteurs chaque annee, une saison qui s'etend de fevrier a octobre, un marche locatif courte duree parmi les plus matures d'Europe. Ces chiffres, sources sur les benchmarks referents du secteur, expliquent pourquoi Nice attire autant d'investisseurs, et pourquoi la gestion y fait toute la difference."

### B4. HowItWorks, enrichir l'etape III

Remplace la description de l'etape III par :
"Chaque mois, vos revenus nets sont reverses sur votre compte, accompagnes d'un reporting detaille. Vous savez exactement ce qui s'est passe dans votre bien : qui est venu, combien ils ont paye, quelles maintenances ont ete effectuees, quelles optimisations sont envisagees pour le mois suivant. La transparence est totale, la tranquillite aussi."

### B5. PacksPreview, mini-teaser rendement sur carte Premium uniquement

Sous la liste features et au-dessus du bouton "VOIR LE DETAIL" de la carte Premium :
- Eyebrow gold-dark 10px letterspaced : "EXEMPLE DE RENDEMENT"
- "T3 vue mer · Carre d'Or" en serif 15px
- "3 600 a 4 400 €" en serif gold-dark 22-26px
- "net proprietaire / mois" en Inter 11px pearl

4 lignes centrees avec separateurs subtils. Reprends les chiffres Premium de /services pour coherence.

### B6. DiagnosticTeaser, 3 bullets plus concrets

Remplace par :
- MapPin "Analyse par quartier" : "Carre d'Or, Mont-Boron, Liberation : chaque zone a son potentiel"
- TrendingUp "Yield saisonnier" : "Ponderation haute, moyenne et basse saison incluse"
- FileText "Pack recommande" : "Essentiel, Premium ou Signature selon votre bien"

### B7. WhyHL, reequilibrer les titres

1. "Maison locale et exigeante" reste tel quel
2. "Technologie native" devient "Une technologie au service du detail"
3. "Conformite absolue" devient "La conformite comme socle"
4. "Reseau partenaires selectionne" devient "Un reseau choisi avec exigence"
5. "Reporting transparent" devient "Une transparence totale, sans zone d'ombre"

### B8. Testimonials, texte plus incarne

Remplace par :
"H&L Conciergerie accueille cette saison ses premiers proprietaires fondateurs. Leurs temoignages seront publies ici dans les semaines qui viennent, et nous sommes deja honores de la confiance qu'ils nous portent. En attendant, nous serons heureux de vous presenter notre maison et notre methode lors d'un rendez-vous personnalise, a notre bureau ou en visioconference."

### B9. FAQ landing, reponse commission

Verifie la reponse a "Quelle est votre commission et que comprend-elle exactement ?". Doit mentionner les 3 taux (25/28/30%), preciser revenus nets (hors taxes et frais plateformes), rappeler ce qui est inclus (menage, linge, coordination) vs facture en sus (consommables, maintenance lourde). Clarte d'un conseiller bancaire premium.

### B10. CTAFinal, 3 mini-pictos reassurance finale

Sous les 2 CTAs et au-dessus de "Reponse personnelle sous 24 heures...", ajoute 3 mini-pictos horizontaux icones Lucide gold 16px + texte 12px pearl letterspaced :
- ShieldCheck "Conformite Nice 2026"
- Lock "Donnees confidentielles"
- Sparkles "Zero engagement"

Espaces, centres horizontalement.

## PARTIE B-BIS — REECRITURE /a-propos AVEC VRAIS FONDATEURS

IMPORTANT : La page /a-propos a ete creee en Session 3 avec placeholder. Il faut maintenant injecter les VRAIS fondateurs et la vraie histoire.

### CONTEXTE FONDATEURS

H&L Conciergerie a ete fondee par deux amis :

1. Guillaume Haas, co-fondateur, responsable tech, marketing, strategie et developpement. Le H de H&L vient de son nom de famille.
2. Henry Lieater, co-fondateur, responsable operations, relation proprietaires, coordination terrain et execution quotidienne. Le L de H&L vient de son nom de famille.

Les deux fondateurs ont grandi au contact de l'immobilier : leurs parents respectifs evoluent depuis plusieurs decennies dans le secteur immobilier de la Cote d'Azur (gestion, transaction, investissement). Cette exposition precoce leur a transmis un double heritage : la rigueur operationnelle d'un metier ou rien ne s'improvise, et le sens du service qui distingue les maisons de gestion les plus respectees.

Le nom "H&L" porte leurs deux initiales (Haas et Lieater) et se lit aussi comme "Harmonie & Luxe", deux valeurs qui resument leur promesse : une gestion locative ou l'execution est sans friction pour le proprietaire, et ou l'experience offerte aux voyageurs est constamment pensee comme celle d'un hotel cinq etoiles.

Ce qui les a decides a fonder H&L en 2026 : le constat qu'a Nice, le marche de la gestion locative courte duree est partage entre des plateformes automatisees qui delivrent un service standardise sans attention portee au bien, et des acteurs locaux traditionnels qui peinent a professionnaliser leurs outils et leur communication. Entre les deux, une place etait a prendre pour une maison qui combine la technologie native (channel management, pricing dynamique, reporting en temps reel) et la proximite terrain d'une conciergerie nicoise. Cette place, c'est celle que H&L a choisi d'occuper.

### INSTRUCTIONS DE REECRITURE /a-propos

**1. HERO /a-propos**

Verifie que le h1 a un italique dore signature (ex : "Une maison fondee sur l'exigence." avec italique dore sur "l'exigence"). Ajoute l'italique si absent.

**2. SECTION "Notre histoire" / "Genese de H&L"**

Remplace le contenu generique par un recit en 4 paragraphes :

- P1 : Origine du nom H&L (Haas et Lieater, double sens Harmonie & Luxe). Deux amis, familles de l'immobilier Cote d'Azur depuis plusieurs decennies.
- P2 : Constat commun du marche nicois. Entre plateformes automatisees et acteurs locaux traditionnels, place a prendre pour une maison qui allie technologie native et proximite terrain.
- P3 : Leur complementarite. Guillaume : dimension tech, marketing, strategie (outils proprietaires, communication, developpement commercial). Henry : dimension operationnelle, relation proprietaires et execution quotidienne (coordination interventions, accueil voyageurs, suivi partenaires).
- P4 : Leur engagement. H&L n'est pas une plateforme qui prend autant de biens que possible. Maison qui choisit soigneusement ses proprietaires, limite volontairement son nombre de mandats, objectif devenir reference de la gestion locative premium a Nice et Cote d'Azur.

Cote droit : GlassCard avec citation fondatrice en italique Cormorant 22-26px pearl :

"Nous avons grandi avec l'immobilier. Nous savons ce que c'est qu'un bien bien tenu et ce que c'est qu'un bien mal gere. H&L est la maison que nous aurions voulu trouver pour nos propres parents."

Attribution Inter 12px gold letterspaced : "GUILLAUME HAAS & HENRY LIEATER · CO-FONDATEURS"

**3. NOUVELLE SECTION "Le nom H&L"**

Entre "Notre histoire" et "Les deux fondateurs", ajoute une section dediee au nom. py-20, container max-width 800px centre :

- Eyebrow "LE NOM"
- Titre h2 serif : "Deux lettres, deux heritages, une maison."
- Texte en 2 courts paragraphes :

"H&L porte les initiales de ses deux co-fondateurs, Haas et Lieater. Deux amis, deux familles de l'immobilier azureen, deux sensibilites complementaires."

"Mais H&L se lit aussi comme Harmonie & Luxe. L'harmonie, c'est celle qui s'installe quand un proprietaire peut enfin confier son bien en toute confiance. Le luxe, c'est celui d'un service pense avec l'exigence d'un hotel de prestige. Les deux reunies definissent notre promesse."

- GoldDivider final

**4. SECTION "Notre equipe" / "Les deux fondateurs"**

Remplace les placeholders par 2 cards fondateurs en grid 2-col desktop (empilees mobile) :

CARD 1 : Guillaume Haas
- Monogramme HLLogo gold centre dans cercle borde gold ~120px
- Nom : "Guillaume Haas" en serif Cormorant 28px bone
- Role : "CO-FONDATEUR · DIRECTION TECH & MARKETING" en Inter gold 12px letterspaced
- Description Inter 14.5px pearl :

"Guillaume dirige la partie technologique et marketing de H&L. Il est responsable des outils proprietaires de la maison (channel management, pricing dynamique, reporting en temps reel, diagnostic de rentabilite), de la strategie de positionnement et du developpement commercial. Issu d'une famille profondement ancree dans l'immobilier azureen, il a nourri tres tot une conviction : les meilleurs outils ne remplacent jamais l'attention humaine, mais ils en decuplent la valeur quand ils sont penses intelligemment."

CARD 2 : Henry Lieater
- Meme traitement visuel
- Nom : "Henry Lieater"
- Role : "CO-FONDATEUR · DIRECTION OPERATIONS & RELATION PROPRIETAIRES"
- Description :

"Henry dirige la partie operationnelle et la relation proprietaires. Il orchestre quotidiennement les interventions terrain, l'accueil des voyageurs, la coordination des partenaires (menage, maintenance, artisans) et la qualite de l'experience livree dans chaque bien. Comme Guillaume, il a grandi au contact du secteur immobilier de la Cote d'Azur. Il porte l'exigence hoteliere dans le quotidien operationnel de la maison, avec une conviction simple : ce sont les details qu'on soigne qui distinguent une bonne gestion d'une excellente gestion."

**5. SECTION "Nos valeurs"**

Verifie que les 4 valeurs actuelles (Exigence/Gem, Transparence/Eye, Proximite/MapPin, Respect/Heart) sont bien presentes. Renforce si generique.

**6. SECTION "Conformite"**

Reste comme en Session 3 (4 points reglementaires). Deja bien.

## PARTIE C — COHERENCE GLOBALE ENTRE PAGES

### C1. Italiques dores uniformises dans h1 et h2

Verifie que chaque page (hors legal) a une signature italique doree dans son h1 ou h2 principal.

### C2. Sous-titres uniformises

17-18px, max-width 700px, color pearl, line-height 1.6 sur landing et pages secondaires.

### C3. Eyebrows uniformises

Inter 11px, weight 500, tracking 0.22em, uppercase, gold sur fond noir, gold-dark sur fond cream.

### C4. GoldDividers de transition

Chaque transition entre sections doit avoir un GoldDivider center avec point central. Aucune transition seche.

### C5. Header, etat actif sur page courante

Quand on est sur /services, /a-propos, /contact, /diagnostic, le lien correspondant dans Header doit avoir : couleur gold (au lieu de pearl) + underline gold fin 1px sous le label. Utilise usePathname() de next/navigation.

### C6. Footer, verifier les ancres

Liens "Pack Essentiel", "Pack Premium", "Pack Signature" doivent pointer vers /services#essentiel, /services#premium, /services#signature. Verifie que les id existent sur les sections de /services.

## PARTIE D — DETAILS DE FINITION MICRO

### D1. PremiumButton, hover state primary

translate-y -1px, shadow-[0_8px_24px_-8px_rgba(201,168,76,0.4)], scale-[1.015]. Transition 200ms easing [0.22, 1, 0.36, 1]. Subtil.

### D2. Cards (packs, raisons, etapes), hover state

Bordure gold legerement plus visible, translate-y -2px, transition 300ms. @media (hover: hover) uniquement.

### D3. Liens Footer, hover gold

Tous les liens footer : pearl vers gold en 200ms au hover.

### D4. Scrollbar custom

Thumb gold/30, track transparent, width 8px, hover thumb gold/60.

### D5. Selection de texte

Background gold/30, color noir.

### D6. Cursor pointer

Sur tous les PremiumButton et cards cliquables.

### D7. Focus states accessibilite

Tous les elements interactifs : focus ring gold, ring-offset 2px, ring-offset-color noir.

## PROCESSUS

1. Commence par les bugs critiques (Partie A)
2. Puis Partie B (harmonisation landing)
3. Puis Partie B-BIS (reecriture /a-propos) — PRIORITE HAUTE, c'est l'ame de la maison
4. Puis Partie C (coherence globale)
5. Puis Partie D (finition micro)
6. A chaque grosse etape, npm run build pour verifier
7. A la fin : npm run build + npm run lint 100% clean
8. Commit : "polish: global pass + /a-propos founders rewrite (Haas & Lieater)"
9. Recap final par partie, en notant ce qui t'a semble le plus impactant visuellement et tout point qui merite mon attention

Ne touche PAS a /diagnostic (ComingSoon jusqu'a Session 4).
Ne touche PAS a /cgv, /mentions-legales, /confidentialite.
