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
const PROGRAMMATIC_SCROLL_DELAY_MS = 680;

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
  const anchorTop = getPortfolioHeaderOffset() + SECTION_SCROLL_GAP + 8;
  let activeSectionId: PortfolioSectionId = "aboutme";

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
      if (isProgrammaticScrollRef.current || !hasScrollableLayout()) {
        return;
      }

      const activeSectionId = getActivePortfolioSectionId();

      if (activeSectionId !== latestSectionIdRef.current) {
        latestSectionIdRef.current = activeSectionId;
        isUrlUpdateFromScrollRef.current = true;
        void navigate(`/portfolio/${activeSectionId}`, {
          replace: true,
        });
      }
    };

    const frameId = window.requestAnimationFrame(updateActiveSection);

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
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
