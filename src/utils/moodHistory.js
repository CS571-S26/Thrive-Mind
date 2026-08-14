const STORAGE_KEY = "thrive_mind_mood_history";
const MAX_ENTRIES = 30;

const LOW_MOOD_LABELS = ["Struggling Right Now", "Feeling a Bit Down"];

const FOCUS_BY_LABEL = {
  "Struggling Right Now": "Getting support",
  "Feeling a Bit Down": "Coping strategies",
  "Doing Okay": "Staying balanced",
  "Feeling Good": "Sharing & maintaining"
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
// behind that result, kept separately so the dashboard can chart real numbers.
export const saveMoodEntry = (result, pct) => {
  const history = getMoodHistory();
  const entry = {
    label: result.label,
    emoji: result.emoji,
    date: new Date().toISOString(),
    pct: Math.round(pct),
    suggestion: result.suggestion,
    link: result.link
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

export const getFocusForLabel = (label) => FOCUS_BY_LABEL[label] || "Checking in";

// A simple, explainable, rule-based nudge — not a diagnosis, just a pattern flag.
export const getWellnessInsight = () => {
  const recent = getMoodHistory().slice(0, 5);
  const lowCount = recent.filter((entry) => LOW_MOOD_LABELS.includes(entry.label)).length;

  if (recent.length >= 2 && lowCount >= 2) {
    return "You've reported a tougher mood several times recently. Consider checking our support resources — you don't have to push through alone.";
  }

  return null;
};
