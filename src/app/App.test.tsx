import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { i18n } from "@/i18n";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders the v2 technical foundation and switches language", async () => {
    await i18n.changeLanguage("en");

    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /technical foundation initialized/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("React 19")).toBeInTheDocument();
    expect(screen.getByText("TypeScript strict")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "French" }));

    expect(
      await screen.findByRole("heading", {
        name: /socle technique initialise/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the not found page for unknown routes", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/unknown-route");

    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /you've probably got lost/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the about page route", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio/aboutme");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /about me/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/developer in the it world/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /about me/i })).toBeInTheDocument();
  });

  it("renders the skills page route and selects a skill", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio/skills");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /skills/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/self-taught apprenticeship/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /github/i }));

    expect(
      screen.getByText(/github is a code hosting platform/i),
    ).toBeInTheDocument();
  });

  it("renders the experiences page route", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio/experiences");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /experiences/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /mobile applications technical expert/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "CGI" })).toBeInTheDocument();
  });

  it("renders the projects page route and selects a project", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio/projects");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /professional projects/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sauve mon vaccin/i }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /gemu/i }));

    expect(screen.getByRole("heading", { name: /gemu/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/Gemu-Inc/Gemu_ui",
    );
  });

  it("renders the contact page route and validates required fields", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio/contactme");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /contact me/i }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(
      screen.getByText(/not all fields are filled in/i),
    ).toBeInTheDocument();
  });

  it("navigates between portfolio sections from the shared layout", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio/aboutme");

    render(<App />);

    await userEvent.click(screen.getByRole("link", { name: /skills/i }));

    expect(
      await screen.findByRole("heading", { name: /skills/i }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/portfolio/skills");
  });
});
