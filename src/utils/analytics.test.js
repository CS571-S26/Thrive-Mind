import { describe, it, expect } from "vitest";
import {
  getDailyMoodSeries,
  getDailyCategorySeries,
  getHabitMoodAssociation
} from "./analytics";

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

// Local date components, not toISOString() (which is UTC) — must match
// analytics.js's own toDateKey, which is intentionally local-time to agree
// with selfCareHistory.js's getDateKey. Using UTC here would silently
// misalign entries near a day boundary in timezones behind UTC.
const dateKeyDaysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

describe("getDailyMoodSeries", () => {
  it("returns one oldest-first point per day", () => {
    const history = [
      { date: daysAgo(1), pct: 80 },
      { date: daysAgo(3), pct: 50 }
    ];
    const series = getDailyMoodSeries(history, 30);

    expect(series).toHaveLength(2);
    expect(series[0].pct).toBe(50); // 3 days ago comes first
    expect(series[1].pct).toBe(80); // 1 day ago comes last
  });

  it("keeps only the latest check-in when a day has more than one", () => {
    const today = daysAgo(0);
    const history = [
      { date: today, pct: 90 },
      { date: today, pct: 40 }
    ];
    // history is newest-first in real usage; the function reverses before
    // folding, so the *last* item here (pct 40) is the "earlier" one and
    // pct 90 (first/newest) should win.
    const series = getDailyMoodSeries(history, 30);

    expect(series).toHaveLength(1);
    expect(series[0].pct).toBe(90);
  });

  it("excludes entries older than the requested window", () => {
    const history = [{ date: daysAgo(40), pct: 60 }];
    expect(getDailyMoodSeries(history, 30)).toHaveLength(0);
  });

  it("returns an empty array for no history", () => {
    expect(getDailyMoodSeries([], 30)).toEqual([]);
  });
});

describe("getDailyCategorySeries", () => {
  it("includes all five category scores per day", () => {
    const history = [
      {
        date: daysAgo(1),
        categoryScores: [
          { category: "Mood", pct: 70 },
          { category: "Sleep", pct: 40 }
        ]
      }
    ];
    const [row] = getDailyCategorySeries(history, 30);

    expect(row.Mood).toBe(70);
    expect(row.Sleep).toBe(40);
  });

  it("skips legacy entries with no category scores", () => {
    const history = [{ date: daysAgo(1), categoryScores: null }];
    expect(getDailyCategorySeries(history, 30)).toEqual([]);
  });
});

describe("getHabitMoodAssociation", () => {
  it("returns null with fewer than 3 days in either group", () => {
    const moodHistory = [
      { date: daysAgo(1), pct: 80 },
      { date: daysAgo(2), pct: 40 }
    ];
    const selfCareHistory = {
      [dateKeyDaysAgo(1)]: { a: true, b: true, c: true, d: true }
    };

    expect(getHabitMoodAssociation(moodHistory, selfCareHistory)).toBeNull();
  });

  it("computes a positive association when high-care days score higher", () => {
    const moodHistory = [
      { date: daysAgo(1), pct: 90 },
      { date: daysAgo(2), pct: 80 },
      { date: daysAgo(3), pct: 70 },
      { date: daysAgo(4), pct: 40 },
      { date: daysAgo(5), pct: 50 },
      { date: daysAgo(6), pct: 30 }
    ];
    const highCare = { a: true, b: true, c: true, d: true };
    const lowCare = { a: true };
    const selfCareHistory = {
      [dateKeyDaysAgo(1)]: highCare,
      [dateKeyDaysAgo(2)]: highCare,
      [dateKeyDaysAgo(3)]: highCare,
      [dateKeyDaysAgo(4)]: lowCare,
      [dateKeyDaysAgo(5)]: lowCare,
      [dateKeyDaysAgo(6)]: lowCare
    };

    const result = getHabitMoodAssociation(moodHistory, selfCareHistory);

    expect(result.highCareAvg).toBe(80); // (90+80+70)/3
    expect(result.otherAvg).toBe(40); // (40+50+30)/3
    expect(result.diffPct).toBe(100); // 80 is 100% higher than 40
    expect(result.highCareDays).toBe(3);
    expect(result.otherDays).toBe(3);
  });

  it("treats a day with no self-care entry as zero activities completed", () => {
    const moodHistory = [
      { date: daysAgo(1), pct: 60 },
      { date: daysAgo(2), pct: 60 },
      { date: daysAgo(3), pct: 60 }
    ];
    // No self-care entries at all -> every day falls in the "other" group.
    const result = getHabitMoodAssociation(moodHistory, {});

    expect(result).toBeNull(); // highCareDays = 0, below the minimum
  });
});
