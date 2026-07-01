import { appMetadata } from "@/shared/config/appMetadata";
import { technicalStack } from "@/shared/config/technicalStack";

import styles from "./App.module.css";

export function App() {
  return (
    <main className={styles.shell}>
      <section className={styles.content} aria-labelledby="app-title">
        <p className={styles.eyebrow}>{appMetadata.versionLabel}</p>
        <h1 id="app-title">Socle technique initialise</h1>
        <p className={styles.description}>
          La migration v2 demarre sur une base React moderne et typee. Les pages
          existantes seront portees progressivement dans les prochaines etapes.
        </p>
        <ul className={styles.list} aria-label="Socle installe">
          {technicalStack.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
