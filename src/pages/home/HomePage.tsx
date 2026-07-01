import profilePicture from "@/assets/profile_picture.png";
import { portfolioSections } from "@/data/navigation";
import { appMetadata } from "@/shared/config/appMetadata";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./HomePage.module.css";

export function HomePage() {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{appMetadata.owner}</p>
          <h1 id="home-title">
            {t("overview.hello")} <span>0ruj</span>
          </h1>
          <div className={styles.intro}>
            <p>{t("overview.first_para")}</p>
            <p>{t("overview.second_para")}</p>
            <p>{t("overview.third_para")}</p>
          </div>

          <div className={styles.actions}>
            <Link className={styles.primaryAction} to="/portfolio/aboutme">
              {t("overview.embark")}
            </Link>
            <Link className={styles.secondaryAction} to="/portfolio/projects">
              {t("satellites.projects")}
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <img alt={appMetadata.owner} src={profilePicture} />
        </div>
      </section>

      <nav className={styles.sectionLinks} aria-label={t("portfolio.menu")}>
        {portfolioSections.map((section) => (
          <Link key={section.id} to={section.route}>
            <img alt="" src={section.iconPath} />
            <span>{t(section.labelKey)}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
