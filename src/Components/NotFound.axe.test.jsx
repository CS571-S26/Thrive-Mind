import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";
import { runAxe } from "../test/axeHelper";

describe("NotFound accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
