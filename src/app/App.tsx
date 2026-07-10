import { HomePage } from "@/pages/home/HomePage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { PortfolioLayout } from "@/pages/portfolio/PortfolioLayout";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
import { preloadAppImages } from "@/shared/assets/imagePreloader";
import {
  Component,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import styles from "./App.module.css";

const appSessionStorageKey = "isSessionActive:v2-image-preload-20260710";
const initialLoaderMinimumDurationMs = 1000;

function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function App() {
  return (
    <AppBootstrap>
      <BrowserRouter>
        <AppErrorBoundary>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<PortfolioLayout />}>
              <Route element={<PortfolioPage />} path=":sectionId" />
            </Route>
            <Route element={<NotFoundPage />} path="/notfound" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </AppErrorBoundary>
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

    let isMounted = true;

    void waitForInitialAssets().then(() => {
      if (!isMounted) {
        return;
      }

      window.sessionStorage.setItem(appSessionStorageKey, JSON.stringify(true));
      setIsReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, [isReady]);

  if (!isReady) {
    return <InitialLoadingScreen />;
  }

  return children;
}

function waitForInitialAssets() {
  return Promise.all([
    preloadAppImages(),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, initialLoaderMinimumDurationMs);
    }),
  ]).then(() => undefined);
}

function shouldShowInitialLoader() {
  if (import.meta.env.MODE === "test" || typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(appSessionStorageKey) !== "true";
}

function InitialLoadingScreen() {
  return (
    <main
      aria-busy="true"
      aria-label="Chargement de l'application"
      className={styles.loadingScreen}
    >
      <div className={styles.atomLoader} aria-hidden="true">
        <div className={cx(styles.orbit, styles.orbitOne)} />
        <div className={cx(styles.orbit, styles.orbitTwo)} />
        <div className={cx(styles.orbit, styles.orbitThree)} />
        <div className={styles.nucleus}>
          <span />
        </div>
        <div className={styles.energyParticles}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </main>
  );
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<
  { children: ReactNode },
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Application rendering failed", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <SiteProblemFallback />;
    }

    return this.props.children;
  }
}

function SiteProblemFallback() {
  const { t } = useTranslation();

  const reloadPage = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <main className={styles.siteFallbackPage}>
      <section
        aria-labelledby="site-problem-title"
        className={styles.siteFallbackPanel}
      >
        <p className={styles.siteFallbackEyebrow}>
          {t("fallbacks.site_error_label")}
        </p>
        <h1 id="site-problem-title">{t("fallbacks.site_error_title")}</h1>
        <p>{t("fallbacks.site_error_content")}</p>
        <div className={styles.siteFallbackActions}>
          <Link className={styles.siteFallbackLink} to="/">
            {t("not_found.back_home")}
          </Link>
          <button
            className={styles.siteFallbackButton}
            onClick={reloadPage}
            type="button"
          >
            {t("fallbacks.reload")}
          </button>
        </div>
      </section>
    </main>
  );
}
