import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { portfolioSections } from "@/data/navigation";
import {
  defaultLanguage,
  isSupportedLanguage,
  supportedLanguages,
} from "@/i18n";

import styles from "./HomeScene.module.css";

export function HomeSceneFallback() {
  const { i18n, t } = useTranslation();
  const currentLanguage = isSupportedLanguage(i18n.language)
    ? i18n.language
    : i18n.resolvedLanguage && isSupportedLanguage(i18n.resolvedLanguage)
      ? i18n.resolvedLanguage
      : defaultLanguage;

  return (
    <section className={styles.fallback} aria-labelledby="fallback-home-title">
      <div className={styles.fallbackContent}>
        <div aria-label="Language" className={styles.fallbackLanguageActions}>
          {supportedLanguages.map((language) => (
            <button
              className={styles.fallbackLanguageButton}
              data-active={language === currentLanguage}
              data-language={language.toUpperCase()}
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
        <h1 id="fallback-home-title">Clément Communay | Portfolio</h1>
        <nav className={styles.fallbackLinks} aria-label={t("portfolio.menu")}>
          {portfolioSections.map((section) => (
            <Link key={section.id} to={section.route}>
              {t(section.labelKey)}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
