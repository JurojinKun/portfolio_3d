import { render, screen } from "@testing-library/react";

import { App } from "./App";

describe("App", () => {
  it("renders the v2 technical foundation", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /socle technique initialise/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("React 19")).toBeInTheDocument();
    expect(screen.getByText("TypeScript strict")).toBeInTheDocument();
  });
});
