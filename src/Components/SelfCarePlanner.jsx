import { useEffect, useMemo, useState } from "react"; 
import { Badge, Button, Card, Col, Container, Form, ProgressBar, Row } from "react-bootstrap"; 
const STORAGE_KEY = "thrive_mind_self_care_planner"; 

const DEFAULT_TASKS = [
  { id: "water", label: "Drank water", emoji: "💧" },
  { id: "break", label: "Took a break", emoji: "🌸" },
  { id: "meal", label: "Ate a meal", emoji: "🍽️" },
  { id: "outside", label: "Went outside", emoji: "🌤️" },
  { id: "rest", label: "Got rest", emoji: "🛌" },
  { id: "note", label: "Listed things you are grateful for", emoji: "😇" },
  { id: "stretch", label: "Did a gentle stretch", emoji: "🧘" },
  { id: "music", label: "Listened to something calming", emoji: "🎵" },
  { id: "friend", label: "Checked in with someone you trust", emoji: "💬" },
  { id: "screen", label: "Took a short screen break", emoji: "📵" },
  { id: "breathe", label: "Paused for deep breathing", emoji: "🌬️" },
  { id: "kindness", label: "Spoke kindly to yourself", emoji: "💖" },
];

function SelfCarePlanner() {
  const [checkedItems, setCheckedItems] = useState(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY); 

    if (savedItems) {
      try {
        return JSON.parse(savedItems); 
      } catch {
        
      }
    }

    return DEFAULT_TASKS.reduce((accumulator, task) => {
      accumulator[task.id] = false; // Every item starts unchecked
      return accumulator;
    }, {});
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems)); 
  }, [checkedItems]);
//%
  const completedCount = useMemo(() => {
    return Object.values(checkedItems).filter(Boolean).length; 
  }, [checkedItems]);

  const progressPercent = useMemo(() => {
    return Math.round((completedCount / DEFAULT_TASKS.length) * 100);
  }, [completedCount]);

  const progressMessage = useMemo(() => {
    if (progressPercent >= 80) {
      return "You showed up for yourself in so many small ways today. So proud of you!!!"; // message for full completion
    }

    if (progressPercent >= 45) {
      return "You are making meaningful progress. Small caring actions really do count."; //s. trong progress
    }

    if (progressPercent >= 20) {
      return "A gentle reminder: even one completed step is still care."; //some progress
    }

    return "Start with one tiny act of care. You do not have to do everything at once."; //low progress
  }, [progressPercent]);

  const handleToggle = (taskId) => {
    setCheckedItems((previousItems) => ({
      ...previousItems, // keep old checkbox values
      [taskId]: !previousItems[taskId], // flip only the clicked checkbox
    }));
  };

  const handleReset = () => {
    const resetItems = DEFAULT_TASKS.reduce((accumulator, task) => {
      accumulator[task.id] = false; // reset every checkbox to false
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
        <h2 style={{ marginBottom: "6px" }}> 💗 Self-Care Planner</h2>

              <h5 className="mb-2" style={{ color: "#e370a2 " }}>A gentle checklist for today</h5>
            </div>

            <Card className="planner-progress-card border-0 mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <div>
                    <h5 className="mb-1">Today’s Progress</h5> 
                    <p className="mb-0 planner-muted-text">
                      {completedCount} of {DEFAULT_TASKS.length} tasks completed
                    </p>
                  </div>

                  <Badge className="planner-badge px-3 py-2">
                    {progressPercent}% done {/* progress badge!! */}
                  </Badge>
                </div>

                <ProgressBar
                  now={progressPercent} // sets current progress percentage
                  label={`${progressPercent}%`} // shows percentage text inside bar
                  className="planner-progress-bar"
                />

                <p className="planner-encouragement mt-3 mb-0">
                  {progressMessage} {/* supportive message based on progress */}
                </p>
              </Card.Body>
            </Card>

            <Row className="g-3">
              {DEFAULT_TASKS.map((task) => (
                <Col xs={12} md={6} key={task.id}>
                  <Card className="planner-task-card border-0 h-100">
                    <Card.Body className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="planner-emoji-circle">
                          <span>{task.emoji}</span> {/* emoji icon for each task */}
                        </div>

                        <div>
                          <h6 className="mb-1">{task.label}</h6> {/* task label */}
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

              <Button variant="outline-secondary" className="planner-secondary-btn" onClick={handleReset}>
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