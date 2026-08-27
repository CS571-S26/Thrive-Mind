import { Card, Col, Form } from "react-bootstrap";

function TaskCard({ task, checked, onToggle }) {
  return (
    <Col xs={12} md={6}>
      <Card className="planner-task-card border-0 h-100">
        <Card.Body className="d-flex align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="planner-emoji-circle" aria-hidden="true">
              <span>{task.emoji}</span>
            </div>

            <div>
              <h3
                className="mb-1"
                style={{
                  fontSize: "1rem",
                  color: "#3F3F46"
                }}
              >
                {task.label}
              </h3>

              <p className="mb-0 planner-muted-text">Yay! You did it!</p>
            </div>
          </div>

          <Form.Check
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            aria-label={task.label}
            className="planner-checkbox"
          />
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TaskCard;
