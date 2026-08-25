const HISTORY_KEY = "thrive_mind_self_care_history";
const LEGACY_KEY = "thrive_mind_self_care_planner";
const MAX_DAYS_KEPT = 90;

export const getDateKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const readHistory = () => {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const writeHistory = (history) => {
  const entries = Object.entries(history).sort(([a], [b]) => (a < b ? 1 : -1));
  const trimmed = Object.fromEntries(entries.slice(0, MAX_DAYS_KEPT));
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  return trimmed;
};

// One-time migration from the old single-day, non-dated storage key.
const migrateLegacyEntry = (history) => {
  if (Object.keys(history).length > 0) return history;

  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) return history;

    const parsed = JSON.parse(legacy);
    const todayKey = getDateKey();
    return { ...history, [todayKey]: parsed };
  } catch {
    return history;
  }
};

export const getHistory = () => migrateLegacyEntry(readHistory());

// Pure variant that takes a history object directly, so callers with a
// non-localStorage source (e.g. self-care days fetched from the API for a
// signed-in user) can reuse the same derivation logic.
export const getEntryForDateFrom = (history, defaultTasks, date = new Date()) => {
  const key = getDateKey(date);

  if (history[key]) return history[key];

  return defaultTasks.reduce((acc, task) => {
    acc[task.id] = false;
    return acc;
  }, {});
};

export const getEntryForDate = (defaultTasks, date = new Date()) =>
  getEntryForDateFrom(getHistory(), defaultTasks, date);

export const saveEntryForDate = (checkedItems, date = new Date()) => {
  const history = getHistory();
  const key = getDateKey(date);
  return writeHistory({ ...history, [key]: checkedItems });
};

// todayCount lets the caller pass the in-memory completed count for today
// so the streak reflects the latest toggle without a storage round-trip.
export const getStreakFrom = (history, todayCount = null) => {
  let streak = 0;
  const cursor = new Date();

  // Walk backward from today; a day counts if at least one task was completed.
  for (let i = 0; i < MAX_DAYS_KEPT; i++) {
    const key = getDateKey(cursor);
    let completed;

    if (i === 0 && todayCount !== null) {
      completed = todayCount;
    } else {
      const entry = history[key];
      completed = entry ? Object.values(entry).filter(Boolean).length : 0;
    }

    if (completed === 0) {
      if (i === 0) {
        // Today not started yet shouldn't break a streak earned through yesterday.
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      break;
    }

    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

export const getStreak = (todayCount = null) =>
  getStreakFrom(getHistory(), todayCount);

export const getMonthlyCompletedCountFrom = (history) => {
  const now = new Date();
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  return Object.entries(history)
    .filter(([key]) => key.startsWith(prefix))
    .reduce((sum, [, entry]) => sum + Object.values(entry).filter(Boolean).length, 0);
};

export const getMonthlyCompletedCount = () =>
  getMonthlyCompletedCountFrom(getHistory());
