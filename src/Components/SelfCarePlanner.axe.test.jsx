import { describe, it, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SelfCarePlanner from "./SelfCarePlanner";
import { AuthProvider } from "../context/AuthContext.jsx";
import { runAxe } from "../test/axeHelper";

beforeEach(() => {
  localStorage.clear();
});

describe("SelfCarePlanner accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <SelfCarePlanner />
        </AuthProvider>
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
