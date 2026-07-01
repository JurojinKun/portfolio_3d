# Portfolio 3D

Portfolio personnel 3D de Clement Communay.

Production actuelle : [https://0ruj-portfolio.netlify.app/](https://0ruj-portfolio.netlify.app/)

## Etat actuel

Le projet est en cours de migration vers une v2 technique propre sur la branche :

```bash
v2-modernization
```

La v1 historique est encore presente dans le repo pour servir de reference, mais elle n'est plus branchee sur l'entree Vite. L'application lancee localement utilise maintenant un shell v2 minimal et un layout portfolio commun pour les pages portees.

## Stack v2

- Node `24.18.0`
- npm `11.16.0`
- React `19.2.7`
- React DOM `19.2.7`
- React Router DOM `7.18.1`
- Vite `8.1.2`
- TypeScript `5.9.3`
- ESLint `10.6.0`
- Vitest `4.1.9`
- Testing Library
- i18next / react-i18next

Le projet n'utilise plus Create React App / `react-scripts`.

## Prerequis

Utiliser Node 24 via NVM :

```bash
nvm install
nvm use
```

Si `nvm` n'est pas charge dans le shell :

```bash
source ~/.nvm/nvm.sh
nvm use
```

La version Node est fixee par :

- `.nvmrc`
- `.node-version`
- `package.json` avec `"engines": { "node": ">=24" }`

## Installation

```bash
npm install
```

Si le cache global npm pose probleme localement, utiliser le cache ignore par Git :

```bash
npm install --cache .npm-cache
```

## Developpement

Lancer le serveur local avec hot reload :

```bash
npm run dev
```

Puis ouvrir :

```txt
http://127.0.0.1:5173/
```

## Scripts

| Commande               | Role                                                            |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | Lance Vite en developpement avec hot reload                     |
| `npm start`            | Alias de `npm run dev`                                          |
| `npm run build`        | Lance le typecheck puis genere le build production dans `dist/` |
| `npm run preview`      | Sert localement le build production                             |
| `npm run typecheck`    | Verifie TypeScript sans generer de fichiers                     |
| `npm run lint`         | Lance ESLint sur les fichiers TypeScript/TSX                    |
| `npm run test`         | Lance les tests Vitest une fois                                 |
| `npm run test:watch`   | Lance Vitest en mode watch                                      |
| `npm run format`       | Verifie le formatage Prettier                                   |
| `npm run format:write` | Applique le formatage Prettier                                  |

## Organisation `src/`

La v2 utilise progressivement cette structure cible :

```txt
src/
  app/       Composition racine de l'application
  data/      Donnees typees de navigation, projets, competences, experiences
  i18n/      Configuration i18next, locales et tests de parite
  pages/     Pages v2 portees en TSX et CSS Modules
  shared/    Configuration, types et helpers transverses
  styles/    Reset, tokens et styles globaux limites
  test/      Configuration des tests
```

Les anciens dossiers JS/CSS de la v1 restent temporairement presents tant que les pages n'ont pas ete portees. Le code v2 doit utiliser des imports `@/*` au lieu de longs chemins relatifs.

## Gestion CSS

La v2 separe les styles en deux niveaux :

- styles globaux limites dans `src/styles/` ;
- styles scopes par composant ou page avec des fichiers `*.module.css`.

Les fichiers globaux ont chacun un role strict :

- `tokens.css` contient uniquement les variables CSS partagees : couleurs, typographies, espacements et futures valeurs de design system ;
- `reset.css` neutralise les styles navigateur par defaut : `box-sizing`, marges du `body`, hauteur racine, heritage de police des champs ;
- `global.css` importe `tokens.css` et `reset.css`, puis applique uniquement les styles document-level comme la couleur de texte, le fond, la police globale et le lissage.

Les composants et pages doivent utiliser des CSS Modules, par exemple `App.module.css`. Ces classes sont importees dans le composant et scopees automatiquement par Vite, ce qui evite les collisions de classes globales.

## Internationalisation

La v2 utilise `i18next`, `react-i18next` et `i18next-browser-languagedetector`.

Les locales v2 sont dans :

```txt
src/i18n/locales/fr.json
src/i18n/locales/en.json
```

La configuration est centralisee dans `src/i18n/`. Les langues supportees sont typees dans `supportedLanguages.ts`.

Un test verifie que les fichiers FR et EN gardent les memes cles de traduction. Toute nouvelle cle ajoutee dans une langue doit etre ajoutee dans l'autre.

## Assets

Les assets importes par le code React restent dans `src/assets/`. Les assets servis tels quels par Vite restent dans `public/`.

Les chemins publics utiles sont centralises dans `src/shared/assets/publicAssets.ts`. Les imports d'assets source utiles sont centralises progressivement dans `src/shared/assets/sourceAssets.ts`.

## Donnees applicatives

La v2 sort progressivement les contenus structures des composants React pour les placer dans `src/data/`.

Les donnees suivantes sont preparees :

- navigation portfolio et satellites ;
- projets professionnels et personnels ;
- competences et sections editoriales de la page competences ;
- experiences professionnelles.

Ces donnees utilisent des IDs stables et des cles i18n, pas du texte brut. Les textes restent dans `src/i18n/locales/`.

Un test verifie que les IDs restent uniques et que toutes les cles i18n referencees par les donnees existent en francais et en anglais.

## Routing

La v2 utilise React Router DOM.

Routes actuellement branchees :

- `/` : shell technique temporaire de migration ;
- `/portfolio` : layout portfolio commun, redirection vers `/portfolio/aboutme` ;
- `/portfolio/aboutme` : page A propos v2 ;
- `/portfolio/skills` : page Competences v2 ;
- `/portfolio/experiences` : page Experiences v2 ;
- `/portfolio/projects` : page Projets v2 ;
- `/portfolio/contactme` : page Contact v2 ;
- `/notfound` : page 404 v2 ;
- `*` : fallback vers la page 404 v2.

## Variables d'environnement

La page Contact v2 utilise un lien `mailto:` et lit l'adresse de destination depuis :

```bash
VITE_CONTACT_EMAIL=
```

Cette variable doit etre configuree localement et sur Netlify pour activer l'ouverture du client email avec un destinataire.

Un exemple est fourni dans `.env.example`.

## Validation

Avant de valider une etape de migration, lancer :

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm audit
```

Etat de reference apres l'etape 2 : toutes ces commandes passent avec Node `24.18.0`.

## Deploiement Netlify

Configuration attendue :

- Node : `24.18.0` ou superieur
- Build command : `npm run build`
- Publish directory : `dist`

Netlify lit aussi `.nvmrc` / `.node-version`, ce qui permet d'aligner la version Node locale et la version de build.

Le fichier `public/_redirects` est conserve pour gerer les routes SPA.

## Roadmap de migration

### Termine

- Creation de la branche `v2-modernization`.
- Remplacement du socle CRA par Vite.
- Passage a React 19.
- Mise en place de TypeScript strict.
- Mise en place de ESLint flat config.
- Mise en place de Vitest et Testing Library.
- Alignement sur Node 24 pour Netlify et le local.
- Generation d'un lockfile propre avec npm 11.
- Mise en place de la structure source v2 minimale.
- Mise en place de la configuration i18n v2.
- Mise en place des premiers manifestes d'assets v2.
- Extraction des donnees v2 pour la navigation, les projets, les competences et les experiences.
- Mise en place du routing v2 avec React Router DOM.
- Portage de la page 404 en TSX et CSS Module.
- Portage de la page A propos en TSX et CSS Module.
- Portage de la page Competences en TSX et CSS Module.
- Portage de la page Experiences en TSX et CSS Module.
- Portage de la page Projets en TSX et CSS Module.
- Portage de la page Contact en TSX et CSS Module.
- Mise en place du layout portfolio v2 commun avec navigation et changement de langue.

### En cours

- Shell applicatif v2 minimal.
- Tests de non-regression et d'integrite.
- Documentation projet mise a jour au fil de la migration.

### Prochaines etapes

- Rebrancher l'entree 3D et l'accueil.
- Refondre le CSS en modules/tokens responsive.
- Ajouter les tests de non-regression sur les parcours principaux.

## Notes de maintenance

- Ne pas reintroduire `react-scripts`.
- `dist/`, `node_modules/` et `.npm-cache/` sont ignores par Git.
- Les anciens fichiers JS/CSS restent temporairement presents tant que les pages n'ont pas ete portees.
- Mettre a jour ce README a chaque etape importante de migration.
