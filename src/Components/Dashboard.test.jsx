import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import { saveMoodEntry } from "../utils/moodHistory";
import { saveEntryForDate } from "../utils/selfCareHistory";

const renderDashboard = () =>
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
});

describe("Dashboard empty state", () => {
  it("shows a prompt to check in, not blank or broken stats, when there is no data", () => {
    renderDashboard();

    expect(
      screen.getByText(/haven't checked in yet/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /check my mood/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try the planner/i })).toBeInTheDocument();

    // The populated-state stat tiles should not render at all.
    expect(screen.queryByText("7-day trend")).not.toBeInTheDocument();
  });
});

describe("Dashboard populated state", () => {
  it("renders real stats once mood and self-care data exist", () => {
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

    renderDashboard();

    expect(screen.getByText("7-day trend")).toBeInTheDocument();
    expect(screen.getByText("Sleep")).toBeInTheDocument(); // Current focus tile
    expect(screen.queryByText(/haven't checked in yet/i)).not.toBeInTheDocument();
  });
});
