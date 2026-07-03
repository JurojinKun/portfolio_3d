# Portfolio

Portfolio personnel 3D de Clement Communay.

Production actuelle : [https://0ruj-portfolio.netlify.app/](https://0ruj-portfolio.netlify.app/)

## Etat actuel

Le projet est en cours de migration vers une v2 technique propre sur la branche :

```bash
v2-modernization
```

La v1 historique a ete retiree de `src/` apres le portage des pages principales. L'application lancee localement utilise maintenant l'entree Vite/React TS, une page d'accueil v2, un layout portfolio commun et les pages principales portees.

## Stack v2

- Node `24.18.0`
- npm `11.16.0`
- React `19.2.7`
- React DOM `19.2.7`
- React Router DOM `7.18.1`
- Three.js `0.185.1`
- React Three Fiber `9.6.1`
- Drei `10.7.7`
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

Les anciens dossiers JS/CSS de la v1 ont ete supprimes. Le code v2 doit utiliser des imports `@/*` au lieu de longs chemins relatifs.

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

- `/` : page d'accueil v2 en experience 3D plein ecran ;
- `/migration` : statut technique temporaire de la migration ;
- `/portfolio` : redirection vers `/portfolio/aboutme` ;
- `/portfolio/:sectionId` : page portfolio unique en sections scrollables ;
- `/portfolio/aboutme` : section A propos ;
- `/portfolio/skills` : section Competences ;
- `/portfolio/experiences` : section Experiences ;
- `/portfolio/projects` : section Projets ;
- `/portfolio/contactme` : section Contact ;
- `/notfound` : page 404 v2 ;
- `*` : fallback vers la page 404 v2.

Les routes de section portfolio gardent une URL dediee, mais elles rendent toutes la meme page. Au chargement, l'application scrolle vers la section cible ; pendant le scroll, un `IntersectionObserver` met l'URL a jour avec la section active. Le header portfolio passe en menu burger sur les largeurs ou les liens ne tiennent plus confortablement.

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

## Build et code splitting

Le build separe explicitement les principaux vendors via `build.rolldownOptions.output.codeSplitting` :

- `vendor-react` pour React et React DOM ;
- `vendor-router-i18n` pour React Router et i18next ;
- `vendor-three-core` pour Three.js ;
- `vendor-three-react` pour React Three Fiber, Drei et les helpers 3D associes.

La scene d'accueil reste chargee avec `React.lazy`. Le chunk applicatif `HomeScene` reste donc leger, tandis que le chunk Three.js est charge uniquement pour l'experience 3D.

## Scene 3D d'accueil

La scene 3D v2 de l'accueil est isolee dans :

```txt
src/pages/home/scene/
```

Elle utilise `three`, `@react-three/fiber` et `@react-three/drei`. Elle est chargee avec `React.lazy` depuis `HomePage` afin de preparer le code splitting.

La scene contient :

- un canvas d'etoiles plein ecran ;
- un canvas principal plein ecran ;
- une sphere hexagonale pleine affichee directement dans son etat final ;
- des satellites deja deployes, cliquables, responsives, qui orbitent autour de la sphere et redirigent vers les routes portfolio ;
- aucune animation pilotee par le scroll sur la page d'accueil ;
- un prechargement de la police des labels satellites pour eviter une suspension de la scene au premier affichage du texte 3D ;
- un loader initial repris de la v1, affiche uniquement au demarrage d'une nouvelle session de navigation via `sessionStorage.isSessionActive` ;
- un fallback statique si WebGL est indisponible ou si l'utilisateur prefere reduire les animations.

Le portage v2 n'a pas reintroduit Redux pour l'accueil. La page d'accueil affiche directement l'experience 3D finale, sans etat de scroll a restaurer.

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
- Portage des pages principales en TSX avec CSS Modules.
- Portage de la scene 3D d'accueil en etat final direct.
- Suppression des anciens fichiers CRA/JS/CSS/Redux non utilises par la v2.
- Mise en place du routing v2 avec React Router DOM.
- Portage de la page 404 en TSX et CSS Module.
- Portage de la page A propos en TSX et CSS Module.
- Portage de la page Competences en TSX et CSS Module.
- Portage de la page Experiences en TSX et CSS Module.
- Portage de la page Projets en TSX et CSS Module.
- Portage de la page Contact en TSX et CSS Module.
- Mise en place du layout portfolio v2 commun avec navigation et changement de langue.
- Remplacement de l'entree `/` par une page d'accueil v2.
- Rebranchement de la scene 3D sur l'accueil v2 avec fallback WebGL.
- Mise en place du code splitting vendor pour React, routing/i18n et scene 3D.

### En cours

- Tests de non-regression et d'integrite.
- Documentation projet mise a jour au fil de la migration.

### Prochaines etapes

- Faire une revue responsive complete des pages v2.
- Ajouter les tests de non-regression sur les parcours principaux.
- Finaliser le nettoyage des routes, fichiers et notes temporaires de migration.

## Notes de maintenance

- Ne pas reintroduire `react-scripts`.
- `dist/`, `node_modules/` et `.npm-cache/` sont ignores par Git.
- Les anciens fichiers JS/CSS/Redux de la v1 ont ete retires du code source v2.
- Mettre a jour ce README a chaque etape importante de migration.
