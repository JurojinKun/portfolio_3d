# Portfolio 3D

Portfolio personnel 3D de Clement Communay.

Production actuelle : [https://0ruj-portfolio.netlify.app/](https://0ruj-portfolio.netlify.app/)

## Etat actuel

Le projet est en cours de migration vers une v2 technique propre sur la branche :

```bash
v2-modernization
```

La v1 historique est encore presente dans le repo pour servir de reference, mais elle n'est plus branchee sur l'entree Vite. L'application lancee localement affiche pour l'instant un shell v2 minimal. Les pages existantes seront portees progressivement dans les prochaines etapes.

## Stack v2

- Node `24.18.0`
- npm `11.16.0`
- React `19.2.7`
- React DOM `19.2.7`
- Vite `8.1.2`
- TypeScript `5.9.3`
- ESLint `10.6.0`
- Vitest `4.1.9`
- Testing Library

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

### En cours

- Shell applicatif v2 minimal.
- Premier test de non-regression.
- Documentation projet mise a jour au fil de la migration.

### Prochaines etapes

- Migrer les assets utiles.
- Migrer `i18n`.
- Extraire les contenus en donnees typees.
- Porter les pages une par une.
- Rebrancher la 3D.
- Refondre le CSS en modules/tokens responsive.
- Ajouter les tests de non-regression sur les parcours principaux.

## Notes de maintenance

- Ne pas reintroduire `react-scripts`.
- `dist/`, `node_modules/` et `.npm-cache/` sont ignores par Git.
- Les anciens fichiers JS/CSS restent temporairement presents tant que les pages n'ont pas ete portees.
- Mettre a jour ce README a chaque etape importante de migration.
