import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Issues from "./Issues";
import { runAxe } from "../test/axeHelper";

describe("Issues accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <Issues />
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
