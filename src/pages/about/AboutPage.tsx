import astroAboutMe from "@/assets/astro_about_me.png";
import { aboutHighlights, aboutParagraphs } from "@/data/about";
import { useTranslation } from "react-i18next";

import styles from "./AboutPage.module.css";

interface AboutPageProps {
  asSection?: boolean;
  sectionId?: string;
}

export function AboutPage({ asSection = false, sectionId }: AboutPageProps) {
  const { t } = useTranslation();
  const Root = asSection ? "section" : "main";

  return (
    <Root
      className={styles.page}
      data-portfolio-section={asSection || undefined}
      id={sectionId}
    >
      <section className={styles.layout} aria-labelledby="about-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t("about_me.subtitle")}</p>
          <h1 id="about-title">{t("about_me.title")}</h1>

          <ul className={styles.highlights}>
            {aboutHighlights.map((highlightKey) => (
              <li key={highlightKey}>{t(highlightKey)}</li>
            ))}
          </ul>

          <div className={styles.paragraphs}>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.id}>{t(paragraph.textKey)}</p>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <img
            alt={t("about_me.title")}
            className={styles.astronaut}
            src={astroAboutMe}
          />
        </div>
      </section>
    </Root>
  );
}
