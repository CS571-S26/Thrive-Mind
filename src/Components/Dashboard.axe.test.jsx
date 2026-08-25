import { describe, it, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import { saveMoodEntry } from "../utils/moodHistory";
import { saveEntryForDate } from "../utils/selfCareHistory";
import { AuthProvider } from "../context/AuthContext.jsx";
import { runAxe } from "../test/axeHelper";

const renderDashboard = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
});

describe("Dashboard accessibility", () => {
  it("has no axe violations in the empty state", async () => {
    const { container } = renderDashboard();
    await runAxe(container);
  });

  it("has no axe violations in the populated state", async () => {
    saveMoodEntry(
      {
        id: "okay",
        label: "You seem to be doing okay today, with some ups and downs",
        emoji: "🌤️",
        suggestion: "Explore our mental health resources to stay ahead of stress.",
        link: "/resources"
      },
      65,
      [
        { category: "Mood", pct: 65 },
        { category: "Energy", pct: 65 },
        { category: "Sleep", pct: 40 },
        { category: "Connection", pct: 65 },
        { category: "Stress", pct: 65 }
      ],
      "Sleep"
    );
    saveEntryForDate({ water: true, break: true, meal: false });

    const { container } = renderDashboard();
    await runAxe(container);
  });
});
