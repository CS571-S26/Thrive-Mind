import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import CrisisBanner from "./CrisisBanner";
import { runAxe } from "../test/axeHelper";

describe("Navbar + CrisisBanner accessibility", () => {
  it("has no axe violations (matches how they're actually composed in App.jsx)", async () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
        <CrisisBanner />
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
