import { useState } from "react";
import { Container, Button, ProgressBar } from "react-bootstrap";

const questions = [
  {
    question: "How has your energy been today?",
    options: [
      { label: "😴 Very low, barely able to do things", score: 1 },
      { label: "😞 Lower than usual", score: 2 },
      { label: "😐 About normal", score: 3 },
      { label: "😊 Good, feeling energized", score: 4 },
    ]
  },
  {
    question: "How connected do you feel to people around you?",
    options: [
      { label: "😢 Very isolated and alone", score: 1 },
      { label: "😔 A bit disconnected", score: 2 },
      { label: "🙂 Okay — some connection", score: 3 },
      { label: "💛 Loved and supported", score: 4 },
    ]
  },
  {
    question: "How have you been sleeping recently?",
    options: [
      { label: "😩 Very poorly — barely sleeping", score: 1 },
      { label: "😟 Not great, restless nights", score: 2 },
      { label: "😌 Decent enough", score: 3 },
      { label: "😴 Really well, feeling rested", score: 4 },
    ]
  },
  {
    question: "How would you describe your overall mood right now?",
    options: [
      { label: "😞 Very down or hopeless", score: 1 },
      { label: "😕 Struggling a bit", score: 2 },
      { label: "😶 Neutral — just getting by", score: 3 },
      { label: "😄 Positive and hopeful", score: 4 },
    ]
  },
  {
    question: "How well are you managing stress or worries?",
    options: [
      { label: "😰 Feeling overwhelmed", score: 1 },
      { label: "😟 It's hard to cope", score: 2 },
      { label: "😐 Managing okay", score: 3 },
      { label: "✅ Handling things well", score: 4 },
    ]
  }
];

const getResult = (total) => {
  const max = questions.length * 4;
  const pct = (total / max) * 100;
  if (pct <= 35) return {
    label: "Struggling Right Now",
    emoji: "💙",
    color: "#5D6D7E",
    message: "It sounds like you're going through a tough time. Please know that support is available. Consider reaching out to a counselor or calling a helpline — you deserve care.",
    suggestion: "Visit our Resources page for professional help options.",
    link: "/resources"
  };
  if (pct <= 55) return {
    label: "Feeling a Bit Down",
    emoji: "🌧️",
    color: "#7B61FF",
    message: "You're managing, but things feel heavier than usual. Small acts of self-care and connecting with others can help. You don't have to push through alone.",
    suggestion: "Try our Issues page for specific coping strategies.",
    link: "/issues"
  };
  if (pct <= 75) return {
    label: "Doing Okay",
    emoji: "🌤️",
    color: "#4A90E2",
    message: "You're in a decent place, but there's always room to nurture your wellbeing. Keep checking in with yourself and stay connected to what grounds you.",
    suggestion: "Explore our mental health resources to stay ahead of stress.",
    link: "/resources"
  };
  return {
    label: "Feeling Good",
    emoji: "🌟",
    color: "#27AE60",
    message: "You're in a strong place right now — that's great! Keep up the habits that support your wellbeing and remember to be there for others around you too.",
    suggestion: "Share Thrive Mind with someone who might need it.",
    link: "/"
  };
};

function MoodChecker() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const handleSelect = (score) => {
    const updated = [...answers];
    updated[current] = score;
    setAnswers(updated);
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      setTimeout(() => setDone(true), 300);
    }
  };

  const reset = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setDone(false);
  };

  const total = answers.reduce((sum, a) => sum + (a || 0), 0);
  const result = done ? getResult(total) : null;
  const progress = done ? 100 : ((current) / questions.length) * 100;

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h2 style={{ marginBottom: "6px" }}>💙 Mood Quiz</h2>
        <p style={{ color: "#6b7280", marginBottom: "16px" }}>
          Answer {questions.length} quick questions to check in with your mental wellbeing.
        </p>

        <ProgressBar
          now={progress}
          style={{ height: "8px", borderRadius: "8px", marginBottom: "24px" }}
          variant={done ? "success" : "info"}
        />

        {!done ? (
          <div>
            <p style={{ fontSize: "0.8rem", color: "#aaa", marginBottom: "6px" }}>
              Question {current + 1} of {questions.length}
            </p>
            <h4 style={{ color: "#4A4A4A", marginBottom: "20px", fontSize: "1.05rem" }}>
              {questions[current].question}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt.score)}
                  style={{
                    background: answers[current] === opt.score ? "linear-gradient(135deg, #CDB4DB, #A7C7E7)" : "#f8f7ff",
                    border: "1.5px solid #e0ddf5",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    color: "#333",
                    transition: "all 0.15s ease",
                    fontFamily: "inherit"
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>{result.emoji}</div>
            <h3 style={{ color: result.color, marginBottom: "10px" }}>{result.label}</h3>
            <p style={{
              padding: "16px",
              borderRadius: "12px",
              background: `${result.color}11`,
              color: "#4A4A4A",
              lineHeight: "1.6",
              marginBottom: "16px"
            }}>
              {result.message}
            </p>
            <p style={{ color: "#7B61FF", fontSize: "0.9rem", marginBottom: "20px" }}>
              💡 {result.suggestion}
            </p>
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