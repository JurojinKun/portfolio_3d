import { HomePage } from "@/pages/home/HomePage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { PortfolioLayout } from "@/pages/portfolio/PortfolioLayout";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
import { useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import styles from "./App.module.css";
import { MigrationStatus } from "./MigrationStatus";

const appSessionStorageKey = "isSessionActive";

function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function App() {
  return (
    <AppBootstrap>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<MigrationStatus />} path="/migration" />
          <Route element={<PortfolioLayout />} path="/portfolio">
            <Route index element={<Navigate replace to="aboutme" />} />
            <Route element={<PortfolioPage />} path=":sectionId" />
          </Route>
          <Route element={<NotFoundPage />} path="/notfound" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </BrowserRouter>
    </AppBootstrap>
  );
}

function AppBootstrap({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(() => !shouldShowInitialLoader());

  useEffect(() => {
    if (isReady) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      window.sessionStorage.setItem(appSessionStorageKey, JSON.stringify(true));
      setIsReady(true);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isReady]);

  if (!isReady) {
    return <InitialLoadingScreen />;
  }

  return children;
}

function shouldShowInitialLoader() {
  if (import.meta.env.MODE === "test" || typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(appSessionStorageKey) !== "true";
}

function InitialLoadingScreen() {
  const language =
    typeof window === "undefined" ? "en" : window.navigator.language;
  const loadingLabel = language.startsWith("fr") ? "Chargement" : "Loading";

  return (
    <main className={styles.loadingScreen}>
      <div className={styles.atom} aria-hidden="true">
        <div className={cx(styles.line, styles.lineOne)} />
        <div className={cx(styles.line, styles.lineTwo)} />
        <div className={cx(styles.line, styles.lineThree)} />
      </div>
      <div className={styles.loadingContent}>
        <span>{loadingLabel}</span>
        <span className={styles.ellipsis} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>
    </main>
  );
}
