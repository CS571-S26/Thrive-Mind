import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ProgressBar,
  Row
} from "react-bootstrap";
import {
  getEntryForDate,
  getStreak,
  saveEntryForDate
} from "../utils/selfCareHistory";
import { DEFAULT_TASKS } from "../utils/selfCareTasks";
import Icon from "./Icon";

function SelfCarePlanner() {
  const [checkedItems, setCheckedItems] = useState(() =>
    getEntryForDate(DEFAULT_TASKS)
  );

  useEffect(() => {
    saveEntryForDate(checkedItems);
  }, [checkedItems]);

  const completedCount = useMemo(() => {
    return Object.values(checkedItems).filter(Boolean).length;
  }, [checkedItems]);

  const streak = useMemo(() => getStreak(completedCount), [completedCount]);

  const progressPercent = useMemo(() => {
    return Math.round((completedCount / DEFAULT_TASKS.length) * 100);
  }, [completedCount]);

  const progressMessage = useMemo(() => {
    if (progressPercent >= 80) {
      return "You showed up for yourself in so many small ways today. So proud of you!!!";
    }

    if (progressPercent >= 45) {
      return "You are making meaningful progress. Small caring actions really do count.";
    }

    if (progressPercent >= 20) {
      return "A gentle reminder: even one completed step is still care.";
    }

    return "Start with one tiny act of care. You do not have to do everything at once.";
  }, [progressPercent]);

  const handleToggle = (taskId) => {
    setCheckedItems((previousItems) => ({
      ...previousItems,
      [taskId]: !previousItems[taskId]
    }));
  };

  const handleReset = () => {
    const resetItems = DEFAULT_TASKS.reduce((accumulator, task) => {
      accumulator[task.id] = false;
      return accumulator;
    }, {});

    setCheckedItems(resetItems);
  };

  const handleCompleteAll = () => {
    const completedItems = DEFAULT_TASKS.reduce((accumulator, task) => {
      accumulator[task.id] = true;
      return accumulator;
    }, {});

    setCheckedItems(completedItems);
  };

  return (
    <div className="page-shell">
      <Container>
        <Card className="planner-card border-0 shadow-sm">
          <Card.Body className="p-4 p-md-5">
            <div className="planner-header">
              <h1 className="page-title">
                <Icon name="planner" size={28} /> Self-Care Planner
              </h1>

              <h2
                className="mb-3"
                style={{
                  color: "#B24373",
                  fontSize: "1.25rem"
                }}
              >
                A gentle checklist for today
              </h2>

              {streak > 0 && (
                <div className="planner-streak-badge">
                  🔥 {streak}-day streak
                </div>
              )}
            </div>

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
                      {completedCount} of {DEFAULT_TASKS.length} tasks completed
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

                <ProgressBar
                  now={progressPercent}
                  label={`${progressPercent}%`}
                  className="planner-progress-bar"
                  aria-label={`Self-care planner progress is ${progressPercent} percent`}
                />

                <p className="planner-encouragement mt-3 mb-0">
                  {progressMessage}
                </p>
              </Card.Body>
            </Card>

            <h2 className="visually-hidden-custom">
              Self-Care Checklist Tasks
            </h2>

            <Row className="g-3">
              {DEFAULT_TASKS.map((task) => (
                <Col xs={12} md={6} key={task.id}>
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

                          <p className="mb-0 planner-muted-text">
                            Yay! You did it!
                          </p>
                        </div>
                      </div>

                      <Form.Check
                        type="checkbox"
                        checked={checkedItems[task.id]}
                        onChange={() => handleToggle(task.id)}
                        aria-label={task.label}
                        className="planner-checkbox"
                      />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Button className="planner-primary-btn" onClick={handleCompleteAll}>
                Complete All
              </Button>

              <Button
                variant="outline-secondary"
                className="planner-secondary-btn"
                onClick={handleReset}
              >
                Reset Planner
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SelfCarePlanner;