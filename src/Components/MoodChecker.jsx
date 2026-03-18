import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function MoodChecker() {
  const [mood, setMood] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (mood === "sad") {
      setResult("Try taking a walk or listening to calming music.");
    } else if (mood === "anxious") {
      setResult("Try deep breathing or mindfulness.");
    } else {
      setResult("You're doing great! Keep it up.");
    }
  };

  return (
    <Container>
      <h2 className="mt-3">Mood Checker</h2>

      <Form.Select onChange={(e) => setMood(e.target.value)}>
        <option value="">Select your mood</option>
        <option value="sad">Sad</option>
        <option value="anxious">Anxious</option>
        <option value="happy">Happy</option>
      </Form.Select>

      <Button className="mt-3" onClick={handleSubmit}>
        Check
      </Button>

      {result && <p className="mt-3">{result}</p>}
    </Container>
  );
}

export default MoodChecker;