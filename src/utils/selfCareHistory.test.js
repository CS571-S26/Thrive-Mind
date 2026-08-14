import { describe, it, expect, beforeEach } from "vitest";
import {
  getDateKey,
  getHistory,
  getEntryForDate,
  saveEntryForDate,
  getStreak,
  getMonthlyCompletedCount
} from "./selfCareHistory";

const TASKS = [
  { id: "water", label: "Drank water" },
  { id: "break", label: "Took a break" },
  { id: "meal", label: "Ate a meal" }
];

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

beforeEach(() => {
  localStorage.clear();
});

describe("getDateKey", () => {
  it("formats a date as YYYY-MM-DD", () => {
    const date = new Date(2026, 0, 5); // Jan 5, 2026 (month is 0-indexed)
    expect(getDateKey(date)).toBe("2026-01-05");
  });
});

describe("getEntryForDate / saveEntryForDate", () => {
  it("returns all-false defaults when nothing has been saved yet", () => {
    const entry = getEntryForDate(TASKS);
    expect(entry).toEqual({ water: false, break: false, meal: false });
  });

  it("round-trips a saved entry for today", () => {
    saveEntryForDate({ water: true, break: false, meal: true });
    const entry = getEntryForDate(TASKS);

    expect(entry).toEqual({ water: true, break: false, meal: true });
  });

  it("keeps separate days independent", () => {
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(1));
    const today = getEntryForDate(TASKS);
    const yesterday = getEntryForDate(TASKS, daysAgo(1));

    expect(today).toEqual({ water: false, break: false, meal: false });
    expect(yesterday).toEqual({ water: true, break: false, meal: false });
  });

  it("migrates data saved under the old non-dated storage key", () => {
    localStorage.setItem(
      "thrive_mind_self_care_planner",
      JSON.stringify({ water: true, break: true, meal: false })
    );

    const entry = getEntryForDate(TASKS);
    expect(entry).toEqual({ water: true, break: true, meal: false });
  });

  it("recovers gracefully from corrupted localStorage data", () => {
    localStorage.setItem("thrive_mind_self_care_history", "{not json");
    expect(getHistory()).toEqual({});
  });
});

describe("getStreak", () => {
  it("is 0 with no history and no in-progress today", () => {
    expect(getStreak()).toBe(0);
  });

  it("counts consecutive days with at least one completed task", () => {
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(0));
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(1));
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(2));

    expect(getStreak()).toBe(3);
  });

  it("stops at the first gap day going backward", () => {
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(0));
    saveEntryForDate({ water: false, break: false, meal: false }, daysAgo(1)); // gap
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(2));

    expect(getStreak()).toBe(1);
  });

  it("doesn't break an existing streak just because today hasn't been started yet", () => {
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(1));
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(2));
    // today (daysAgo(0)) has no saved entry at all

    expect(getStreak()).toBe(2);
  });

  it("uses the provided in-memory count for today instead of re-reading storage", () => {
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(1));
    // today's saved entry says 0 completed, but the live toggle says 2
    saveEntryForDate({ water: false, break: false, meal: false }, daysAgo(0));

    expect(getStreak(2)).toBe(2);
  });
});

describe("getMonthlyCompletedCount", () => {
  it("is 0 with no history", () => {
    expect(getMonthlyCompletedCount()).toBe(0);
  });

  it("sums completed tasks across days in the current month only", () => {
    saveEntryForDate({ water: true, break: true, meal: false }, daysAgo(0)); // 2
    saveEntryForDate({ water: true, break: false, meal: false }, daysAgo(1)); // 1

    expect(getMonthlyCompletedCount()).toBe(3);
  });
});
