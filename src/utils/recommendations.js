// A small, fully rule-based recommendation engine — no AI, just an
// explainable lookup from category scores + result tier to concrete next
// steps that connect Issues, Resources, the Planner, and the Dashboard.

const ACTIONS = {
  breathing: {
    type: "reset",
    emoji: "🌬️",
    title: "Try a 5-Minute Breathing Reset",
    desc: "Inhale 4s, hold 4s, exhale 4s — repeat for a few minutes to calm your nervous system.",
    link: "/issues?open=anxiety"
  },
  walk: {
    type: "reset",
    emoji: "🚶",
    title: "Take a Short Walk",
    desc: "Even 10 minutes outside can shift your energy and mood.",
    link: "/issues?open=stress"
  },
  sleepApps: {
    type: "reset",
    emoji: "🌙",
    title: "Try a Wind-Down Routine",
    desc: "Explore sleep and relaxation apps like Headspace and Calm.",
    link: "/resources?section=mental-health-apps"
  },
  planner: {
    type: "reset",
    emoji: "💗",
    title: "Try the Self-Care Planner",
    desc: "Check off a few small acts of care today — hydration, rest, a gentle stretch.",
    link: "/planner"
  },
  reconnectText: {
    type: "reconnect",
    emoji: "💬",
    title: "Text Someone You Trust",
    desc: "A short check-in message can ease isolation — it doesn't have to be a big conversation.",
    link: "/issues?open=loneliness"
  },
  reconnectGroup: {
    type: "reconnect",
    emoji: "🧑‍🤝‍🧑",
    title: "Consider Group Support",
    desc: "UW–Madison offers group counseling to connect with others facing similar experiences.",
    link: "/resources?section=uw-madison-support"
  },
  learnStress: {
    type: "learn",
    emoji: "📖",
    title: "Read About Managing Stress",
    desc: "Practical tips for when stress starts to feel like too much.",
    link: "/issues?open=stress"
  },
  learnAcademic: {
    type: "learn",
    emoji: "📝",
    title: "Read About Academic Pressure",
    desc: "Strategies for exam stress and academic overwhelm.",
    link: "/issues?open=academic-pressure"
  },
  supportCounselor: {
    type: "support",
    emoji: "🎓",
    title: "Talk to a Campus Counselor",
    desc: "UW–Madison's Let's Talk offers free, no-appointment drop-in support.",
    link: "/resources?section=uw-madison-support"
  },
  supportCrisis: {
    type: "support",
    emoji: "🆘",
    title: "Reach Out to a Crisis Line",
    desc: "988 and the Crisis Text Line are free, confidential, and available right now.",
    link: "/resources?section=crisis-hotlines"
  },
  wellnessTrends: {
    type: "learn",
    emoji: "🌱",
    title: "Check Your Wellness Trends",
    desc: "See how your mood and habits have been trending lately.",
    link: "/wellness"
  },
  shareThrive: {
    type: "learn",
    emoji: "🌟",
    title: "Share Thrive Mind",
    desc: "If you're doing well, consider sharing this with someone who might need it.",
    link: "/"
  }
};

export const TYPE_LABELS = {
  reset: "Reset",
  reconnect: "Reconnect",
  learn: "Learn",
  support: "Get Support"
};

const FOCUS_ACTION_BY_CATEGORY = {
  Sleep: "sleepApps",
  Energy: "walk",
  Mood: "breathing",
  Stress: "learnStress",
  Connection: "reconnectText"
};

const withKey = (key, reason) => ({ id: key, ...ACTIONS[key], reason });

const RESULT_TIER_REASON = {
  struggling: "Your check-in showed you might be struggling right now.",
  down: "Your check-in suggested extra support could help.",
  okay: "You're doing okay overall — a good moment to check your trends.",
  good: "You're doing well today."
};

// entry: { id: resultId, categoryScores, focusCategory, suggestion, link }
export const getRecommendedActions = (entry) => {
  if (!entry) return [];

  // Legacy entries saved before category scoring existed only have a single
  // suggestion/link — show that instead of guessing at categories.
  if (!entry.categoryScores || !entry.focusCategory) {
    if (!entry.suggestion) return [];
    return [
      {
        id: "legacy-suggestion",
        type: "learn",
        emoji: "💡",
        title: "Recommended for You",
        desc: entry.suggestion,
        link: entry.link || "/resources"
      }
    ];
  }

  const { categoryScores, focusCategory, id: resultId } = entry;
  const used = new Set();
  const actions = [];

  const add = (key, reason) => {
    if (used.has(key)) return;
    used.add(key);
    actions.push(withKey(key, reason));
  };

  // 1. Address the single lowest-scoring category first.
  add(
    FOCUS_ACTION_BY_CATEGORY[focusCategory] || "planner",
    focusCategory
      ? `${focusCategory} was your lowest-scoring area today.`
      : "A small self-care win can help across the board."
  );

  // 2. Social connection matters broadly; only skip it if it's already
  // strong, or already covered by step 1.
  const connectionScore =
    categoryScores.find((c) => c.category === "Connection")?.pct ?? 100;

  if (connectionScore < 60) {
    if (focusCategory === "Connection") {
      add(
        "reconnectGroup",
        "Connection was your focus area — group support offers another way in."
      );
    } else {
      add("reconnectText", "Your Connection score was low today too.");
    }
  } else {
    const secondLowest = [...categoryScores]
      .filter((c) => c.category !== focusCategory)
      .sort((a, b) => a.pct - b.pct)[0];

    if (secondLowest?.category === "Stress") {
      add("learnAcademic", "Stress was your next-lowest area.");
    } else {
      add("planner", "A few small wins across the board can help.");
    }
  }

  // 3. A closing action based on the overall result tier.
  if (resultId === "struggling") add("supportCrisis", RESULT_TIER_REASON.struggling);
  else if (resultId === "down") add("supportCounselor", RESULT_TIER_REASON.down);
  else if (resultId === "okay") add("wellnessTrends", RESULT_TIER_REASON.okay);
  else add("shareThrive", RESULT_TIER_REASON.good);

  return actions.slice(0, 3);
};
