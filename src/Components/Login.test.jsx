import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../context/AuthContext.jsx";
import * as authApi from "../api/auth.js";

vi.mock("../api/auth.js");

const renderLogin = () => {
  authApi.getCurrentUser.mockResolvedValue(null);
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Login", () => {
  it("logs in with valid credentials", async () => {
    authApi.login.mockResolvedValue({ id: "1", displayName: "Student" });
    renderLogin();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "student@wisc.edu" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "correcthorsebattery" }
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() =>
      expect(authApi.login).toHaveBeenCalledWith(
        "student@wisc.edu",
        "correcthorsebattery"
      )
    );
  });

  it("shows the server's error message on failure", async () => {
    authApi.login.mockRejectedValue(new Error("Invalid email or password."));
    renderLogin();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "student@wisc.edu" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" }
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      await screen.findByText("Invalid email or password.")
    ).toBeInTheDocument();
  });
});
