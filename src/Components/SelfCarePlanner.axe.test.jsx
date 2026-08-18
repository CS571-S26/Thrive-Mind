import { describe, it, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SelfCarePlanner from "./SelfCarePlanner";
import { runAxe } from "../test/axeHelper";

beforeEach(() => {
  localStorage.clear();
});

describe("SelfCarePlanner accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <SelfCarePlanner />
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
