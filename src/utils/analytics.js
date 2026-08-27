// Pure, storage-agnostic trend/correlation helpers for the My Wellness
// dashboard. Every function here takes data in — mood history, self-care
// history — and returns derived data out, so it's independent of whether
// that data came from localStorage or the API.

const CATEGORY_NAMES = ["Mood", "Energy", "Sleep", "Connection", "Stress"];

const toDateKey = (isoDate) => {
  const d = new Date(isoDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// One point per calendar day, oldest-first, covering the last `days` days.
// If more than one check-in happened on the same day, the latest one wins
// (matches how "today's mood" is derived elsewhere in the app). Days with
// no check-in are simply absent — this is a trend of actual check-ins, not
// a padded/interpolated timeline.
export const getDailyMoodSeries = (moodHistory, days = 30) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const byDay = new Map();
  // moodHistory is newest-first; iterate oldest-first so the last write
  // into the map for a given day is naturally the newest entry that day.
  [...moodHistory].reverse().forEach((entry) => {
    const entryDate = new Date(entry.date);
    if (entryDate < cutoff) return;
    byDay.set(toDateKey(entry.date), { date: toDateKey(entry.date), pct: entry.pct });
  });

  return [...byDay.values()].sort((a, b) => (a.date < b.date ? -1 : 1));
};

// Same idea, but one row per day with all five category scores, for the
// multi-line category trend chart.
export const getDailyCategorySeries = (moodHistory, days = 30) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const byDay = new Map();
  [...moodHistory].reverse().forEach((entry) => {
    const entryDate = new Date(entry.date);
    if (entryDate < cutoff || !entry.categoryScores) return;

    const row = { date: toDateKey(entry.date) };
    entry.categoryScores.forEach(({ category, pct }) => {
      row[category] = pct;
    });
    byDay.set(row.date, row);
  });

  return [...byDay.values()].sort((a, b) => (a.date < b.date ? -1 : 1));
};

export { CATEGORY_NAMES };

const MIN_ACTIVITIES_FOR_HIGH_CARE = 4;
const MIN_DAYS_PER_GROUP = 3;

// Compares average same-day mood score on days with a lot of self-care
// activity vs. other days. Deliberately returns null (nothing rendered)
// rather than a shaky number when there isn't enough data in both groups
// to say anything meaningful — this is an association check, not a model,
// and a 1-vs-1-day comparison isn't worth showing.
export const getHabitMoodAssociation = (moodHistory, selfCareHistory) => {
  const highCareScores = [];
  const otherScores = [];

  moodHistory.forEach((entry) => {
    const dateKey = toDateKey(entry.date);
    const checkedItems = selfCareHistory[dateKey];
    const completedCount = checkedItems
      ? Object.values(checkedItems).filter(Boolean).length
      : 0;

    if (completedCount >= MIN_ACTIVITIES_FOR_HIGH_CARE) {
      highCareScores.push(entry.pct);
    } else {
      otherScores.push(entry.pct);
    }
  });

  if (
    highCareScores.length < MIN_DAYS_PER_GROUP ||
    otherScores.length < MIN_DAYS_PER_GROUP
  ) {
    return null;
  }

  const avg = (list) => list.reduce((sum, n) => sum + n, 0) / list.length;
  const highCareAvg = avg(highCareScores);
  const otherAvg = avg(otherScores);

  if (otherAvg === 0) return null;

  const diffPct = Math.round(((highCareAvg - otherAvg) / otherAvg) * 100);

  return {
    highCareAvg: Math.round(highCareAvg),
    otherAvg: Math.round(otherAvg),
    diffPct,
    highCareDays: highCareScores.length,
    otherDays: otherScores.length
  };
};
