// Pure scoring logic for the Mood Quiz, kept separate from MoodChecker.jsx
// so it can be unit tested without rendering the component.

export const CATEGORY_ORDER = ["Mood", "Energy", "Sleep", "Connection", "Stress"];
const MAX_SCORE_PER_QUESTION = 4;

// Rounded to avoid floating-point boundary bugs, e.g. (11/20)*100 evaluating
// to 55.00000000000001 and missing a "pct <= 55" threshold check below.
export const getPct = (total, questionCount) =>
  Math.round((total / (questionCount * MAX_SCORE_PER_QUESTION)) * 100);

export const getResult = (total, questionCount) => {
  const pct = getPct(total, questionCount);

  if (pct <= 35) {
    return {
      id: "struggling",
      label: "You may be having a difficult day",
      emoji: "💙",
      color: "#4B5563",
      message:
        "Your responses suggest you may benefit from support. Please know that help is available. Consider reaching out to a counselor or calling a helpline — you deserve care.",
      suggestion: "Visit our Resources page for professional help options.",
      link: "/resources"
    };
  }

  if (pct <= 55) {
    return {
      id: "down",
      label: "Your responses suggest some areas worth paying attention to",
      emoji: "🌧️",
      color: "#5B45D6",
      message:
        "You're managing, but things feel heavier than usual. Small acts of self-care and connecting with others can help. You don't have to push through alone.",
      suggestion: "Try our Issues page for specific coping strategies.",
      link: "/issues"
    };
  }

  if (pct <= 75) {
    return {
      id: "okay",
      label: "You seem to be doing okay today, with some ups and downs",
      emoji: "🌤️",
      color: "#2C6FB3",
      message:
        "You're in a decent place, but there's always room to nurture your wellbeing. Keep checking in with yourself and stay connected to what grounds you.",
      suggestion: "Explore our mental health resources to stay ahead of stress.",
      link: "/resources"
    };
  }

  return {
    id: "good",
    label: "You seem to be doing relatively well today",
    emoji: "🌟",
    color: "#1F7A46",
    message:
      "You're in a strong place right now — that's great! Keep up the habits that support your wellbeing and remember to be there for others around you too.",
    suggestion: "Share Thrive Mind with someone who might need it.",
    link: "/"
  };
};

// categories: array of category names, one per question, in question order.
export const getCategoryScores = (answers, categories) => {
  const raw = categories.map((category, i) => ({
    category,
    pct: Math.round(((answers[i] || 0) / MAX_SCORE_PER_QUESTION) * 100)
  }));

  return CATEGORY_ORDER.map((category) =>
    raw.find((entry) => entry.category === category)
  );
};

export const getFocusCategory = (categoryScores) => {
  return categoryScores.reduce((lowest, entry) =>
    entry.pct < lowest.pct ? entry : lowest
  ).category;
};
