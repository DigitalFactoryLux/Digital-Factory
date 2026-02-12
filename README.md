# Digital-Factory
# 🏭 Digital Factory Luxembourg – Site Web

> **Migration Wix → Code**
> Site actuel : [www.digital-factory.lu](https://www.digital-factory.lu) (hébergé sur Wix)
> Objectif : Recréer le site en code propre tout en conservant **exactement** le design, les couleurs et l'intégralité du contenu.

---

## 📋 Sommaire

1. [Contexte du projet](#-contexte-du-projet)
2. [Architecture du site actuel](#-architecture-du-site-actuel)
3. [Charte graphique & Design](#-charte-graphique--design)
4. [Contenu par page](#-contenu-par-page)
5. [Composants réutilisables](#-composants-réutilisables)
6. [Stack technique recommandée](#-stack-technique-recommandée)
7. [Structure du projet](#-structure-du-projet)
8. [Assets & Médias](#-assets--médias)
9. [SEO & Métadonnées](#-seo--métadonnées)
10. [Formulaire de contact](#-formulaire-de-contact)
11. [Déploiement](#-déploiement)
12. [Roadmap](#-roadmap)

---

## 🎯 Contexte du projet

**Digital Factory Sàrl-s** est un venture builder SaaS basé au Luxembourg, spécialisé dans les solutions digitales pour l'industrie et les services.

Le site actuel est hébergé sur **Wix**, ce qui limite fortement les possibilités de personnalisation, les performances et le contrôle du code. L'objectif est de migrer vers une solution codée sur-mesure en conservant :

- ✅ Le design et le layout existant à l'identique
- ✅ La palette de couleurs (fond sombre / accents colorés)
- ✅ L'intégralité du contenu textuel (FR)
- ✅ Les images et assets visuels
- ✅ Le formulaire de contact
- ✅ Les liens vers réseaux sociaux
- ✅ Le SEO existant

---

## 🗺️ Architecture du site actuel

Le site comprend **4 pages principales** + 2 pages légales :

| Page | URL Wix actuelle | Description |
|------|-------------------|-------------|
| **Accueil** | `/` | Page d'accueil – présentation générale, produits, engagements |
| **SaaS** | `/blank-1-1-1` | Services web & plateformes sur-mesure |
| **Teeqode** | `/blank-1-1` | Produit TEEQODE® – Gestion documentaire |
| **Kuck** | `/blank-1` | Produit KUCK® – Numérisation 3D, Drone & VR |
| Politique de confidentialité | `/privacy-policy` | Page légale |
| Mentions légales | `/blank-3` | Mentions légales |

### Nouvelles URLs proposées (propres)

| Page | Nouvelle URL |
|------|-------------|
| Accueil | `/` |
| SaaS | `/saas` |
| Teeqode | `/teeqode` |
| Kuck | `/kuck` |
| Politique de confidentialité | `/politique-de-confidentialite` |
| Mentions légales | `/mentions-legales` |

> ⚠️ Prévoir des **redirections 301** des anciennes URLs Wix vers les nouvelles pour le SEO.

---

## 🎨 Charte graphique & Design

### Palette de couleurs (à extraire précisément du site Wix)

| Utilisation | Couleur estimée | Notes |
|-------------|----------------|-------|
| Fond principal | `#0a0a0a` / Noir profond | Background sombre sur toutes les pages |
| Fond secondaire | `#111111` / Gris très foncé | Sections alternées |
| Texte principal | `#FFFFFF` | Blanc |
| Texte secondaire | `#AAAAAA` / Gris clair | Sous-titres, descriptions |
| Accent primaire | `#00C2FF` / Bleu cyan | Boutons, liens, icônes |
| Accent secondaire | `#7B61FF` / Violet | Dégradés, accents |
| Accent tertiaire | `#FF6B6B` / Rouge/corail | Accents ponctuels |

> 🔧 **TODO** : Inspecter le CSS Wix avec DevTools pour extraire les couleurs exactes hex.

### Typographie

- **Titres** : Sans-serif moderne (type Montserrat, Inter ou similaire – à vérifier)
- **Corps de texte** : Sans-serif lisible
- **Taille des titres** : Grands, impactants (H1 très large sur la hero)

### Principes de design

- Thème **dark mode** (fond noir/très sombre)
- Layout **full-width** avec sections empilées
- **Cards** avec fond légèrement plus clair et coins arrondis
- **Icônes SVG** en ligne (style outline/ligne fine)
- **Animations** : Transitions douces au scroll (fade-in, slide-up)
- **Responsive** : Mobile-first

---

## 📝 Contenu par page

### Page 1 : ACCUEIL (`/`)

#### Hero Section
- **Titre H1** : *"Venture builder SaaS basé au Luxembourg, expert en transformation digitale et gestion de projets intelligents pour l'industrie et les services."*
- **Sous-titre** : *"Digital Factory : l'innovation au service de votre transformation digitale et de la gestion de vos projets, clé en main."*
- **CTA** : `Découvrez nos solutions` → lien interne
- **Visuel** : Logo animé / illustration hero

#### Section "Qui sommes-nous"
- **Titre H2** : *"Qui sommes-nous"*
- **Texte** :
  > Digital Factory est un venture builder spécialisé dans les solutions SaaS pour l'industrie et les services.
  > Nous concevons et lançons en interne des produits digitaux prêts à être exploités ou acquis.
  >
  > Nous développons également des plateformes SaaS et des sites web sur mesure, avec un design moderne, des fonctionnalités adaptées et un SEO optimisé.

#### Section "Nos réalisations"
- **Titre H3** : *"Nos réalisations"*
- **Texte** : *"Avec Digital Factory, vous bénéficiez d'un partenaire capable de combiner innovation technologique, vision stratégique et ancrage local pour donner vie à vos projets digitaux."*
- **2 Cards produits** :
  - **Kuck** : Logo Kuck + bouton `Découvrir Kuck` → https://www.kuck.lu/
  - **Teeqode** : Image workers + bouton `Découvrir Teeqode` → https://teeqode.com/login

#### Section "Pourquoi choisir Digital Factory ?"
- **Titre H2** : *"Pourquoi choisir Digital Factory ?"*
- **Sous-titre** : *"Découvrez ce qui nous distingue et fait la réussite de vos projets."*
- **3 Cards avec icônes** :
  1. 🏠 **Expertise locale** – *"Plusieurs projets réalisés au Benelux, avec une connaissance fine des exigences locales."*
  2. ⚡ **Réactivité & proximité** – *"Capacité à intervenir sur site en moins de 24h grâce à une équipe basée au Luxembourg."*
  3. 🤝 **Accompagnement complet** – *"De l'audit initial à la formation de vos équipes, nous restons à vos côtés à chaque étape."*

#### Section "KUCK®"
- **Titre H2** : *"KUCK® – Numérisation 3D, Drone & Réalité virtuelle"*
- **Texte** : *"Scanner 3D, drones et réalité virtuelle : une solution immersive dédiée pour l'industrie, la construction, l'hôtellerie et la restauration."*
- **CTA** : `En savoir plus` → `/kuck`

#### Section "TEEQODE®"
- **Titre H2** : *"TEEQODE® – Gestion documentaire intelligente"*
- **Texte** :
  > Automatisez le suivi et la conformité de vos documents réglementaires et opérationnels.
  > Simplifiez la gestion des permis d'accès, dossiers ouvriers et validations chantier.
  > Gagnez en sécurité, en traçabilité et en sérénité.
- **CTA** : `En savoir plus` → `/teeqode`

#### Section "Plateformes SaaS et sites web"
- **Titre H2** : *"Plateformes SaaS et sites web"*
- **Texte** : *"Développement SaaS, design moderne, SEO et réseaux sociaux : des plateformes digitales adaptées à vos besoins pour valoriser votre présence en ligne."*
- **CTA** : `En savoir plus` → `/saas`

#### Section "Nos engagements"
- **Titre H2** : *"Nos engagements"*
- **Sous-titre** : *"Chez Digital Factory, notre mission est d'offrir des solutions rapides, sécurisées et sur-mesure, avec un accompagnement local et humain."*
- **4 Engagements** (layout en grille) :
  1. **Réactivité** – *"Intervention sous 24h / 48h"*
  2. **Confidentialité** – *"Protection et sécurité totale de vos données"*
  3. **Gain de temps** – *"Automatisation des tâches répétitives et chronophages"*
  4. **Support local** – *"Une équipe basée au Luxembourg, proche de vos projets"*

#### Section "Nos solutions numériques"
- **Titre H2** : *"Nos solutions numériques"*
- **Texte** : *"Du relevé 3D à la gestion documentaire, en passant par le développement web et la réalité virtuelle, découvrez nos solutions digitales sur-mesure pour entreprises et professionnels."*

---

### Page 2 : SAAS (`/saas`)

#### Hero Section
- **Titre H2** : *"Sites web & plateformes sur-mesure"*
- **Texte** : *"Nous concevons et déployons des sites modernes, optimisés SEO et enrichis par l'IA, pour vous rendre visible, performant et prêt pour l'avenir."*

#### Section "Pourquoi choisir Digital Factory ?"
- **Texte** : *"Basée au Luxembourg, notre équipe vous accompagne de la conception à la mise en ligne pour créer des sites Internet et plateformes métiers modernes, performants et adaptés à vos besoins."*
- **3 Cards** :
  1. **Équipe locale & réactive** – *"Au Luxembourg, engagée à comprendre vos enjeux."*
  2. **Technologie & intégration** – *"Réseaux sociaux + IA + SEO"*
  3. **Support & évolutivité** – *"Maintenance, performance et croissance assurées."*
- **CTA** : *"Prêt à accélérer votre présence digitale ? Contactez-nous."*

#### Section "Notre expertise à votre service"
- **Titre H2** : *"Notre expertise à votre service"*
- **Texte** : *"Nous créons des sites web sur-mesure, performants avec une intégration native des réseaux sociaux et du SEO."*
- **4 items avec icônes** :
  1. 🎨 **Création & refonte de sites** – *"Design moderne, UX soignée, responsive tous écrans et conforme aux standards web."*
  2. 📱 **Réseaux sociaux & optimisation de contenu** – *"Intégrations sociales et contenus optimisés pour gagner en visibilité."*
  3. 🔍 **SEO & performances** – *"Architecture optimisée pour un site rapide, visible et bien référencé."*
  4. 🔧 **Suivi, maintenance & évolutions** – *"Maintenance, mises à jour et accompagnement continu."*

#### Section "Notre approche" (Stepper 3 étapes)
- **Titre** : *"Notre approche"*
- **Sous-titre** : *"Innovation, Connection, Excellence"*
- **Étape 01** : **Créer & connecter** – *"Sites vitrines, e-commerce et plateformes sur-mesure, intégrant directement vos réseaux sociaux et outils connectés."*
- **Étape 02** : **Optimiser & référencer** – *"Structure performante, SEO avancé, contenus optimisés pour Google et amélioration continue."*
- **Étape 03** : **Maintenir & faire évoluer** – *"Support réactif, mises à jour régulières et accompagnement stratégique."*

---

### Page 3 : TEEQODE (`/teeqode`)

#### Hero Section
- **Logo TEEQODE** (grand, centré)
- **Titre H2** : *"Optimisez la gestion documentaire"*
- **Sous-titre** : *"Centralisez, automatisez et sécurisez vos documents règlementaires"*
- **CTA** : `Essayez Teeqode` → https://teeqode.com/

#### Section "Pourquoi choisir TEEQODE® ?"
- **Texte** : *"Digitalisez et sécurisez vos documents réglementaires avec une plateforme intuitive, modulable et toujours conforme."*
- **3 Cards** :
  1. **Centralisation sécurisée** – *"Tous vos documents à portée de main à tout moment."*
  2. **Micro services agiles** – *"Des modules sur mesure pour s'adapter à vos besoins."*
  3. **Technologie de pointe** – *"Bénéficiez des dernières innovations logicielles."*

#### Section principale
- **Titre H2** : *"Optimisez la gestion documentaire avec TEEQODE®"*
- **Texte** : *"Automatisez, centralisez et sécurisez tous vos documents réglementaires pour gagner en efficacité et en conformité, où que vous soyez."*
- **4 items** :
  1. **Sur-mesure** – *"S'adapte à vos besoins métiers et à vos processus existants."*
  2. **Évolutif** – *"Modules qui évoluent avec votre organisation."*
  3. **Continu** – *"Contrôles automatisés et conformité en temps réel."*
  4. **Efficacité** – *"Réduction de la charge administrative et des tâches répétitives."*

#### Section "Notre méthode" (Stepper 3 étapes)
- **Sous-titre** : *"Innovation, Sécurité, Simplicité"*
- **Étape 01** : **Comprendre & Auditer** – *"Nous analysons vos besoins et vos processus pour identifier les optimisations, puis nous configurons TEEQODE® pour simplifier et automatiser votre gestion documentaire."*
- **Étape 02** : **Digitaliser & Sécuriser** – *"Numérisation, automatisation, stockage sécurisé."*
- **Étape 03** : **Suivre & Valoriser** – *"Traçabilité, historique, suivi pour gagner en sérénité."*

---

### Page 4 : KUCK (`/kuck`)

#### Hero Section
- **Titre H2** : *"KUCK® – Numérisation 3D, Drone & Réalité Virtuelle"*
- **Texte** : *"Nous capturons, modélisons et valorisons vos espaces pour l'industrie, la construction, l'hôtellerie et la restauration."*
- **CTA** : `Explorer l'univers Kuck` → https://www.kuck.lu/

#### Section "Pourquoi choisir KUCK ?"
- **Texte** : *"Scan 3D, vues drone et jumeaux numériques pour exploiter et valoriser vos espaces avec précision, du sol au ciel."*
- **3 items** :
  1. **Précision** – *"Mesures fiables et exploitables pour plans, travaux et inspections."*
  2. **Rapidité & sécurité** – *"Intervention courte et discrète sans bloquer vos activités."*
  3. **Jumeaux numériques** – *"Visualiser, analyser et anticiper l'évolution de vos espaces."*

#### Section descriptive
- **Texte** : *"Chez KUCK, nous transformons vos espaces en données exploitables grâce à la précision du scan 3D, la puissance des vues drones et l'impact de la réalité virtuelle. Notre mission : créer des solutions visuelles sur mesure pour analyser, optimiser et valoriser vos projets du sol au ciel."*
- **2 items supplémentaires** :
  1. **Polyvalence** – *"Applicable à tous les secteurs : industrie, hôtellerie, restauration, retail, immobilier, construction…"*
  2. **Accompagnement** – *"Suivi personnalisé de la capture à la livraison finale."*

#### Section "Notre méthode" (Stepper 3 étapes)
- **Sous-titre** : *"Innovation, Connection, Excellence"*
- **Étape 01** : **Immersion & diagnostic** – *"Nous plongeons au cœur de votre environnement pour saisir vos enjeux, vos usages et vos spécificités techniques."*
- **Étape 02** : **Capture & modélisation** – *"Grâce à notre équipement 3D, nous générons des données de haute qualité."*
- **Étape 03** : **Intégration & suivi** – *"Nous intégrons vos livrables à vos process, formons vos équipes et assurons un suivi afin que vos décisions soient plus rapides, plus sûres et mieux informées."*

---

## 🧩 Composants réutilisables

Composants communs à toutes les pages (à factoriser) :

| Composant | Description |
|-----------|-------------|
| `Navbar` | Logo DF + liens : Accueil, SaaS, Teeqode, Kuck + menu burger mobile |
| `Footer` | Adresse, liens réseaux sociaux, nav secondaire, emails contacts, mentions légales |
| `ContactForm` | Formulaire : Prénom*, Nom*, Tel, Email*, Message + bouton Envoyer |
| `HeroSection` | Titre + sous-titre + CTA, layout full-width |
| `CardGrid` | Grille de cards (2 ou 3 colonnes) avec icône + titre + description |
| `StepperSection` | Section 3 étapes (01, 02, 03) avec icône ronde + titre + texte |
| `CTABanner` | Bandeau d'appel à l'action avec bouton |
| `SectionTitle` | H2 avec style réutilisable |
| `EngagementGrid` | Grille 2x2 pour les engagements |

---

## 🛠️ Stack technique recommandée

### Option A : Next.js (recommandé)
```
Framework    : Next.js 14+ (App Router)
Langage      : TypeScript
Styling      : Tailwind CSS
Animations   : Framer Motion
Formulaire   : React Hook Form + API Route / service email
Déploiement  : Vercel / Scalingo / VPS
```

### Option B : Astro (alternative légère)
```
Framework    : Astro 4+
Langage      : TypeScript
Styling      : Tailwind CSS
Animations   : CSS natif + Intersection Observer
Formulaire   : Endpoint API Astro
Déploiement  : Scalingo / Netlify
```

### Option C : HTML/CSS/JS pur (simple et rapide)
```
Structure    : HTML5 sémantique
Styling      : CSS custom (variables CSS pour les couleurs)
Animations   : CSS + JS vanilla (Intersection Observer)
Formulaire   : Formspree / EmailJS / backend custom
Déploiement  : N'importe quel hébergeur statique
```

---

## 📁 Structure du projet (Next.js)

```
digital-factory-site/
├── public/
│   ├── images/
│   │   ├── logo-df.png              # Logo Digital Factory
│   │   ├── logo-df-hero.png         # Logo hero animé
│   │   ├── logo-kuck.png            # Logo Kuck
│   │   ├── logo-teeqode.png         # Logo Teeqode
│   │   ├── workers.jpg              # Image Teeqode card
│   │   ├── digit-innov.png          # Badge innovation
│   │   └── icons/                   # Icônes SVG
│   │       ├── expertise.svg
│   │       ├── reactivite.svg
│   │       ├── accompagnement.svg
│   │       └── ...
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Layout global (Navbar + Footer)
│   │   ├── page.tsx                 # Page Accueil
│   │   ├── saas/
│   │   │   └── page.tsx             # Page SaaS
│   │   ├── teeqode/
│   │   │   └── page.tsx             # Page Teeqode
│   │   ├── kuck/
│   │   │   └── page.tsx             # Page Kuck
│   │   ├── politique-de-confidentialite/
│   │   │   └── page.tsx
│   │   └── mentions-legales/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   └── StepperItem.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CardGrid.tsx
│   │   │   ├── StepperSection.tsx
│   │   │   ├── EngagementGrid.tsx
│   │   │   └── CTABanner.tsx
│   │   └── ContactForm.tsx
│   ├── styles/
│   │   └── globals.css
│   └── lib/
│       └── constants.ts             # Couleurs, textes, metadata
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🖼️ Assets & Médias

### Images à récupérer depuis Wix

| Asset | URL source Wix | Usage |
|-------|---------------|-------|
| Logo DF (navbar) | `e74772_e9bf0f2141ce41e39277983f19e5e8ae~mv2.png` | Navbar, toutes les pages |
| Logo hero animé | `84770f_96602ed08f7a4c3f8c6feb2929570156f000.png` | Hero accueil |
| Badge DIGIT-INNOV | `687123_29982d2193494c78ac1d1dfeff90a2cc~mv2.png` | Hero accueil |
| Logo Kuck | `687123_8333ee5900d94ec48ebb280fa0093bd6~mv2.png` | Card Kuck |
| Image workers | `687123_6733d319cee444e78dac167b9b968a77~mv2.jpg` | Card Teeqode |
| Logo Teeqode | `687123_8faa91d4bceb4f9ea8c886dae56a1f74~mv2.png` | Hero page Teeqode |
| Icône étape 01 | `84770f_9027ced3c06346188607c8818ec63344f000.png` | Stepper étape 1 |
| Icône étape 02 | `84770f_e5dd8d7df4d24c4f9b9be82688b890aef000.png` | Stepper étape 2 |
| Icône étape 03 | `84770f_324e475f2f114e9099aca2235f304c95f000.png` | Stepper étape 3 |
| Cards décoratives (bleu) | `e74772_11a23020f688414483613536d085ec76~mv2.png` | Background cards |
| Cards décoratives (violet) | `e74772_a993ac6cd270431ca66c2cce60180087~mv2.png` | Background cards |

> 🔧 **TODO** : Télécharger toutes les images depuis `static.wixstatic.com` en haute résolution et les optimiser (WebP + fallback PNG/JPG).

### Icônes SVG

Les icônes du site Wix sont des SVG inline. Recommandation : utiliser une bibliothèque comme **Lucide Icons** ou **Heroicons** pour les remplacer, ou exporter les SVG originaux depuis Wix via les DevTools.

---

## 🔍 SEO & Métadonnées

### Métadonnées globales
```
Titre : Digital Factory | SaaS et Numérisation 3D au Luxembourg
Description : Digital Factory à Luxembourg : expert SaaS et numérisation 3D de précision. 
              Découvrez nos solutions digitales innovantes pour booster vos projets.
Langue : fr
Canonical : https://www.digital-factory.lu
```

### Métadonnées par page

| Page | Title | Description |
|------|-------|-------------|
| Accueil | Digital Factory \| SaaS et Numérisation 3D au Luxembourg | Digital Factory à Luxembourg : expert SaaS et numérisation 3D de précision. |
| SaaS | Sites web & plateformes sur-mesure \| Digital Factory | Conception de sites modernes, optimisés SEO et enrichis par l'IA au Luxembourg. |
| Teeqode | TEEQODE® – Gestion documentaire intelligente \| Digital Factory | Centralisez, automatisez et sécurisez vos documents réglementaires. |
| Kuck | KUCK® – Numérisation 3D, Drone & VR \| Digital Factory | Scanner 3D, drones et réalité virtuelle pour l'industrie et la construction. |

### Open Graph & Social
- Configurer les balises OG pour LinkedIn et Instagram
- Image OG : créer une image 1200x630 avec le branding DF

---

## 📬 Formulaire de contact

### Champs
| Champ | Type | Requis |
|-------|------|--------|
| Prénom | text | ✅ |
| Nom | text | ✅ |
| Tel | tel | ❌ |
| Email | email | ✅ |
| Message | textarea | ❌ |

### Destinataires
- `c.singer@digital-factory.lu`
- `g.flores@digital-factory.lu`

### Implémentation recommandée
- **Option simple** : Formspree / EmailJS (pas de backend nécessaire)
- **Option pro** : API Route Next.js avec Nodemailer ou Resend
- **Validation** : Côté client (React Hook Form + Zod) + côté serveur
- **Anti-spam** : Honeypot field + rate limiting (ou reCAPTCHA v3)

---

## 🌐 Informations de contact & Réseaux sociaux

```
Adresse   : 25 Rue Haute, 1718 Luxembourg City, Luxembourg
LinkedIn  : https://www.linkedin.com/company/digital-factory-sarls/
Instagram : https://www.instagram.com/digital_factory.lu/
Email 1   : c.singer@digital-factory.lu
Email 2   : g.flores@digital-factory.lu
```

---

## 🚀 Déploiement

### Hébergement recommandé

| Option | Avantages | Cohérence écosystème |
|--------|-----------|---------------------|
| **Scalingo** | Hébergeur français, RGPD, déjà utilisé pour LIFT | ✅ Excellent |
| **Vercel** | Optimal pour Next.js, CDN mondial | ⚠️ US-based |
| **Netlify** | Bon pour sites statiques / Astro | ⚠️ US-based |
| **VPS OVH** | Contrôle total, hébergeur EU | ✅ Bon |

### Domaine
- Domaine actuel : `digital-factory.lu`
- Configurer les DNS pour pointer vers le nouvel hébergeur
- Certificat SSL (Let's Encrypt ou inclus hébergeur)

---

## 📅 Roadmap

### Phase 1 – Préparation
- [ ] Extraire les couleurs exactes depuis le Wix (DevTools)
- [ ] Télécharger tous les assets/images en haute résolution
- [ ] Exporter les icônes SVG
- [ ] Choisir la stack technique définitive
- [ ] Initialiser le projet

### Phase 2 – Développement
- [ ] Setup du projet (Next.js / Astro / HTML)
- [ ] Implémenter les composants réutilisables (Navbar, Footer, Cards, Stepper...)
- [ ] Développer la page Accueil
- [ ] Développer la page SaaS
- [ ] Développer la page Teeqode
- [ ] Développer la page Kuck
- [ ] Implémenter le formulaire de contact
- [ ] Pages mentions légales + politique de confidentialité

### Phase 3 – Finitions
- [ ] Responsive design (mobile, tablette, desktop)
- [ ] Animations au scroll
- [ ] Optimisation des images (WebP, lazy loading)
- [ ] SEO : métadonnées, sitemap.xml, robots.txt
- [ ] Tests cross-browser
- [ ] Lighthouse audit (perf > 90, a11y > 90)

### Phase 4 – Mise en ligne
- [ ] Déploiement sur l'hébergeur choisi
- [ ] Configuration DNS
- [ ] Redirections 301 depuis les anciennes URLs Wix
- [ ] Vérification Google Search Console
- [ ] Désactivation du site Wix

---

## 📌 Notes importantes

1. **Rien ne change côté contenu** : chaque mot, chaque phrase du site actuel doit être reproduit à l'identique.
2. **Le design doit être fidèle** : même structure, mêmes couleurs, même ambiance dark mode.
3. **Les liens externes restent les mêmes** : kuck.lu, teeqode.com, LinkedIn, Instagram.
4. **Le formulaire de contact** doit envoyer aux deux adresses email existantes.
5. **Pensez RGPD** : bandeau cookies si analytics, politique de confidentialité accessible.

---

## 📄 Licence

© 2025 Digital Factory Sàrl-s – Tous droits réservés.

---

*Dernière mise à jour : Février 2026*