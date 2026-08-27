import { Card, ProgressBar } from "react-bootstrap";

function ProgressSummaryCard({
  completedCount,
  totalCount,
  progressPercent,
  progressMessage
}) {
  return (
    <Card className="planner-progress-card border-0 mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <div>
            <h2
              className="mb-1"
              style={{
                color: "#5B45D6",
                fontSize: "1.25rem"
              }}
            >
              Today’s Progress
            </h2>

            <p className="mb-0 planner-muted-text">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>

          <span
            style={{
              backgroundColor: "var(--accessible-purple)",
              color: "#ffffff",
              borderRadius: "14px",
              fontWeight: "700",
              padding: "12px 22px",
              display: "inline-block",
              fontSize: "1rem",
              minWidth: "140px",
              textAlign: "center"
            }}
          >
            {progressPercent}% done
          </span>
        </div>

        <ProgressBar className="planner-progress-bar">
          <ProgressBar
            now={progressPercent}
            label={`${progressPercent}%`}
            aria-label={`Self-care planner progress is ${progressPercent} percent`}
          />
        </ProgressBar>

        <p className="planner-encouragement mt-3 mb-0">{progressMessage}</p>
      </Card.Body>
    </Card>
  );
}

export default ProgressSummaryCard;
