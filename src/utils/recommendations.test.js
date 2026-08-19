import { describe, it, expect } from "vitest";
import { getRecommendedActions } from "./recommendations";

const buildEntry = (overrides = {}) => ({
  id: "okay",
  categoryScores: [
    { category: "Mood", pct: 75 },
    { category: "Energy", pct: 75 },
    { category: "Sleep", pct: 75 },
    { category: "Connection", pct: 75 },
    { category: "Stress", pct: 75 }
  ],
  focusCategory: "Mood",
  ...overrides
});

describe("getRecommendedActions", () => {
  it("returns an empty array when there is no entry", () => {
    expect(getRecommendedActions(null)).toEqual([]);
  });

  it("returns 3 actions for a full category-scored entry", () => {
    const actions = getRecommendedActions(buildEntry());
    expect(actions).toHaveLength(3);
  });

  it("gives every action an explanatory reason", () => {
    const actions = getRecommendedActions(buildEntry());
    actions.forEach((action) => {
      expect(typeof action.reason).toBe("string");
      expect(action.reason.length).toBeGreaterThan(0);
    });
  });

  it("addresses the lowest-scoring category first", () => {
    const entry = buildEntry({
      focusCategory: "Sleep",
      categoryScores: [
        { category: "Mood", pct: 75 },
        { category: "Energy", pct: 75 },
        { category: "Sleep", pct: 25 },
        { category: "Connection", pct: 75 },
        { category: "Stress", pct: 75 }
      ]
    });
    const [first] = getRecommendedActions(entry);

    expect(first.title).toMatch(/wind-down/i);
  });

  it("includes a reconnect action when connection is low", () => {
    const entry = buildEntry({
      focusCategory: "Sleep",
      categoryScores: [
        { category: "Mood", pct: 75 },
        { category: "Energy", pct: 75 },
        { category: "Sleep", pct: 25 },
        { category: "Connection", pct: 40 },
        { category: "Stress", pct: 75 }
      ]
    });
    const actions = getRecommendedActions(entry);

    expect(actions.some((a) => a.type === "reconnect")).toBe(true);
  });

  it("does not push a generic reconnect action when connection is already high", () => {
    const entry = buildEntry({
      focusCategory: "Sleep",
      categoryScores: [
        { category: "Mood", pct: 75 },
        { category: "Energy", pct: 75 },
        { category: "Sleep", pct: 25 },
        { category: "Connection", pct: 90 },
        { category: "Stress", pct: 75 }
      ]
    });
    const actions = getRecommendedActions(entry);

    expect(actions.some((a) => a.type === "reconnect")).toBe(false);
  });

  it("offers two complementary reconnect actions when connection is itself the focus", () => {
    const entry = buildEntry({
      focusCategory: "Connection",
      categoryScores: [
        { category: "Mood", pct: 75 },
        { category: "Energy", pct: 75 },
        { category: "Sleep", pct: 75 },
        { category: "Connection", pct: 20 },
        { category: "Stress", pct: 75 }
      ]
    });
    const actions = getRecommendedActions(entry);
    const reconnectTitles = actions
      .filter((a) => a.type === "reconnect")
      .map((a) => a.title);

    // Both the per-category focus action and the low-connection nudge are
    // reconnect-type, but they must be two distinct suggestions, not a dupe.
    expect(reconnectTitles).toEqual(
      expect.arrayContaining(["Text Someone You Trust", "Consider Group Support"])
    );
    expect(new Set(reconnectTitles).size).toBe(2);
  });

  it("closes with a crisis-line action when the result tier is struggling", () => {
    const actions = getRecommendedActions(buildEntry({ id: "struggling" }));
    expect(actions.at(-1).title).toMatch(/crisis/i);
  });

  it("closes with a campus-counselor action when the result tier is down", () => {
    const actions = getRecommendedActions(buildEntry({ id: "down" }));
    expect(actions.at(-1).title).toMatch(/campus counselor/i);
  });

  it("closes with a positive, non-clinical action when the result tier is good", () => {
    const actions = getRecommendedActions(buildEntry({ id: "good" }));
    expect(actions.at(-1).title).toMatch(/share/i);
  });

  it("falls back to a single suggestion card for legacy entries without category scores", () => {
    const legacyEntry = {
      id: "okay",
      suggestion: "Explore our mental health resources to stay ahead of stress.",
      link: "/resources"
    };
    const actions = getRecommendedActions(legacyEntry);

    expect(actions).toHaveLength(1);
    expect(actions[0].desc).toBe(legacyEntry.suggestion);
    expect(actions[0].link).toBe("/resources");
  });

  it("returns an empty array for a legacy entry with nothing to recommend", () => {
    expect(getRecommendedActions({ id: "okay" })).toEqual([]);
  });
});
