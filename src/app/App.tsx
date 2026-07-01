import { AboutPage } from "@/pages/about/AboutPage";
import { ContactPage } from "@/pages/contact/ContactPage";
import { ExperiencesPage } from "@/pages/experiences/ExperiencesPage";
import { HomePage } from "@/pages/home/HomePage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { PortfolioLayout } from "@/pages/portfolio/PortfolioLayout";
import { ProjectsPage } from "@/pages/projects/ProjectsPage";
import { SkillsPage } from "@/pages/skills/SkillsPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { MigrationStatus } from "./MigrationStatus";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<MigrationStatus />} path="/migration" />
        <Route element={<PortfolioLayout />} path="/portfolio">
          <Route index element={<Navigate replace to="aboutme" />} />
          <Route element={<AboutPage />} path="aboutme" />
          <Route element={<SkillsPage />} path="skills" />
          <Route element={<ExperiencesPage />} path="experiences" />
          <Route element={<ProjectsPage />} path="projects" />
          <Route element={<ContactPage />} path="contactme" />
        </Route>
        <Route element={<NotFoundPage />} path="/notfound" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
