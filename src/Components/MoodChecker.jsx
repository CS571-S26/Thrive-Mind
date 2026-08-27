import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  getLastMoodEntry,
  getMoodHistory,
  getShortLabelForEntry,
  saveMoodEntry
} from "../utils/moodHistory";
import {
  getCategoryScores,
  getFocusCategory,
  getPct,
  getResult
} from "../utils/moodScoring";
import { fetchMoodEntries, createMoodEntry } from "../api/moodEntries.js";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "./Icon";
import ProgressIndicator from "./mood-quiz/ProgressIndicator.jsx";
import QuestionCard from "./mood-quiz/QuestionCard.jsx";
import QuizResults from "./mood-quiz/QuizResults.jsx";

const DISCLAIMER =
  "This check-in is not a diagnostic tool. It's designed to help you reflect on how you're feeling and connect you with the right kind of support.";

const questions = [
  {
    category: "Energy",
    question: "How has your energy been today?",
    options: [
      { label: "😴 Very low, barely able to do things", score: 1 },
      { label: "😞 Lower than usual", score: 2 },
      { label: "😐 About normal", score: 3 },
      { label: "😊 Good, feeling energized", score: 4 }
    ]
  },
  {
    category: "Connection",
    question: "How connected do you feel to people around you?",
    options: [
      { label: "😢 Very isolated and alone", score: 1 },
      { label: "😔 A bit disconnected", score: 2 },
      { label: "🙂 Okay — some connection", score: 3 },
      { label: "💛 Loved and supported", score: 4 }
    ]
  },
  {
    category: "Sleep",
    question: "How have you been sleeping recently?",
    options: [
      { label: "😩 Very poorly — barely sleeping", score: 1 },
      { label: "😟 Not great, restless nights", score: 2 },
      { label: "😌 Decent enough", score: 3 },
      { label: "😴 Really well, feeling rested", score: 4 }
    ]
  },
  {
    category: "Mood",
    question: "How would you describe your overall mood right now?",
    options: [
      { label: "😞 Very down or hopeless", score: 1 },
      { label: "😕 Struggling a bit", score: 2 },
      { label: "😶 Neutral — just getting by", score: 3 },
      { label: "😄 Positive and hopeful", score: 4 }
    ]
  },
  {
    category: "Stress",
    question: "How well are you managing stress or worries?",
    options: [
      { label: "😰 Feeling overwhelmed", score: 1 },
      { label: "😟 It's hard to cope", score: 2 },
      { label: "😐 Managing okay", score: 3 },
      { label: "✅ Handling things well", score: 4 }
    ]
  }
];

const questionCategories = questions.map((q) => q.category);

const PROGRESS_KEY = "thrive_mind_mood_quiz_progress";

function getSavedProgress() {
  try {
    const raw = sessionStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed.answers) &&
      parsed.answers.length === questions.length &&
      typeof parsed.current === "number"
    ) {
      return parsed;
    }
  } catch {
    // ignore corrupt/unavailable storage
  }
  return null;
}

function MoodChecker() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState(
    () => getSavedProgress()?.answers ?? Array(questions.length).fill(null)
  );
  const [current, setCurrent] = useState(() => {
    const saved = getSavedProgress();
    if (!saved) return 0;
    return Math.min(Math.max(saved.current, 0), questions.length - 1);
  });
  const [done, setDone] = useState(false);
  const [lastEntry, setLastEntry] = useState(getLastMoodEntry);
  // Prior check-ins (not including whatever the user is about to submit),
  // used to make the results screen's recommendation reasons context-aware
  // instead of only ever looking at today's single check-in.
  const [priorEntries, setPriorEntries] = useState(() =>
    user ? [] : getMoodHistory()
  );
  const [categoryScores, setCategoryScores] = useState([]);
  const [focusCategory, setFocusCategory] = useState(null);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    if (!done) return;
    const frame = requestAnimationFrame(() => setBarsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [done]);

  // Signed-in users' history lives on the server, not localStorage — refresh
  // the "last check-in" banner (and the recent-history window used for
  // context-aware recommendation reasons) from there once we know who's
  // signed in.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    fetchMoodEntries(5).then((entries) => {
      if (cancelled) return;
      if (entries[0]) setLastEntry(entries[0]);
      setPriorEntries(entries);
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    // Nothing to resume once every question is answered — completion (and
    // the results screen) is one render away regardless of whether `done`
    // has flipped true yet, so this can't wait on `done` to clear.
    const noProgressToSave =
      done || answers.every((a) => a === null) || answers.every((a) => a !== null);

    if (noProgressToSave) {
      sessionStorage.removeItem(PROGRESS_KEY);
      return;
    }

    sessionStorage.setItem(PROGRESS_KEY, JSON.stringify({ answers, current }));
  }, [answers, current, done]);

  const handleSelect = (score) => {
    const updated = [...answers];
    updated[current] = score;
    setAnswers(updated);

    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      const finalTotal = updated.reduce((sum, a) => sum + (a || 0), 0);
      const scores = getCategoryScores(updated, questionCategories);
      const focus = getFocusCategory(scores);
      const finalResult = getResult(finalTotal, questions.length);
      const finalPct = getPct(finalTotal, questions.length);

      setCategoryScores(scores);
      setFocusCategory(focus);

      if (user) {
        // Best-effort: the quiz result is already computed and shown locally
        // (moodScoring.js is pure), so a slow or failed save shouldn't block
        // or break the results screen — it just means this check-in won't
        // show up in the synced history.
        createMoodEntry({
          resultId: finalResult.id,
          label: finalResult.label,
          emoji: finalResult.emoji,
          pct: finalPct,
          suggestion: finalResult.suggestion,
          link: finalResult.link,
          categoryScores: scores,
          focusCategory: focus
        })
          .then((entry) => {
            setLastEntry(entry);
            // So an immediate retake's recommendation reason accounts for
            // this check-in too, not just the ones fetched on mount.
            setPriorEntries((prev) => [entry, ...prev]);
          })
          .catch(() => {});
      } else {
        const saved = saveMoodEntry(finalResult, finalPct, scores, focus);
        setLastEntry(saved);
        setPriorEntries((prev) => [saved, ...prev]);
      }

      setTimeout(() => setDone(true), 300);
    }
  };

  const goBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const reset = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setDone(false);
    setCategoryScores([]);
    setFocusCategory(null);
    setBarsVisible(false);
  };

  const total = answers.reduce((sum, a) => sum + (a || 0), 0);
  const result = done ? getResult(total, questions.length) : null;
  const progress = done ? 100 : (current / questions.length) * 100;

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h1 className="page-title">
          <Icon name="heart" size={28} /> Mood Quiz
        </h1>

        <p style={{ color: "#4B5563", marginBottom: "12px" }}>
          Answer {questions.length} quick questions to check in with your mental
          wellbeing.
        </p>

        <p className="mood-disclaimer">{DISCLAIMER}</p>

        {!done && current === 0 && !answers[0] && lastEntry && (
          <p
            style={{
              fontSize: "0.85rem",
              color: "#5B45D6",
              background: "rgba(91,69,214,0.08)",
              borderRadius: "10px",
              padding: "8px 12px",
              marginBottom: "16px"
            }}
          >
            {lastEntry.emoji} Last check-in on{" "}
            {new Date(lastEntry.date).toLocaleDateString()}:{" "}
            {getShortLabelForEntry(lastEntry)}
          </p>
        )}

        <ProgressIndicator progress={progress} done={done} />

        {!done ? (
          <QuestionCard
            question={questions[current]}
            questionNumber={current + 1}
            totalQuestions={questions.length}
            selectedScore={answers[current]}
            onSelect={handleSelect}
            onBack={goBack}
            showBack={current > 0}
          />
        ) : (
          <QuizResults
            result={result}
            categoryScores={categoryScores}
            focusCategory={focusCategory}
            barsVisible={barsVisible}
            priorEntries={priorEntries}
            onRetake={reset}
          />
        )}
      </div>
    </Container>
  );
}

export default MoodChecker;
