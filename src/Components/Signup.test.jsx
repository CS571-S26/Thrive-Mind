import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext.jsx";
import * as authApi from "../api/auth.js";

vi.mock("../api/auth.js");

const renderSignup = () => {
  authApi.getCurrentUser.mockResolvedValue(null);
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Signup", () => {
  it("creates an account with valid details", async () => {
    authApi.signup.mockResolvedValue({ id: "1", displayName: "Student" });
    renderSignup();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Student" }
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "student@wisc.edu" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "correcthorsebattery" }
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() =>
      expect(authApi.signup).toHaveBeenCalledWith(
        "student@wisc.edu",
        "correcthorsebattery",
        "Student"
      )
    );
  });

  it("shows the server's error message on failure", async () => {
    authApi.signup.mockRejectedValue(
      new Error("That email is already registered.")
    );
    renderSignup();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Student" }
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "student@wisc.edu" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "correcthorsebattery" }
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText("That email is already registered.")
    ).toBeInTheDocument();
  });
});
