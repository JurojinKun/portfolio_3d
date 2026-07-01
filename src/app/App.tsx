import { isSupportedLanguage, supportedLanguages } from "@/i18n";
import { appMetadata } from "@/shared/config/appMetadata";
import { technicalStack } from "@/shared/config/technicalStack";
import { useTranslation } from "react-i18next";

import styles from "./App.module.css";

export function App() {
  const { i18n, t } = useTranslation();
  const currentLanguage = isSupportedLanguage(i18n.language)
    ? i18n.language
    : i18n.resolvedLanguage && isSupportedLanguage(i18n.resolvedLanguage)
      ? i18n.resolvedLanguage
      : "fr";

  return (
    <main className={styles.shell}>
      <section className={styles.content} aria-labelledby="app-title">
        <p className={styles.eyebrow}>{appMetadata.versionLabel}</p>
        <h1 id="app-title">{t("migration.title")}</h1>
        <p className={styles.description}>{t("migration.description")}</p>
        <ul className={styles.list} aria-label={t("migration.stack_label")}>
          {technicalStack.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
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
      </section>
    </main>
  );
}
