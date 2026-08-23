import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Privacy from "./Privacy";

const renderPrivacy = () =>
  render(
    <MemoryRouter>
      <Privacy />
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe("Privacy page", () => {
  it("explains what's stored and where", () => {
    renderPrivacy();
    expect(screen.getByText(/stored only in this browser/i)).toBeInTheDocument();
  });

  it("clears local mood and self-care data when confirmed", () => {
    localStorage.setItem("thrive_mind_mood_history", "[]");
    localStorage.setItem("thrive_mind_self_care_history", "{}");
    sessionStorage.setItem("thrive_mind_mood_quiz_progress", "{}");

    vi.spyOn(window, "confirm").mockReturnValue(true);
    renderPrivacy();

    fireEvent.click(screen.getByText("Clear My Data"));

    expect(localStorage.getItem("thrive_mind_mood_history")).toBeNull();
    expect(localStorage.getItem("thrive_mind_self_care_history")).toBeNull();
    expect(sessionStorage.getItem("thrive_mind_mood_quiz_progress")).toBeNull();
    expect(screen.getByText(/data has been cleared/i)).toBeInTheDocument();
  });

  it("does not clear data when the confirmation is declined", () => {
    localStorage.setItem("thrive_mind_mood_history", "[]");

    vi.spyOn(window, "confirm").mockReturnValue(false);
    renderPrivacy();

    fireEvent.click(screen.getByText("Clear My Data"));

    expect(localStorage.getItem("thrive_mind_mood_history")).toBe("[]");
  });
});
