import {
  personalProjects,
  professionalProjects,
  type ProjectData,
} from "@/data/projects";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ProjectsPage.module.css";

interface ProjectGridProps {
  id: ProjectData["category"];
  activeProjectId?: ProjectData["id"] | undefined;
  projects: readonly ProjectData[];
  title: string;
  subtitle: string;
  onSelectProject: (projectId: ProjectData["id"]) => void;
}

function ProjectGrid({
  activeProjectId,
  id,
  onSelectProject,
  projects: projectItems,
  subtitle,
  title,
}: ProjectGridProps) {
  const { t } = useTranslation();

  return (
    <section
      className={styles.projectGroup}
      aria-labelledby={`${id}-projects-title`}
      data-project-group={id}
    >
      <div className={styles.groupHeader}>
        <h2 id={`${id}-projects-title`}>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className={styles.groupBody}>
        <div className={styles.grid}>
          {projectItems.map((project) => (
            <button
              className={styles.projectCard}
              data-active={project.id === activeProjectId || undefined}
              key={project.id}
              onClick={() => {
                onSelectProject(project.id);
              }}
              aria-pressed={project.id === activeProjectId}
              style={{ borderColor: project.theme.primaryColor }}
              type="button"
            >
              <img alt="" src={project.image} />
              <span>{t(project.titleKey)}</span>
              <small>{t(project.summaryKey)}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectDetailProps {
  headingId?: string | undefined;
  onClose?: (() => void) | undefined;
  project: ProjectData;
}

function ProjectDetail({ headingId, onClose, project }: ProjectDetailProps) {
  const { t } = useTranslation();
  const categoryLabel =
    project.category === "professional"
      ? t("projects.title_pro")
      : t("projects.title_private");

  return (
    <aside
      className={styles.detail}
      id={`project-detail-${project.id}`}
      style={{ boxShadow: `0 24px 80px ${project.theme.shadowColor}` }}
    >
      {onClose ? (
        <button
          aria-label={t("projects.close_detail")}
          className={styles.detailCloseButton}
          onClick={onClose}
          type="button"
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
            <path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5Z" />
          </svg>
        </button>
      ) : null}
      <img alt={project.imageAlt} src={project.image} />
      <div className={styles.detailContent}>
        <div className={styles.detailHeader}>
          <p>{categoryLabel}</p>
          <h2 id={headingId}>{t(project.titleKey)}</h2>
        </div>

        <section>
          <h3>{t("projects.title_context_project")}</h3>
          <p>{t(project.contextKey)}</p>
        </section>
        <section>
          <h3>{t("projects.title_challenges_project")}</h3>
          <p>{t(project.challengesKey)}</p>
        </section>
        <section>
          <h3>{t("projects.title_results_project")}</h3>
          <p>{t(project.resultsKey)}</p>
        </section>

        {project.repositoryUrl ? (
          <a
            className={styles.repositoryLink}
            href={project.repositoryUrl}
            rel="noreferrer"
            target="_blank"
          >
            {t("projects.repository")}
          </a>
        ) : null}
      </div>
    </aside>
  );
}

interface ProjectDetailSheetProps {
  onClose: () => void;
  project: ProjectData;
}

function ProjectDetailSheet({ onClose, project }: ProjectDetailSheetProps) {
  const { t } = useTranslation();
  const headingId = `project-sheet-title-${project.id}`;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <button
        aria-label={t("projects.close_detail")}
        className={styles.sheetBackdrop}
        onClick={onClose}
        type="button"
      />
      <div
        aria-labelledby={headingId}
        aria-modal="true"
        className={styles.bottomSheet}
        role="dialog"
      >
        <ProjectDetail
          headingId={headingId}
          onClose={onClose}
          project={project}
        />
      </div>
    </>
  );
}

function useCloseProjectSheetOnDesktopChange(closeProjectSheet: () => void) {
  return useCallback(
    (matches: boolean) => {
      if (!matches) {
        closeProjectSheet();
      }
    },
    [closeProjectSheet],
  );
}

interface ProjectsPageProps {
  asSection?: boolean;
  sectionId?: string;
}

export function ProjectsPage({
  asSection = false,
  sectionId,
}: ProjectsPageProps) {
  const { t } = useTranslation();
  const [selectedDesktopProjectId, setSelectedDesktopProjectId] =
    useState<ProjectData["id"]>("sauve-mon-vaccin");
  const [sheetProjectId, setSheetProjectId] = useState<
    ProjectData["id"] | null
  >(null);
  const closeProjectSheet = useCallback(() => {
    setSheetProjectId(null);
  }, []);
  const handleProjectDetailModeChange =
    useCloseProjectSheetOnDesktopChange(closeProjectSheet);
  const isMobileProjectDetail = useMediaQuery(
    "(max-width: 900px)",
    false,
    handleProjectDetailModeChange,
  );
  const allProjects = useMemo(
    () => [...professionalProjects, ...personalProjects],
    [],
  );
  const selectedDesktopProject = useMemo(
    () =>
      allProjects.find((project) => project.id === selectedDesktopProjectId) ??
      professionalProjects[0],
    [allProjects, selectedDesktopProjectId],
  );
  const sheetProject = useMemo(
    () =>
      sheetProjectId
        ? allProjects.find((project) => project.id === sheetProjectId)
        : undefined,
    [allProjects, sheetProjectId],
  );
  const activeProjectId = isMobileProjectDetail
    ? sheetProject?.id
    : selectedDesktopProject?.id;
  const Root = asSection ? "section" : "main";

  const handleSelectProject = useCallback(
    (projectId: ProjectData["id"]) => {
      if (isMobileProjectDetail) {
        setSheetProjectId(projectId);
        return;
      }

      setSelectedDesktopProjectId(projectId);
    },
    [isMobileProjectDetail],
  );

  return (
    <Root
      className={styles.page}
      data-portfolio-section={asSection || undefined}
      id={sectionId}
    >
      <section className={styles.header} aria-labelledby="projects-title">
        <p className={styles.eyebrow}>{t("projects.subtitle_pro")}</p>
        <h1 id="projects-title">{t("satellites.projects")}</h1>
      </section>

      <div className={styles.layout}>
        <ProjectGrid
          activeProjectId={activeProjectId}
          id="professional"
          onSelectProject={handleSelectProject}
          projects={professionalProjects}
          subtitle={t("projects.subtitle_pro")}
          title={t("projects.title_pro")}
        />

        {!isMobileProjectDetail && selectedDesktopProject ? (
          <div className={styles.detailPanel}>
            <ProjectDetail project={selectedDesktopProject} />
          </div>
        ) : null}

        <ProjectGrid
          activeProjectId={activeProjectId}
          id="personal"
          onSelectProject={handleSelectProject}
          projects={personalProjects}
          subtitle={t("projects.subtitle_private")}
          title={t("projects.title_private")}
        />
      </div>

      {isMobileProjectDetail && sheetProject ? (
        <ProjectDetailSheet
          onClose={closeProjectSheet}
          project={sheetProject}
        />
      ) : null}
    </Root>
  );
}
