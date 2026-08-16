import { useEffect, useState } from "react";
import { Container, Button, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getLastMoodEntry,
  getShortLabelForEntry,
  saveMoodEntry
} from "../utils/moodHistory";
import { getRecommendedActions, TYPE_LABELS } from "../utils/recommendations";
import {
  getCategoryScores,
  getFocusCategory,
  getPct,
  getResult
} from "../utils/moodScoring";
import Icon from "./Icon";

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

function MoodChecker() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [lastEntry, setLastEntry] = useState(getLastMoodEntry);
  const [categoryScores, setCategoryScores] = useState([]);
  const [focusCategory, setFocusCategory] = useState(null);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    if (!done) return;
    const frame = requestAnimationFrame(() => setBarsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [done]);

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

      setCategoryScores(scores);
      setFocusCategory(focus);
      setLastEntry(
        saveMoodEntry(
          getResult(finalTotal, questions.length),
          getPct(finalTotal, questions.length),
          scores,
          focus
        )
      );
      setTimeout(() => setDone(true), 300);
    }
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

        <ProgressBar
          now={progress}
          style={{
            height: "8px",
            borderRadius: "8px",
            marginBottom: "24px"
          }}
          variant={done ? "success" : "info"}
          aria-label={`Mood quiz progress is ${Math.round(progress)} percent`}
        />

        {!done ? (
          <div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#4B5563",
                marginBottom: "6px"
              }}
            >
              Question {current + 1} of {questions.length}
            </p>

            <h2
              style={{
                color: "#3F3F46",
                marginBottom: "20px",
                fontSize: "1.2rem"
              }}
            >
              {questions[current].question}
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(opt.score)}
                  style={{
                    background:
                      answers[current] === opt.score
                        ? "linear-gradient(135deg, var(--color-primary-light), var(--color-primary))"
                        : "#f8f7ff",
                    border: "1.5px solid #d7d4e8",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    color: answers[current] === opt.score ? "#ffffff" : "#2F2F35",
                    transition: "all 0.15s ease",
                    fontFamily: "inherit",
                    fontWeight: answers[current] === opt.score ? "700" : "500"
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }} aria-hidden="true">
              {result.emoji}
            </div>

            <h2 style={{ color: result.color, marginBottom: "10px" }}>
              {result.label}
            </h2>

            <p
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: `${result.color}11`,
                color: "#3F3F46",
                lineHeight: "1.6",
                marginBottom: "20px"
              }}
            >
              {result.message}
            </p>

            <div className="mood-breakdown">
              <h3 className="mood-breakdown-title">Your check-in</h3>

              {categoryScores.map((entry) => (
                <div className="mood-category-row" key={entry.category}>
                  <span className="mood-category-label">{entry.category}</span>

                  <span className="mood-category-track">
                    <span
                      className="mood-category-fill"
                      style={{ width: barsVisible ? `${entry.pct}%` : "0%" }}
                    />
                  </span>

                  <span className="mood-category-pct">{entry.pct}%</span>
                </div>
              ))}

              {focusCategory && (
                <p className="mood-focus-callout">
                  🎯 Your biggest area to focus on today:{" "}
                  <strong>{focusCategory}</strong>
                </p>
              )}
            </div>

            <div className="mood-actions">
              <h3 className="mood-actions-title">
                Based on your check-in, here's what you could try now
              </h3>

              <div className="mood-actions-grid">
                {getRecommendedActions({
                  id: result.id,
                  categoryScores,
                  focusCategory
                }).map((action) => (
                  <Link
                    to={action.link}
                    className="mood-action-card"
                    key={action.id}
                    aria-label={`${TYPE_LABELS[action.type]}: ${action.title} — ${action.desc}`}
                  >
                    <span className="mood-action-type">
                      {TYPE_LABELS[action.type]}
                    </span>
                    <div className="mood-action-emoji" aria-hidden="true">
                      {action.emoji}
                    </div>
                    <div className="mood-action-title">{action.title}</div>
                    <p className="mood-action-desc">{action.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <Button className="btn-custom" onClick={reset}>
              Retake Quiz
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default MoodChecker;
