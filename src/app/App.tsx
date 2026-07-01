import { AboutPage } from "@/pages/about/AboutPage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
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
        <Route element={<NotFoundPage />} path="/notfound" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
