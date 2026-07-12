import { skills, type SkillData } from "@/data/skills";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./SkillsPage.module.css";

const formatParagraph = (content: string) =>
  content.split("\n").filter((line) => line.trim().length > 0);

interface SkillsPageProps {
  asSection?: boolean;
  sectionId?: string;
}

interface SkillDetailProps {
  className?: string | undefined;
  id: string;
  skill: SkillData;
}

function SkillDetail({ className, id, skill }: SkillDetailProps) {
  const { t } = useTranslation();
  const detailClassName = className
    ? [styles.detailCard, className].join(" ")
    : styles.detailCard;

  return (
    <article className={detailClassName} id={id} aria-live="polite">
      <div className={styles.detailIconFrame}>
        <img alt="" className={styles.detailIcon} src={skill.image} />
      </div>
      <div>
        <h2>{skill.label}</h2>
      </div>
      {formatParagraph(t(skill.contentKey)).map((paragraph, index) => (
        <p key={`${skill.id}-${String(index)}`}>{paragraph}</p>
      ))}
    </article>
  );
}

export function SkillsPage({ asSection = false, sectionId }: SkillsPageProps) {
  const { t } = useTranslation();
  const [selectedSkillId, setSelectedSkillId] = useState<
    SkillData["id"] | null
  >(null);
  const clearMobileSelection = useCallback((matches: boolean) => {
    if (matches) {
      setSelectedSkillId(null);
    }
  }, []);
  const isInlineSkillDetail = useMediaQuery(
    "(max-width: 980px)",
    false,
    clearMobileSelection,
  );
  const selectedSkill = useMemo(() => {
    if (isInlineSkillDetail && selectedSkillId === null) {
      return undefined;
    }

    return skills.find((skill) => skill.id === selectedSkillId) ?? skills[0];
  }, [isInlineSkillDetail, selectedSkillId]);
  const selectedSkillDetailId = selectedSkill
    ? `skill-detail-${selectedSkill.id}`
    : undefined;
  const handleSelectSkill = useCallback(
    (skillId: SkillData["id"]) => {
      setSelectedSkillId((currentSkillId) => {
        if (isInlineSkillDetail && currentSkillId === skillId) {
          return null;
        }

        return skillId;
      });
    },
    [isInlineSkillDetail],
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
          {skills.map((skill) => {
            const isSelected = skill.id === selectedSkill?.id;
            const controlledDetailId = selectedSkillDetailId
              ? isInlineSkillDetail
                ? `${selectedSkillDetailId}-inline`
                : `${selectedSkillDetailId}-desktop`
              : undefined;

            return (
              <div className={styles.skillItem} key={skill.id}>
                <button
                  aria-controls={
                    isSelected && controlledDetailId
                      ? controlledDetailId
                      : undefined
                  }
                  aria-expanded={isInlineSkillDetail ? isSelected : undefined}
                  aria-pressed={isSelected}
                  className={styles.skillButton}
                  data-active={isSelected || undefined}
                  onClick={() => {
                    handleSelectSkill(skill.id);
                  }}
                  type="button"
                >
                  <span className={styles.skillLogo}>
                    <img alt="" src={skill.image} />
                  </span>
                  <span className={styles.skillLabel}>{skill.label}</span>
                </button>

                {isInlineSkillDetail && isSelected && selectedSkillDetailId ? (
                  <SkillDetail
                    className={styles.inlineDetailCard}
                    id={`${selectedSkillDetailId}-inline`}
                    skill={skill}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        {!isInlineSkillDetail && selectedSkill && selectedSkillDetailId ? (
          <div className={styles.detailPanel}>
            <SkillDetail
              id={`${selectedSkillDetailId}-desktop`}
              skill={selectedSkill}
            />
          </div>
        ) : null}
      </section>
    </Root>
  );
}
