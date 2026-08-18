import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Resources from "./Resources";
import { runAxe } from "../test/axeHelper";

describe("Resources accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <Resources />
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
