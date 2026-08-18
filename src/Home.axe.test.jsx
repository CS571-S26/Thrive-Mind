import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { runAxe } from "./test/axeHelper";

describe("Home accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
