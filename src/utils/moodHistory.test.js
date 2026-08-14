import { describe, it, expect, beforeEach } from "vitest";
import {
  getMoodHistory,
  saveMoodEntry,
  getLastMoodEntry,
  getRecentEntries,
  getMoodTrend,
  getFocusForEntry,
  getShortLabelForEntry,
  getWellnessInsight
} from "./moodHistory";

const RESULT = {
  id: "okay",
  label: "You seem to be doing okay today, with some ups and downs",
  emoji: "🌤️",
  suggestion: "Explore our mental health resources to stay ahead of stress.",
  link: "/resources"
};

beforeEach(() => {
  localStorage.clear();
});

describe("saveMoodEntry / getMoodHistory", () => {
  it("persists an entry that can be read back", () => {
    saveMoodEntry(RESULT, 62.4, [{ category: "Sleep", pct: 40 }], "Sleep");

    const history = getMoodHistory();
    expect(history).toHaveLength(1);
    expect(history[0].id).toBe("okay");
    expect(history[0].pct).toBe(62); // rounded
    expect(history[0].focusCategory).toBe("Sleep");
  });

  it("stores newest entries first", () => {
    saveMoodEntry({ ...RESULT, id: "down" }, 40);
    saveMoodEntry({ ...RESULT, id: "good" }, 90);

    const history = getMoodHistory();
    expect(history[0].id).toBe("good");
    expect(history[1].id).toBe("down");
  });

  it("caps history at 30 entries", () => {
    for (let i = 0; i < 35; i++) {
      saveMoodEntry(RESULT, 50);
    }

    expect(getMoodHistory().length).toBe(30);
  });

  it("recovers gracefully from corrupted localStorage data", () => {
    localStorage.setItem("thrive_mind_mood_history", "not valid json{{{");
    expect(getMoodHistory()).toEqual([]);
  });
});

describe("getLastMoodEntry", () => {
  it("returns null when there is no history", () => {
    expect(getLastMoodEntry()).toBeNull();
  });

  it("returns the most recently saved entry", () => {
    saveMoodEntry({ ...RESULT, id: "down" }, 40);
    saveMoodEntry({ ...RESULT, id: "good" }, 90);

    expect(getLastMoodEntry().id).toBe("good");
  });
});

describe("getRecentEntries", () => {
  it("returns entries oldest-first, capped to count", () => {
    saveMoodEntry({ ...RESULT, id: "struggling" }, 10);
    saveMoodEntry({ ...RESULT, id: "down" }, 40);
    saveMoodEntry({ ...RESULT, id: "good" }, 90);

    const recent = getRecentEntries(2);
    expect(recent).toHaveLength(2);
    expect(recent[0].id).toBe("down");
    expect(recent[1].id).toBe("good");
  });
});

describe("getMoodTrend", () => {
  it("reports not enough data with fewer than 2 entries", () => {
    expect(getMoodTrend([]).direction).toBe("unknown");
    expect(getMoodTrend([{ pct: 50 }]).direction).toBe("unknown");
  });

  it("detects an improving trend", () => {
    const entries = [{ pct: 20 }, { pct: 30 }, { pct: 70 }, { pct: 80 }];
    expect(getMoodTrend(entries).direction).toBe("up");
  });

  it("detects a declining trend", () => {
    const entries = [{ pct: 80 }, { pct: 70 }, { pct: 30 }, { pct: 20 }];
    expect(getMoodTrend(entries).direction).toBe("down");
  });

  it("treats small fluctuations as steady", () => {
    const entries = [{ pct: 50 }, { pct: 52 }, { pct: 48 }, { pct: 51 }];
    expect(getMoodTrend(entries).direction).toBe("flat");
  });
});

describe("getFocusForEntry", () => {
  it("returns a starter message when there is no entry", () => {
    expect(getFocusForEntry(null)).toBe("Getting started");
  });

  it("prefers the specific focus category when present", () => {
    expect(getFocusForEntry({ id: "okay", focusCategory: "Sleep" })).toBe("Sleep");
  });

  it("falls back to a generic focus for legacy entries", () => {
    expect(getFocusForEntry({ id: "struggling" })).toBe("Getting support");
  });
});

describe("getShortLabelForEntry", () => {
  it("returns the compact label for a known result id", () => {
    expect(getShortLabelForEntry({ id: "good", label: "long sentence" })).toBe(
      "Doing well"
    );
  });

  it("falls back to the full label for an unrecognized id", () => {
    expect(getShortLabelForEntry({ id: "mystery", label: "long sentence" })).toBe(
      "long sentence"
    );
  });
});

describe("getWellnessInsight", () => {
  it("returns null with no history", () => {
    expect(getWellnessInsight()).toBeNull();
  });

  it("returns null when only one low-mood entry is recent", () => {
    saveMoodEntry({ ...RESULT, id: "struggling" }, 10);
    saveMoodEntry({ ...RESULT, id: "good" }, 90);
    expect(getWellnessInsight()).toBeNull();
  });

  it("flags a pattern after two low-mood entries in the recent history", () => {
    saveMoodEntry({ ...RESULT, id: "struggling" }, 10);
    saveMoodEntry({ ...RESULT, id: "down" }, 40);
    expect(getWellnessInsight()).toMatch(/tougher mood/i);
  });
});
