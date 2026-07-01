import { AboutPage } from "@/pages/about/AboutPage";
import { ExperiencesPage } from "@/pages/experiences/ExperiencesPage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { ProjectsPage } from "@/pages/projects/ProjectsPage";
import { SkillsPage } from "@/pages/skills/SkillsPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { MigrationStatus } from "./MigrationStatus";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MigrationStatus />} path="/" />
        <Route
          element={<Navigate replace to="/portfolio/aboutme" />}
          path="/portfolio"
        />
        <Route element={<AboutPage />} path="/portfolio/aboutme" />
        <Route element={<SkillsPage />} path="/portfolio/skills" />
        <Route element={<ExperiencesPage />} path="/portfolio/experiences" />
        <Route element={<ProjectsPage />} path="/portfolio/projects" />
        <Route element={<NotFoundPage />} path="/notfound" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
