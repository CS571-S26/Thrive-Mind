import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import CrisisBanner from "./CrisisBanner";
import { AuthProvider } from "../context/AuthContext.jsx";
import { runAxe } from "../test/axeHelper";

vi.mock("../api/auth.js", () => ({
  getCurrentUser: () => Promise.resolve(null)
}));

describe("Navbar + CrisisBanner accessibility", () => {
  it("has no axe violations (matches how they're actually composed in App.jsx)", async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
          <CrisisBanner />
        </AuthProvider>
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
