import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import * as authApi from "../api/auth.js";

vi.mock("../api/auth.js");

// Exercises the context through rendered UI (button clicks) rather than by
// reaching into the hook's return value directly, matching how every other
// component in this app is tested.
function Probe() {
  const { user, loading, login, logout } = useAuth();
  if (loading) return <div>loading</div>;
  return (
    <div>
      <div>{user ? `signed in as ${user.displayName}` : "signed out"}</div>
      <button onClick={() => login("s@wisc.edu", "password123")}>
        Log in
      </button>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("AuthProvider", () => {
  it("checks for an existing session on mount", async () => {
    authApi.getCurrentUser.mockResolvedValue({
      id: "1",
      displayName: "Student",
      email: "s@wisc.edu"
    });

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    expect(screen.getByText("loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("signed in as Student")).toBeInTheDocument()
    );
  });

  it("starts signed out when there's no session", async () => {
    authApi.getCurrentUser.mockResolvedValue(null);

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("signed out")).toBeInTheDocument()
    );
  });

  it("updates state on login and logout", async () => {
    authApi.getCurrentUser.mockResolvedValue(null);
    authApi.login.mockResolvedValue({
      id: "1",
      displayName: "Student",
      email: "s@wisc.edu"
    });
    authApi.logout.mockResolvedValue(undefined);

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("signed out")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Log in"));
    await waitFor(() =>
      expect(screen.getByText("signed in as Student")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Log out"));
    await waitFor(() =>
      expect(screen.getByText("signed out")).toBeInTheDocument()
    );
  });
});
