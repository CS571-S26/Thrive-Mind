const STORAGE_KEY = "thrive_mind_mood_history";
const MAX_ENTRIES = 10;

export const getMoodHistory = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveMoodEntry = (result) => {
  const history = getMoodHistory();
  const entry = {
    label: result.label,
    emoji: result.emoji,
    date: new Date().toISOString()
  };

  const updated = [entry, ...history].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return entry;
};

export const getLastMoodEntry = () => {
  const history = getMoodHistory();
  return history[0] || null;
};
