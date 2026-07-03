import { portfolioSections } from "@/data/navigation";
import { isSupportedLanguage, supportedLanguages } from "@/i18n";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./PortfolioLayout.module.css";

const compactNavigationQuery = "(max-width: 1100px)";

function isCompactNavigationViewport() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(compactNavigationQuery).matches
  );
}

export function PortfolioLayout() {
  const { i18n, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompactNavigation, setIsCompactNavigation] = useState(
    isCompactNavigationViewport,
  );
  const isCompactMenuOpen = isCompactNavigation && isMenuOpen;
  const navigationLinkClassName = styles.navigationLink ?? "";
  const activeNavigationLinkClassName = styles.activeNavigationLink ?? "";
  const currentLanguage = isSupportedLanguage(i18n.language)
    ? i18n.language
    : i18n.resolvedLanguage && isSupportedLanguage(i18n.resolvedLanguage)
      ? i18n.resolvedLanguage
      : "fr";

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(compactNavigationQuery);
    const syncNavigationMode = () => {
      setIsCompactNavigation(mediaQueryList.matches);

      if (!mediaQueryList.matches) {
        setIsMenuOpen(false);
      }
    };

    syncNavigationMode();
    mediaQueryList.addEventListener("change", syncNavigationMode);

    return () => {
      mediaQueryList.removeEventListener("change", syncNavigationMode);
    };
  }, []);

  useEffect(() => {
    if (!isCompactMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCompactMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleTopNavigation = () => {
    closeMenu();

    if (
      typeof window === "undefined" ||
      typeof window.scrollTo !== "function"
    ) {
      return;
    }

    window.requestAnimationFrame(() => {
      try {
        window.scrollTo({
          behavior:
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
          top: 0,
        });
      } catch {
        window.scrollTo(0, 0);
      }
    });
  };

  const languageControls = (className: string) => (
    <div className={className} aria-label="Language">
      {supportedLanguages.map((language) => (
        <button
          className={styles.languageButton}
          data-active={language === currentLanguage}
          key={language}
          onClick={() => {
            void i18n.changeLanguage(language);
          }}
          type="button"
        >
          {t(`languages.${language === "fr" ? "french" : "english"}`)}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className={styles.shell}
      data-menu-open={isCompactMenuOpen || undefined}
    >
      <button
        className={styles.menuBackdrop}
        type="button"
        aria-label={t("portfolio.menu")}
        data-open={isCompactMenuOpen || undefined}
        onClick={closeMenu}
      />

      <header className={styles.header} data-portfolio-header>
        <div className={styles.quickLinks} aria-label="Portfolio">
          <NavLink
            className={styles.quickLink ?? ""}
            onClick={handleTopNavigation}
            title={t("portfolio.top")}
            aria-label={t("portfolio.top")}
            to="/portfolio/aboutme"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
              <path d="M5 4h14v2H5V4Zm7 4.25 6 6-1.4 1.42L13 12.08V21h-2v-8.92l-3.6 3.59L6 14.25l6-6Z" />
            </svg>
          </NavLink>

          <Link
            className={styles.quickLink}
            onClick={closeMenu}
            title={t("portfolio.home")}
            aria-label={t("portfolio.home")}
            to="/"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
              <path d="M4.5 10.5 12 4.5l7.5 6V20h-5v-5.5h-5V20h-5v-9.5Z" />
            </svg>
          </Link>
        </div>

        <button
          className={styles.menuButton}
          type="button"
          aria-controls="portfolio-navigation"
          aria-expanded={isCompactMenuOpen}
          aria-label={t("portfolio.menu")}
          onClick={() => {
            setIsMenuOpen((currentValue) => !currentValue);
          }}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={styles.navigation}
          id="portfolio-navigation"
          aria-label={t("portfolio.menu")}
          data-open={isCompactMenuOpen || undefined}
        >
          {portfolioSections.map((section) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? [navigationLinkClassName, activeNavigationLinkClassName]
                      .filter(Boolean)
                      .join(" ")
                  : navigationLinkClassName
              }
              key={section.id}
              onClick={closeMenu}
              to={section.route}
            >
              <img alt="" src={section.iconPath} />
              <span>{t(section.labelKey)}</span>
            </NavLink>
          ))}
          {languageControls(styles.mobileLanguageActions ?? "")}
        </nav>

        {languageControls(styles.languageActions ?? "")}
      </header>

      <Outlet />
    </div>
  );
}
