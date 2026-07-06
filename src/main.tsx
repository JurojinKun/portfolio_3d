import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/App";
import "./i18n";
import "./styles/global.css";

const threeClockDeprecationWarning =
  "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.";

function installThreeClockWarningFilter() {
  const originalWarn = console.warn.bind(console) as (
    ...messages: unknown[]
  ) => void;

  console.warn = (...messages: unknown[]) => {
    const isThreeClockWarning = messages.some(
      (message) =>
        typeof message === "string" &&
        message.includes(threeClockDeprecationWarning),
    );

    if (isThreeClockWarning) {
      return;
    }

    originalWarn(...messages);
  };
}

installThreeClockWarningFilter();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
