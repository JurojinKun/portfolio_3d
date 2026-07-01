const modernizationTasks = [
  "Vite",
  "React 19",
  "TypeScript strict",
  "Vitest",
  "ESLint",
] as const;

export function App() {
  return (
    <main className="app-shell">
      <section className="app-shell__content" aria-labelledby="app-title">
        <p className="app-shell__eyebrow">Portfolio v2</p>
        <h1 id="app-title">Socle technique initialise</h1>
        <p className="app-shell__description">
          La migration v2 demarre sur une base React moderne et typee. Les
          pages existantes seront portees progressivement dans les prochaines
          etapes.
        </p>
        <ul className="app-shell__list" aria-label="Socle installe">
          {modernizationTasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
