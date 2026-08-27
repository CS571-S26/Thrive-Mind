import { Button } from "react-bootstrap";
import CategoryBreakdown from "./CategoryBreakdown.jsx";
import RecommendationCard from "./RecommendationCard.jsx";
import { getRecommendedActions } from "../../utils/recommendations";

function QuizResults({
  result,
  categoryScores,
  focusCategory,
  barsVisible,
  priorEntries,
  onRetake
}) {
  const recommendedActions = getRecommendedActions(
    { id: result.id, categoryScores, focusCategory },
    priorEntries
  );

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "12px" }} aria-hidden="true">
        {result.emoji}
      </div>

      <h2 style={{ color: result.color, marginBottom: "10px" }}>{result.label}</h2>

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

      <CategoryBreakdown
        categoryScores={categoryScores}
        focusCategory={focusCategory}
        barsVisible={barsVisible}
      />

      <div className="mood-actions">
        <h3 className="mood-actions-title">
          Based on your check-in, here's what you could try now
        </h3>

        <div className="mood-actions-grid">
          {recommendedActions.map((action) => (
            <RecommendationCard action={action} key={action.id} />
          ))}
        </div>
      </div>

      <Button className="btn-custom" onClick={onRetake}>
        Retake Quiz
      </Button>
    </div>
  );
}

export default QuizResults;
