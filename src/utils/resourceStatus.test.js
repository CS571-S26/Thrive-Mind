import { describe, it, expect } from "vitest";
import { isStale, daysSince, STALE_AFTER_DAYS } from "./resourceStatus";

const dateDaysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

describe("daysSince", () => {
  it("returns 0 for today", () => {
    expect(daysSince(dateDaysAgo(0))).toBe(0);
  });

  it("returns the correct day count for a past date", () => {
    expect(daysSince(dateDaysAgo(45))).toBe(45);
  });
});

describe("isStale", () => {
  it("is not stale just under the threshold", () => {
    expect(isStale(dateDaysAgo(STALE_AFTER_DAYS - 1))).toBe(false);
  });

  it("is stale just over the threshold", () => {
    expect(isStale(dateDaysAgo(STALE_AFTER_DAYS + 1))).toBe(true);
  });

  it("treats a missing date as stale", () => {
    expect(isStale(undefined)).toBe(true);
    expect(isStale(null)).toBe(true);
  });

  it("respects a custom threshold", () => {
    expect(isStale(dateDaysAgo(10), 30)).toBe(false);
    expect(isStale(dateDaysAgo(40), 30)).toBe(true);
  });
});
