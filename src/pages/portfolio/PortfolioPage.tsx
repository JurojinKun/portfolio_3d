import { AboutPage } from "@/pages/about/AboutPage";
import { ContactPage } from "@/pages/contact/ContactPage";
import { ExperiencesPage } from "@/pages/experiences/ExperiencesPage";
import { ProjectsPage } from "@/pages/projects/ProjectsPage";
import { SkillsPage } from "@/pages/skills/SkillsPage";
import { portfolioSections, type PortfolioSectionId } from "@/data/navigation";
import { useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import styles from "./PortfolioPage.module.css";

const HEADER_FALLBACK_OFFSET = 76;
const SECTION_SCROLL_GAP = 24;
const PROGRAMMATIC_SCROLL_DELAY_MS = 1100;
const MIN_VISIBLE_SECTION_HEIGHT = 24;

function isPortfolioSectionId(
  value: string | undefined,
): value is PortfolioSectionId {
  return portfolioSections.some((section) => section.id === value);
}

function getScrollBehavior(): ScrollBehavior {
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return "auto";
  }

  return "smooth";
}

function hasScrollableLayout() {
  return document.documentElement.scrollHeight > window.innerHeight + 1;
}

function getPortfolioHeaderOffset() {
  const headerElement = document.querySelector<HTMLElement>(
    "[data-portfolio-header]",
  );

  return (
    headerElement?.getBoundingClientRect().height ?? HEADER_FALLBACK_OFFSET
  );
}

function isAtScrollablePageEnd() {
  return (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 4
  );
}

function scrollToPortfolioSection(sectionId: PortfolioSectionId) {
  const targetElement = document.getElementById(sectionId);

  if (!targetElement || !hasScrollableLayout()) {
    return;
  }

  const scrollTop =
    targetElement.getBoundingClientRect().top +
    window.scrollY -
    getPortfolioHeaderOffset() -
    SECTION_SCROLL_GAP;

  try {
    window.scrollTo({
      behavior: getScrollBehavior(),
      top: Math.max(0, scrollTop),
    });
  } catch {
    window.scrollTo(0, Math.max(0, scrollTop));
  }
}

function getActivePortfolioSectionId() {
  if (isAtScrollablePageEnd()) {
    return portfolioSections[portfolioSections.length - 1]?.id ?? "aboutme";
  }

  const viewportTop = getPortfolioHeaderOffset() + SECTION_SCROLL_GAP;
  const viewportBottom = window.innerHeight;
  let activeSectionId: PortfolioSectionId = "aboutme";
  let activeVisibleHeight = 0;

  for (const section of portfolioSections) {
    const sectionElement = document.getElementById(section.id);

    if (!sectionElement) {
      continue;
    }

    const sectionRect = sectionElement.getBoundingClientRect();
    const visibleTop = Math.max(sectionRect.top, viewportTop);
    const visibleBottom = Math.min(sectionRect.bottom, viewportBottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (visibleHeight >= activeVisibleHeight + 1) {
      activeVisibleHeight = visibleHeight;
      activeSectionId = section.id;
    }
  }

  if (activeVisibleHeight >= MIN_VISIBLE_SECTION_HEIGHT) {
    return activeSectionId;
  }

  const anchorTop =
    getPortfolioHeaderOffset() +
    Math.min(window.innerHeight * 0.28, 220) +
    SECTION_SCROLL_GAP;

  for (const section of portfolioSections) {
    const sectionElement = document.getElementById(section.id);

    if (
      sectionElement &&
      sectionElement.getBoundingClientRect().top <= anchorTop
    ) {
      activeSectionId = section.id;
    }
  }

  return activeSectionId;
}

export function PortfolioPage() {
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId?: string }>();
  const latestSectionIdRef = useRef<string | undefined>(sectionId);
  const isProgrammaticScrollRef = useRef(false);
  const isUrlUpdateFromScrollRef = useRef(false);
  const scrollReleaseTimeoutRef = useRef<number | undefined>(undefined);
  const activeSectionFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    latestSectionIdRef.current = sectionId;
  }, [sectionId]);

  useEffect(() => {
    if (!isPortfolioSectionId(sectionId)) {
      return undefined;
    }

    if (isUrlUpdateFromScrollRef.current) {
      isUrlUpdateFromScrollRef.current = false;
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      isProgrammaticScrollRef.current = true;
      scrollToPortfolioSection(sectionId);

      window.clearTimeout(scrollReleaseTimeoutRef.current);
      scrollReleaseTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, PROGRAMMATIC_SCROLL_DELAY_MS);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [sectionId]);

  useEffect(() => {
    if (!isPortfolioSectionId(sectionId)) {
      return undefined;
    }

    const updateActiveSection = () => {
      activeSectionFrameRef.current = undefined;

      if (isProgrammaticScrollRef.current || !hasScrollableLayout()) {
        return;
      }

      const activeSectionId = getActivePortfolioSectionId();

      if (activeSectionId !== latestSectionIdRef.current) {
        latestSectionIdRef.current = activeSectionId;
        isUrlUpdateFromScrollRef.current = true;
        void navigate(`/${activeSectionId}`, {
          replace: true,
        });
      }
    };

    const scheduleActiveSectionUpdate = () => {
      if (activeSectionFrameRef.current !== undefined) {
        return;
      }

      activeSectionFrameRef.current =
        window.requestAnimationFrame(updateActiveSection);
    };

    scheduleActiveSectionUpdate();

    window.addEventListener("scroll", scheduleActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleActiveSectionUpdate);

    return () => {
      if (activeSectionFrameRef.current !== undefined) {
        window.cancelAnimationFrame(activeSectionFrameRef.current);
        activeSectionFrameRef.current = undefined;
      }

      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
    };
  }, [navigate, sectionId]);

  if (!isPortfolioSectionId(sectionId)) {
    return <Navigate replace to="/notfound" />;
  }

  return (
    <main className={styles.page}>
      <AboutPage asSection sectionId="aboutme" />
      <ExperiencesPage asSection sectionId="experiences" />
      <SkillsPage asSection sectionId="skills" />
      <ProjectsPage asSection sectionId="projects" />
      <ContactPage asSection sectionId="contactme" />
    </main>
  );
}
