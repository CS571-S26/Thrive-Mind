import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Privacy from "./Privacy";
import { runAxe } from "../test/axeHelper";

describe("Privacy accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <Privacy />
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
