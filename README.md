# Digital Factory Luxembourg – Site Web

Site vitrine de **Digital Factory Sàrl-s**, venture builder SaaS basé au Luxembourg, spécialisé dans les solutions digitales pour l'industrie et les services.

> Migration depuis Wix vers du code custom — [www.digital-factory.lu](https://www.digital-factory.lu)

## Tech Stack

- **Astro 5** (site statique avec islands React)
- **TypeScript**
- **Tailwind CSS 3**
- **Resend** (envoi d'emails via formulaire de contact)

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (localhost:4321) |
| `npm run build` | Build statique (dist/) |
| `npm run preview` | Preview du build |
| `npm run lint` | Linter ESLint |

## Structure du projet

```
src/
├── layouts/Layout.astro          # Layout global (head, meta, Navbar, Footer)
├── pages/
│   ├── index.astro               # Accueil
│   ├── saas.astro                # Services web & plateformes
│   ├── teeqode.astro             # Produit TEEQODE®
│   ├── kuck.astro                # Produit KUCK®
│   ├── politique-de-confidentialite.astro
│   ├── mentions-legales.astro
│   └── api/contact.ts            # API endpoint formulaire
├── components/                   # Composants réutilisables (Navbar, Footer, Cards, etc.)
├── styles/global.css
└── lib/constants.ts              # Couleurs, textes, metadata, liens
```

## Déploiement

Le site est prévu pour être déployé sur **Scalingo** (hébergeur français, RGPD).

```bash
npm run build
```

Le dossier `dist/` contient le site statique prêt à être déployé.

## Licence

© 2026 Digital Factory Sàrl-s – Tous droits réservés.
