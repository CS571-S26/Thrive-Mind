import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../context/AuthContext.jsx";
import { runAxe } from "../test/axeHelper";

vi.mock("../api/auth.js", () => ({
  getCurrentUser: () => Promise.resolve(null)
}));

describe("Login accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    await runAxe(container);
  });
});
