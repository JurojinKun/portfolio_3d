import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { i18n } from "@/i18n";
import { App } from "./App";

const compactNavigationQuery = "(max-width: 1100px)";

function mockMatchMedia(initialMatches: boolean) {
  let currentMatches = initialMatches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => {
      const mediaQueryList = {
        get matches() {
          return query === compactNavigationQuery ? currentMatches : false;
        },
        media: query,
        onchange: null,
        addEventListener: (
          eventType: string,
          listener: EventListenerOrEventListenerObject,
        ) => {
          if (eventType === "change" && typeof listener === "function") {
            listeners.add(listener);
          }
        },
        removeEventListener: (
          eventType: string,
          listener: EventListenerOrEventListenerObject,
        ) => {
          if (eventType === "change" && typeof listener === "function") {
            listeners.delete(listener);
          }
        },
        addListener: (listener: (event: MediaQueryListEvent) => void) => {
          listeners.add(listener);
        },
        removeListener: (listener: (event: MediaQueryListEvent) => void) => {
          listeners.delete(listener);
        },
        dispatchEvent: () => true,
      } satisfies Partial<MediaQueryList>;

      return mediaQueryList as MediaQueryList;
    }),
  );

  return {
    setMatches(matches: boolean) {
      currentMatches = matches;
      const event = {
        matches,
        media: compactNavigationQuery,
      } as MediaQueryListEvent;

      listeners.forEach((listener) => {
        listener(event);
      });
    },
  };
}

describe("App", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.style.overflow = "";
  });

  it("renders the v2 home page", async () => {
    await i18n.changeLanguage("en");

    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: /clément communay \| portfolio/i,
      }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /about me/i }),
    ).toHaveAttribute("href", "/portfolio/aboutme");
  });

  it("does not expose the temporary migration status route anymore", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/migration");

    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: /you've probably got lost/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute(
      "href",
      "/",
    );
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
    expect(
      screen.getByText(/product-minded mobile \/ front-end engineer/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /about me/i })).toBeInTheDocument();
  });

  it("redirects the portfolio index route to the about section", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio");

    render(<App />);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/portfolio/aboutme");
    });
    expect(
      screen.getByRole("heading", { name: /about me/i }),
    ).toBeInTheDocument();
  });

  it("redirects unknown portfolio sections to the not found page", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio/unknown-section");

    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: /you've probably got lost/i,
      }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/notfound");
  });

  it("renders the skills page route and selects a skill", async () => {
    await i18n.changeLanguage("en");
    window.history.pushState({}, "", "/portfolio/skills");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /skills/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^react$/i }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /^github$/i }));

    expect(
      screen.getByText(/github is my main environment/i),
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
        name: /mobile application technical expert/i,
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

  it("opens and closes the compact portfolio menu", async () => {
    await i18n.changeLanguage("en");
    const mediaQueryController = mockMatchMedia(true);
    const user = userEvent.setup();

    window.history.pushState({}, "", "/portfolio/aboutme");
    render(<App />);

    const menuButton = screen
      .getAllByRole("button", { name: /^menu$/i })
      .find(
        (button) =>
          button.getAttribute("aria-controls") === "portfolio-navigation",
      );

    if (!menuButton) {
      throw new Error("Portfolio menu button was not found");
    }

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
      expect(document.body.style.overflow).toBe("hidden");
    });

    await user.click(screen.getByRole("link", { name: /^projects$/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/portfolio/projects");
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
      expect(document.body.style.overflow).toBe("");
    });

    await user.click(menuButton);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    mediaQueryController.setMatches(false);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
      expect(document.body.style.overflow).toBe("");
    });
  });
});
