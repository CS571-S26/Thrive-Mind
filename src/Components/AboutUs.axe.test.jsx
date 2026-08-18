import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutUs from "./AboutUs";
import { runAxe } from "../test/axeHelper";

describe("AboutUs accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
