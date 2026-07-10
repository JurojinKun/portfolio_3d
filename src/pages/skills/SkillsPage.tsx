import { skills, type SkillData } from "@/data/skills";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./SkillsPage.module.css";

const formatParagraph = (content: string) =>
  content.split("\n").filter((line) => line.trim().length > 0);

interface SkillsPageProps {
  asSection?: boolean;
  sectionId?: string;
}

export function SkillsPage({ asSection = false, sectionId }: SkillsPageProps) {
  const { t } = useTranslation();
  const [selectedSkillId, setSelectedSkillId] = useState<SkillData["id"]>(
    skills[0].id,
  );
  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedSkillId) ?? skills[0],
    [selectedSkillId],
  );
  const Root = asSection ? "section" : "main";

  return (
    <Root
      className={styles.page}
      data-portfolio-section={asSection || undefined}
      id={sectionId}
    >
      <section className={styles.header} aria-labelledby="skills-title">
        <p className={styles.eyebrow}>{t("skills.subtitle")}</p>
        <h1 id="skills-title">{t("skills.title")}</h1>
      </section>

      <section className={styles.layout} aria-label={t("skills.title")}>
        <div className={styles.skillGrid}>
          {skills.map((skill) => (
            <button
              className={styles.skillButton}
              data-active={skill.id === selectedSkill.id}
              key={skill.id}
              onClick={() => {
                setSelectedSkillId(skill.id);
              }}
              type="button"
            >
              <span className={styles.skillLogo}>
                <img alt="" src={skill.image} />
              </span>
              <span className={styles.skillLabel}>{skill.label}</span>
            </button>
          ))}
        </div>

        <article className={styles.detailCard} aria-live="polite">
          <div className={styles.detailIconFrame}>
            <img
              alt=""
              className={styles.detailIcon}
              src={selectedSkill.image}
            />
          </div>
          <div>
            <h2>{selectedSkill.label}</h2>
          </div>
          {formatParagraph(t(selectedSkill.contentKey)).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>
    </Root>
  );
}
