import {
  personalProjects,
  professionalProjects,
  type ProjectData,
} from "@/data/projects";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ProjectsPage.module.css";

interface ProjectGridProps {
  id: ProjectData["category"];
  projects: readonly ProjectData[];
  selectedProjectId: ProjectData["id"];
  selectedProject?: ProjectData | undefined;
  title: string;
  subtitle: string;
  onSelectProject: (projectId: ProjectData["id"]) => void;
}

function ProjectGrid({
  id,
  onSelectProject,
  projects: projectItems,
  selectedProjectId,
  selectedProject,
  subtitle,
  title,
}: ProjectGridProps) {
  const { t } = useTranslation();

  return (
    <section
      className={styles.projectGroup}
      aria-labelledby={`${id}-projects-title`}
      data-selected={selectedProject ? true : undefined}
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
              data-active={project.id === selectedProjectId}
              key={project.id}
              onClick={() => {
                onSelectProject(project.id);
              }}
              style={{ borderColor: project.theme.primaryColor }}
              type="button"
            >
              <img alt="" src={project.image} />
              <span>{t(project.titleKey)}</span>
              <small>{t(project.summaryKey)}</small>
            </button>
          ))}
        </div>

        {selectedProject ? <ProjectDetail project={selectedProject} /> : null}
      </div>
    </section>
  );
}

interface ProjectDetailProps {
  project: ProjectData;
}

function ProjectDetail({ project }: ProjectDetailProps) {
  const { t } = useTranslation();
  const categoryLabel =
    project.category === "professional"
      ? t("projects.title_pro")
      : t("projects.title_private");

  return (
    <aside
      className={styles.detail}
      data-without-repository={!project.repositoryUrl || undefined}
      id={`project-detail-${project.id}`}
      style={{ boxShadow: `0 24px 80px ${project.theme.shadowColor}` }}
    >
      <img alt={project.imageAlt} src={project.image} />
      <div className={styles.detailHeader}>
        <p>{categoryLabel}</p>
        <h2>{t(project.titleKey)}</h2>
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
    </aside>
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
  const [selectedProfessionalProjectId, setSelectedProfessionalProjectId] =
    useState<ProjectData["id"]>("sauve-mon-vaccin");
  const [selectedPersonalProjectId, setSelectedPersonalProjectId] =
    useState<ProjectData["id"]>("gemu");
  const selectedProfessionalProject = useMemo(
    () =>
      professionalProjects.find(
        (project) => project.id === selectedProfessionalProjectId,
      ) ?? professionalProjects[0],
    [selectedProfessionalProjectId],
  );
  const selectedPersonalProject = useMemo(
    () =>
      personalProjects.find(
        (project) => project.id === selectedPersonalProjectId,
      ) ?? personalProjects[0],
    [selectedPersonalProjectId],
  );
  const Root = asSection ? "section" : "main";

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
        <div className={styles.groups}>
          <ProjectGrid
            id="professional"
            onSelectProject={setSelectedProfessionalProjectId}
            projects={professionalProjects}
            selectedProjectId={
              selectedProfessionalProject?.id ?? "sauve-mon-vaccin"
            }
            selectedProject={selectedProfessionalProject}
            subtitle={t("projects.subtitle_pro")}
            title={t("projects.title_pro")}
          />
          <ProjectGrid
            id="personal"
            onSelectProject={setSelectedPersonalProjectId}
            projects={personalProjects}
            selectedProjectId={selectedPersonalProject?.id ?? "gemu"}
            selectedProject={selectedPersonalProject}
            subtitle={t("projects.subtitle_private")}
            title={t("projects.title_private")}
          />
        </div>
      </div>
    </Root>
  );
}
