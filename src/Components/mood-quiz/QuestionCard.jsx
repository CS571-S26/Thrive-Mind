function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedScore,
  onSelect,
  onBack,
  showBack
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px"
        }}
      >
        <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: 0 }}>
          Question {questionNumber} of {totalQuestions}
        </p>

        {showBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back to the previous question"
            style={{
              background: "none",
              border: "none",
              color: "var(--color-primary)",
              fontSize: "0.85rem",
              fontWeight: "600",
              cursor: "pointer",
              padding: "4px 6px"
            }}
          >
            ← Back
          </button>
        )}
      </div>

      <h2
        style={{
          color: "#3F3F46",
          marginBottom: "20px",
          fontSize: "1.2rem"
        }}
      >
        {question.question}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        {question.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(opt.score)}
            style={{
              background:
                selectedScore === opt.score
                  ? "linear-gradient(135deg, var(--color-primary-light), var(--color-primary))"
                  : "#f8f7ff",
              border: "1.5px solid #d7d4e8",
              borderRadius: "12px",
              padding: "12px 16px",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              color: selectedScore === opt.score ? "#ffffff" : "#2F2F35",
              transition: "all 0.15s ease",
              fontFamily: "inherit",
              fontWeight: selectedScore === opt.score ? "700" : "500"
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
