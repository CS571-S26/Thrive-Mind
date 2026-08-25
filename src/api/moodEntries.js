import { apiRequest } from "./client.js";

export const fetchMoodEntries = (limit = 30) =>
  apiRequest(`/api/mood-entries?limit=${limit}`).then((data) => data.entries);

// entry: { resultId, label, emoji, pct, suggestion, link, categoryScores, focusCategory }
export const createMoodEntry = (entry) =>
  apiRequest("/api/mood-entries", { method: "POST", body: entry }).then(
    (data) => data.entry
  );
