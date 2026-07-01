import { skillStorySections, skills, type SkillData } from "@/data/skills";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./SkillsPage.module.css";

const formatParagraph = (content: string) =>
  content.split("\n").filter((line) => line.trim().length > 0);

export function SkillsPage() {
  const { t } = useTranslation();
  const [selectedSkillId, setSelectedSkillId] = useState<SkillData["id"]>(
    skills[0].id,
  );
  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedSkillId) ?? skills[0],
    [selectedSkillId],
  );

  return (
    <main className={styles.page}>
      <section className={styles.header} aria-labelledby="skills-title">
        <p className={styles.eyebrow}>{t("skills.subtitle")}</p>
        <h1 id="skills-title">{t("skills.title")}</h1>
      </section>

      <section className={styles.layout}>
        <div className={styles.story} aria-label={t("skills.title")}>
          {skillStorySections.map((section) => (
            <article className={styles.storyCard} key={section.id}>
              <h2>{t(section.titleKey)}</h2>
              {formatParagraph(t(section.contentKey)).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>

        <aside className={styles.skillPanel} aria-label={selectedSkill.label}>
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
                <img alt="" src={skill.image} />
                <span>{skill.label}</span>
              </button>
            ))}
          </div>

          <article className={styles.detailCard}>
            <img
              alt=""
              className={styles.detailIcon}
              src={selectedSkill.image}
            />
            <div>
              <h2>{selectedSkill.label}</h2>
            </div>
            {formatParagraph(t(selectedSkill.contentKey)).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </aside>
      </section>
    </main>
  );
}
