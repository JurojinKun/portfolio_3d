import { lazy, Suspense, useEffect } from "react";

import styles from "./HomePage.module.css";

const HomeScene = lazy(() =>
  import("./scene/HomeScene").then((module) => ({ default: module.HomeScene })),
);

export function HomePage() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <main className={styles.page}>
      <Suspense fallback={null}>
        <HomeScene />
      </Suspense>
    </main>
  );
}
