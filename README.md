# Clément Communay Portfolio

Personal portfolio of Clément Communay, built with React, TypeScript, Vite and Three.js.

Production: [https://clement-communay-portfolio.netlify.app/](https://clement-communay-portfolio.netlify.app/)

## Overview

This project presents my profile, professional experience, skills, professional and personal projects, and contact form.

The home page provides an interactive 3D experience with navigation satellites. Internal pages share a responsive portfolio layout with sticky navigation, language switching, and structured i18n content.

## Features

- Interactive 3D home page with React Three Fiber and Three.js
- Navigation to the main sections from the 3D scene
- About, Experiences, Skills, Projects and Contact pages
- Project details displayed as a sticky desktop panel and a mobile bottom sheet
- French / English internationalization with i18next
- EmailJS contact form
- Initial loader with critical image preloading
- Custom 404 page
- Application error fallbacks
- Vite production build with vendor code splitting

## Stack

- Node.js `24.18.0`
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

## Prerequisites

Use Node.js 24:

```bash
nvm install
nvm use
```

The Node.js version is declared in:

- `.nvmrc`
- `.node-version`
- `package.json`
- `netlify.toml`

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Local application:

```txt
http://127.0.0.1:5173/
```

## Scripts

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Starts the Vite development server              |
| `npm start`            | Alias for `npm run dev`                         |
| `npm run build`        | Runs type checking and builds production assets |
| `npm run preview`      | Serves the production build locally             |
| `npm run typecheck`    | Runs TypeScript checks                          |
| `npm run lint`         | Runs ESLint                                     |
| `npm run test`         | Runs Vitest                                     |
| `npm run test:watch`   | Runs Vitest in watch mode                       |
| `npm run format`       | Checks formatting with Prettier                 |
| `npm run format:write` | Applies Prettier formatting                     |

## Routes

- `/`: 3D home page
- `/aboutme`: profile
- `/experiences`: professional experience
- `/skills`: skills
- `/projects`: projects
- `/contactme`: contact
- `/notfound`: 404 page
- `*`: 404 fallback

Section routes render the shared portfolio page and scroll to the target section. Scrolling also keeps the URL in sync with the active section.

## Structure

```txt
src/
  app/       Root composition, routing, loader and fallbacks
  assets/    Images imported by the React code
  data/      Typed navigation, project, skill and experience data
  i18n/      i18next configuration and locale files
  pages/     Application pages and sections
  shared/    Shared helpers and cross-cutting configuration
  styles/    Tokens, reset and global styles
  test/      Test setup
```

Assets served directly by Vite live in `public/`.

## Internationalization

Translations are stored in:

```txt
src/i18n/locales/fr.json
src/i18n/locales/en.json
```

The default language is English. The user's language choice is persisted by i18next through browser storage.

## Contact and EmailJS

The contact form uses EmailJS.

Expected variables in `.env` and on Netlify:

```bash
CONTACT_EMAIL=
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
```

The `.env` file is ignored by Git.

Payload sent to the EmailJS template:

```txt
first_name
last_name
from_email
profession
message
to_email
```

## Deployment

The project is deployed on Netlify.

Configuration:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: `24.18.0`
- npm: `11.16.0`

The deployment configuration is versioned in `netlify.toml`.

## Validation

Before publishing:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Maintenance

- Do not reintroduce `react-scripts`
- Keep `dist/`, `node_modules/` and `.npm-cache/` out of Git
- Add new i18n keys in both languages
- Keep public routes at the root level
