const STORAGE_KEY = "thrive_mind_mood_history";
const MAX_ENTRIES = 30;

const LOW_MOOD_IDS = ["struggling", "down"];

const FOCUS_BY_ID = {
  struggling: "Getting support",
  down: "Coping strategies",
  okay: "Staying balanced",
  good: "Sharing & maintaining"
};

// The quiz results page shows the full, gentler sentence; compact spots
// (dashboard tiles, the last-check-in note) use this shorter version instead.
const SHORT_LABEL_BY_ID = {
  struggling: "A difficult day",
  down: "A bit of a rough patch",
  okay: "Doing okay",
  good: "Doing well"
};

export const getShortLabelForEntry = (entry) => {
  if (!entry) return "";
  return SHORT_LABEL_BY_ID[entry.id] || entry.label;
};

export const getMoodHistory = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// result comes from MoodChecker's getResult(); pct is the raw 0-100 score
// behind that result. categoryScores/focusCategory come from the per-category
// breakdown (mood/energy/sleep/stress/connection) added in the quiz overhaul.
export const saveMoodEntry = (result, pct, categoryScores = null, focusCategory = null) => {
  const history = getMoodHistory();
  const entry = {
    id: result.id,
    label: result.label,
    emoji: result.emoji,
    date: new Date().toISOString(),
    pct: Math.round(pct),
    suggestion: result.suggestion,
    link: result.link,
    categoryScores,
    focusCategory
  };

  const updated = [entry, ...history].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return entry;
};

export const getLastMoodEntry = () => {
  const history = getMoodHistory();
  return history[0] || null;
};

// Oldest-first, capped to the most recent `count` check-ins.
export const getRecentEntries = (count = 7) => {
  return getMoodHistory().slice(0, count).reverse();
};

export const getMoodTrend = (entries) => {
  if (entries.length < 2) {
    return { direction: "unknown", label: "Not enough data yet" };
  }

  const midpoint = Math.floor(entries.length / 2);
  const earlier = entries.slice(0, midpoint || 1);
  const later = entries.slice(midpoint);

  const avg = (list) => list.reduce((sum, e) => sum + e.pct, 0) / list.length;
  const delta = avg(later) - avg(earlier);

  if (delta > 8) return { direction: "up", label: "Improving" };
  if (delta < -8) return { direction: "down", label: "Declining" };
  return { direction: "flat", label: "Steady" };
};

// Prefers the specific category flagged as today's focus; falls back to a
// generic focus for older entries saved before category scoring existed.
export const getFocusForEntry = (entry) => {
  if (!entry) return "Getting started";
  if (entry.focusCategory) return entry.focusCategory;
  return FOCUS_BY_ID[entry.id] || "Checking in";
};

// A simple, explainable, rule-based nudge — not a diagnosis, just a pattern flag.
export const getWellnessInsight = () => {
  const recent = getMoodHistory().slice(0, 5);
  const lowCount = recent.filter((entry) => LOW_MOOD_IDS.includes(entry.id)).length;

  if (recent.length >= 2 && lowCount >= 2) {
    return "You've reported a tougher mood several times recently. Consider checking our support resources — you don't have to push through alone.";
  }

  return null;
};
