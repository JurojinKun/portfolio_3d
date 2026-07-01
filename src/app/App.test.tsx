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
});
