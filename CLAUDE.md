# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Migration du site web de **Digital Factory Sàrl-s** (venture builder SaaS, Luxembourg) depuis Wix vers du code custom. Le site doit reproduire fidèlement le design existant (thème clair mint/cyan, couleurs, contenu textuel en français) tout en améliorant les performances et le contrôle du code.

Site actuel : https://www.digital-factory.lu (Wix)

## Tech Stack

- **Framework** : Astro 5 (site statique avec islands React)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS 3
- **Animations** : CSS natif + Intersection Observer (fade-in au scroll)
- **Formulaire** : Composant React (`client:visible`) + API Route Resend
- **Déploiement** : Scalingo (recommandé) / Vercel / VPS OVH

## Build & Dev Commands

```bash
npm install              # Installer les dépendances
npm run dev              # Serveur de développement (localhost:4321)
npm run build            # Build statique (dist/)
npm run preview          # Preview du build
npm run lint             # Linter ESLint
```

## Architecture

Le site comporte **6 pages** :

| Route | Page |
|-------|------|
| `/` | Accueil – présentation générale, produits, engagements |
| `/saas` | Services web & plateformes sur-mesure |
| `/teeqode` | Produit TEEQODE® – Gestion documentaire |
| `/kuck` | Produit KUCK® – Numérisation 3D, Drone & VR |
| `/politique-de-confidentialite` | Politique de confidentialité |
| `/mentions-legales` | Mentions légales |

### Structure des fichiers (Astro)

```
src/
├── layouts/
│   └── Layout.astro          # Layout global (head, meta, Navbar, Footer)
├── pages/
│   ├── index.astro           # Page Accueil
│   ├── saas.astro
│   ├── teeqode.astro
│   ├── kuck.astro
│   ├── politique-de-confidentialite.astro
│   ├── mentions-legales.astro
│   └── api/contact.ts        # API endpoint formulaire (Resend)
├── components/
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── HeroSection.astro
│   ├── Card.astro / CardGrid.astro
│   ├── SectionTitle.astro
│   ├── StepperSection.astro / StepperItem.astro
│   ├── EngagementGrid.astro
│   ├── CTABanner.astro
│   └── ContactForm.tsx       # Composant React (island interactif)
├── styles/global.css
└── lib/constants.ts          # Couleurs, textes, metadata, liens
```

### Composants réutilisables clés

- **HeroSection** : Titre + sous-titre + CTA, full-width
- **CardGrid** : Grille 2 ou 3 colonnes (icône + titre + description)
- **StepperSection** : 3 étapes numérotées (01, 02, 03) avec icône ronde
- **EngagementGrid** : Grille 2x2
- **CTABanner** : Bandeau d'appel à l'action
- **ContactForm** : Prénom*, Nom*, Tel, Email*, Message → envoi vers `c.singer@digital-factory.lu` et `g.flores@digital-factory.lu`

## Design System

- **Thème** : Light mode – fond clair mint/cyan avec dégradés doux
- **Fond principal** : Dégradé mint/cyan clair (tons pastel verdâtres/bleutés)
- **Fond secondaire** : Blanc ou blanc cassé pour les sections alternées
- **Texte principal** : Noir (`#000000` ou très foncé) sur fond clair
- **Texte secondaire** : Gris foncé pour les descriptions
- **Boutons CTA** : Fond noir avec texte blanc
- **Accent cyan** : Teinte cyan/turquoise utilisée dans les dégradés de fond
- **Motif signature** : Lignes verticales cyan en arrière-plan (élément graphique récurrent)
- **Forme vague** : Vague blanche qui traverse la hero section
- **Illustration hero** : Style "Digital Innovation" / circuit board en blanc semi-transparent
- **Typographie** : Sans-serif moderne (Montserrat ou Inter), titres grands et impactants
- **Cards** : Fond blanc ou légèrement teinté, coins arrondis
- **Animations** : Fade-in, slide-up au scroll
- **Responsive** : Mobile-first

## SEO

- Langue : `fr`
- Canonical : `https://www.digital-factory.lu`
- **Redirections 301 obligatoires** depuis les anciennes URLs Wix :
  - `/blank-1-1-1` → `/saas`
  - `/blank-1-1` → `/teeqode`
  - `/blank-1` → `/kuck`
  - `/blank-3` → `/mentions-legales`
- Générer `sitemap.xml` et `robots.txt`
- Configurer Open Graph pour LinkedIn et Instagram

## Règles importantes

- Tout le contenu textuel est en **français** et doit être reproduit à l'identique depuis le site Wix actuel.
- Les liens externes restent inchangés : kuck.lu, teeqode.com, LinkedIn, Instagram.
- Conformité **RGPD** : bandeau cookies si analytics, page politique de confidentialité accessible.
- Anti-spam sur le formulaire : honeypot field + rate limiting.
- Images optimisées en WebP avec lazy loading. Cible Lighthouse : perf > 90, a11y > 90.
