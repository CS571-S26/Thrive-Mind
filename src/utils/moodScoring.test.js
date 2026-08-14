import { describe, it, expect } from "vitest";
import {
  getPct,
  getResult,
  getCategoryScores,
  getFocusCategory,
  CATEGORY_ORDER
} from "./moodScoring";

describe("getPct", () => {
  it("converts a raw total into a percentage of the max possible score", () => {
    expect(getPct(10, 5)).toBe(50);
    expect(getPct(20, 5)).toBe(100);
    expect(getPct(0, 5)).toBe(0);
  });
});

describe("getResult", () => {
  it("returns the struggling tier at the low end, including the boundary", () => {
    expect(getResult(7, 5).id).toBe("struggling"); // 7/20 = 35%
    expect(getResult(0, 5).id).toBe("struggling");
  });

  it("returns the down tier just above the struggling boundary", () => {
    expect(getResult(8, 5).id).toBe("down"); // 8/20 = 40%
    expect(getResult(11, 5).id).toBe("down"); // 11/20 = 55%
  });

  it("returns the okay tier above the down boundary", () => {
    expect(getResult(12, 5).id).toBe("okay"); // 12/20 = 60%
    expect(getResult(15, 5).id).toBe("okay"); // 15/20 = 75%
  });

  it("returns the good tier above the okay boundary", () => {
    expect(getResult(16, 5).id).toBe("good"); // 16/20 = 80%
    expect(getResult(20, 5).id).toBe("good");
  });

  it("always includes a softened label, not a clinical-sounding one", () => {
    const result = getResult(0, 5);
    expect(result.label).not.toMatch(/struggling/i);
  });
});

describe("getCategoryScores", () => {
  const categories = ["Energy", "Connection", "Sleep", "Mood", "Stress"];

  it("converts each answer into a percentage, keyed by category", () => {
    const answers = [4, 2, 1, 3, 4];
    const scores = getCategoryScores(answers, categories);

    const byCategory = Object.fromEntries(
      scores.map((s) => [s.category, s.pct])
    );

    expect(byCategory.Energy).toBe(100);
    expect(byCategory.Connection).toBe(50);
    expect(byCategory.Sleep).toBe(25);
    expect(byCategory.Mood).toBe(75);
    expect(byCategory.Stress).toBe(100);
  });

  it("returns categories in the fixed display order regardless of question order", () => {
    const answers = [4, 2, 1, 3, 4];
    const scores = getCategoryScores(answers, categories);

    expect(scores.map((s) => s.category)).toEqual(CATEGORY_ORDER);
  });

  it("treats an unanswered question as a 0% score", () => {
    const answers = [null, 2, 1, 3, 4];
    const scores = getCategoryScores(answers, categories);
    const energy = scores.find((s) => s.category === "Energy");

    expect(energy.pct).toBe(0);
  });
});

describe("getFocusCategory", () => {
  it("picks the category with the lowest score", () => {
    const scores = [
      { category: "Mood", pct: 75 },
      { category: "Energy", pct: 50 },
      { category: "Sleep", pct: 25 },
      { category: "Connection", pct: 100 },
      { category: "Stress", pct: 50 }
    ];

    expect(getFocusCategory(scores)).toBe("Sleep");
  });

  it("breaks ties by picking the first lowest in the list", () => {
    const scores = [
      { category: "Mood", pct: 50 },
      { category: "Energy", pct: 50 }
    ];

    expect(getFocusCategory(scores)).toBe("Mood");
  });
});
