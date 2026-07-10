# Clement Communay Portfolio

Portfolio personnel de Clement Communay, construit avec React, TypeScript, Vite et Three.js.

Production : [https://clement-communay-portfolio.netlify.app/](https://clement-communay-portfolio.netlify.app/)

## Apercu

Le projet presente mon profil, mes experiences, mes competences, mes projets professionnels/personnels et un formulaire de contact.

L'accueil propose une experience 3D interactive avec satellites de navigation. Les pages internes utilisent un layout commun responsive, une navigation sticky, un changement de langue et des contenus structures via i18n.

## Fonctionnalites

- Home 3D interactive avec React Three Fiber et Three.js
- Navigation vers les sections principales depuis la scene 3D
- Pages About, Experiences, Skills, Projects et Contact
- Detail projet en vue desktop et bottom sheet en mobile
- Internationalisation francais / anglais avec i18next
- Formulaire de contact EmailJS
- Loader initial avec prechargement des images critiques
- Page 404 personnalisee
- Fallbacks d'erreur applicative
- Build Vite avec code splitting des vendors principaux

## Stack

- Node `24.18.0`
- npm `11.16.0`
- React `19`
- TypeScript
- Vite
- React Router DOM
- Three.js
- React Three Fiber
- Drei
- i18next / react-i18next
- EmailJS
- CSS Modules
- Vitest / Testing Library
- ESLint / Prettier
- Netlify

## Prerequis

Utiliser Node 24 :

```bash
nvm install
nvm use
```

La version Node est declaree dans :

- `.nvmrc`
- `.node-version`
- `package.json`
- `netlify.toml`

## Installation

```bash
npm install
```

## Developpement

```bash
npm run dev
```

Application locale :

```txt
http://127.0.0.1:5173/
```

## Scripts

| Commande               | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Lance le serveur Vite en developpement       |
| `npm start`            | Alias de `npm run dev`                       |
| `npm run build`        | Typecheck puis build production dans `dist/` |
| `npm run preview`      | Sert localement le build production          |
| `npm run typecheck`    | Verifie TypeScript                           |
| `npm run lint`         | Lance ESLint                                 |
| `npm run test`         | Lance Vitest                                 |
| `npm run test:watch`   | Lance Vitest en mode watch                   |
| `npm run format`       | Verifie Prettier                             |
| `npm run format:write` | Applique Prettier                            |

## Routes

- `/` : accueil 3D
- `/aboutme` : profil
- `/experiences` : experiences professionnelles
- `/skills` : competences
- `/projects` : projets
- `/contactme` : contact
- `/notfound` : page 404
- `*` : fallback 404

Les routes de sections affichent une page portfolio commune et scrollent vers la section cible. Le scroll met aussi l'URL a jour avec la section active.

## Structure

```txt
src/
  app/       Composition racine, routing, loader et fallbacks
  assets/    Images importees par le code React
  data/      Donnees typees de navigation, projets, skills et experiences
  i18n/      Configuration i18next et locales
  pages/     Pages et sections de l'application
  shared/    Helpers et configuration transverse
  styles/    Tokens, reset et styles globaux
  test/      Configuration des tests
```

Les assets servis directement par Vite sont dans `public/`.

## Internationalisation

Les traductions sont dans :

```txt
src/i18n/locales/fr.json
src/i18n/locales/en.json
```

La langue par defaut est l'anglais. Le choix utilisateur est conserve par i18next via le stockage navigateur.

## Contact et EmailJS

Le formulaire de contact utilise EmailJS.

Variables attendues dans `.env` et sur Netlify :

```bash
CONTACT_EMAIL=
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
```

Le fichier `.env` est ignore par Git.

Payload envoye au template EmailJS :

```txt
first_name
last_name
from_email
profession
message
to_email
```

## Deploiement

Le projet est deploye sur Netlify.

Configuration :

- Build command : `npm run build`
- Publish directory : `dist`
- Node : `24.18.0`
- npm : `11.16.0`

La configuration est versionnee dans `netlify.toml`.

## Validation

Avant publication :

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Maintenance

- Ne pas reintroduire `react-scripts`
- Garder `dist/`, `node_modules/` et `.npm-cache/` hors Git
- Ajouter les nouvelles cles i18n dans les deux langues
- Garder les routes publiques a la racine
