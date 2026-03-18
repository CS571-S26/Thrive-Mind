import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function MoodChecker() {
  const [mood, setMood] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (mood === "sad") {
      setResult("Try taking a walk, listening to calming music, or reaching out to someone you trust.");
    } else if (mood === "anxious") {
      setResult("Try deep breathing, mindfulness, or grounding exercises to help yourself feel more centered.");
    } else if (mood === "stressed") {
      setResult("Take a short break, drink some water, and focus on one small step at a time.");
    } else if (mood === "happy") {
      setResult("That is wonderful. Keep doing what supports your well-being and share that energy with others.");
    } else {
      setResult("Please select a mood so we can suggest something helpful.");
    }
  };

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h2>💙 Mood Checker</h2>
        <p style={{ marginBottom: "20px", color: "#6b7280" }}>
          Select how you are feeling right now and get a gentle suggestion.
        </p>

        <Form.Group>
          <Form.Select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{
              borderRadius: "12px",
              padding: "10px",
              border: "1px solid #d9d6f3",
              backgroundColor: "#ffffff"
            }}
          >
            <option value="">Select your mood</option>
            <option value="sad">Sad</option>
            <option value="anxious">Anxious</option>
            <option value="stressed">Stressed</option>
            <option value="happy">Happy</option>
          </Form.Select>
        </Form.Group>

        <Button className="btn-custom mt-3" onClick={handleSubmit}>
          Check Mood
        </Button>

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #eef4ff, #f7f0ff)",
              border: "1px solid #ddd6fe",
              color: "#4A4A4A",
              textAlign: "left"
            }}
          >
            <strong style={{ color: "#7B61FF" }}>Suggestion:</strong>
            <p style={{ marginTop: "8px" }}>{result}</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default MoodChecker;