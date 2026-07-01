import { portfolioSections } from "@/data/navigation";
import { isSupportedLanguage, supportedLanguages } from "@/i18n";
import { appMetadata } from "@/shared/config/appMetadata";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./PortfolioLayout.module.css";

export function PortfolioLayout() {
  const { i18n, t } = useTranslation();
  const navigationLinkClassName = styles.navigationLink ?? "";
  const activeNavigationLinkClassName = styles.activeNavigationLink ?? "";
  const currentLanguage = isSupportedLanguage(i18n.language)
    ? i18n.language
    : i18n.resolvedLanguage && isSupportedLanguage(i18n.resolvedLanguage)
      ? i18n.resolvedLanguage
      : "fr";

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <NavLink className={styles.brand ?? ""} to="/portfolio/aboutme">
          <span>{appMetadata.versionLabel}</span>
          <strong>{appMetadata.name}</strong>
        </NavLink>

        <nav className={styles.navigation} aria-label={t("portfolio.menu")}>
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
              to={section.route}
            >
              <img alt="" src={section.iconPath} />
              <span>{t(section.labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.languageActions} aria-label="Language">
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
      </header>

      <Outlet />
    </div>
  );
}
