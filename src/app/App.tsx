import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MigrationStatus } from "./MigrationStatus";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MigrationStatus />} path="/" />
        <Route element={<NotFoundPage />} path="/notfound" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
