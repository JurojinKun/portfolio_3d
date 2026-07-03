import { experiences } from "@/data/experiences";
import { useTranslation } from "react-i18next";

import styles from "./ExperiencesPage.module.css";

const referenceSeparators = ["Référence:", "Reference:"] as const;

const splitReference = (point: string) => {
  const separator = referenceSeparators.find((candidate) =>
    point.includes(candidate),
  );

  if (!separator) {
    return {
      description: point,
    };
  }

  const [description = "", reference = ""] = point.split(separator);

  return {
    description: description.trim(),
    reference: `${separator} ${reference.trim()}`,
  };
};

interface ExperiencePointProps {
  point: string;
}

function ExperiencePoint({ point }: ExperiencePointProps) {
  const { description, reference } = splitReference(point);

  return (
    <>
      <span>{description}</span>
      {reference ? <strong>{reference}</strong> : null}
    </>
  );
}

interface ExperiencesPageProps {
  asSection?: boolean;
  sectionId?: string;
}

export function ExperiencesPage({
  asSection = false,
  sectionId,
}: ExperiencesPageProps) {
  const { t } = useTranslation();
  const Root = asSection ? "section" : "main";

  return (
    <Root
      className={styles.page}
      data-portfolio-section={asSection || undefined}
      id={sectionId}
    >
      <section className={styles.header} aria-labelledby="experiences-title">
        <p className={styles.eyebrow}>{t("experiences.subtitle")}</p>
        <h1 id="experiences-title">{t("experiences.title")}</h1>
      </section>

      <section className={styles.timeline} aria-label={t("experiences.title")}>
        {experiences.map((experience) => (
          <article className={styles.card} key={experience.id}>
            <div
              className={styles.logoFrame}
              style={{ backgroundColor: experience.iconBackgroundColor }}
            >
              <img alt={experience.iconAlt} src={experience.icon} />
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>{t(experience.titleKey)}</h2>
                  <p className={styles.company}>{t(experience.companyKey)}</p>
                </div>
                <p className={styles.date}>{t(experience.dateKey)}</p>
              </div>

              <ul className={styles.points}>
                {experience.pointKeys.map((pointKey) => (
                  <li key={pointKey}>
                    <ExperiencePoint point={t(pointKey)} />
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </Root>
  );
}
