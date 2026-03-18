import { Container } from "react-bootstrap";

const issues = [
  {
    name: "Stress",
    tip1: "Take a short walk and step away for a few minutes.",
    tip2: "Try guided meditation or journaling to slow your thoughts."
  },
  {
    name: "Anxiety",
    tip1: "Practice deep breathing for a few minutes.",
    tip2: "Talk to a trusted friend or use mindfulness exercises."
  },
  {
    name: "Burnout",
    tip1: "Take a short break and rest without guilt.",
    tip2: "Set boundaries, reduce overload, and ask for support."
  },
  {
    name: "Loneliness",
    tip1: "Reach out to one person you trust today.",
    tip2: "Join a community, support group, or campus organization."
  },
  {
    name: "Fear",
    tip1: "Pause and name what you are feeling.",
    tip2: "Break the problem into smaller steps and seek guidance."
  }
];

function Issues() {
  return (
    <Container className="mt-4">
      <div className="card-style">
        <h2> Mental Health Issues</h2>
        <p style={{ marginBottom: "20px", color: "#6b7280" }}>
          Explore a few common challenges and supportive actions you can try.
        </p>

        {issues.map((issue, index) => (
          <div
            key={index}
            style={{
              background: "linear-gradient(135deg, #ffffff, #f6f7ff)",
              border: "1px solid #e9e7f5",
              borderRadius: "14px",
              padding: "18px",
              marginBottom: "16px",
              textAlign: "left",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.04)"
            }}
          >
            <h3 style={{ color: "#7B61FF", marginBottom: "10px" }}>
              {issue.name}
            </h3>
            <p style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#4A90E2" }}>Quick Help:</strong> {issue.tip1}
            </p>
            <p>
              <strong style={{ color: "#C084FC" }}>Deeper Help:</strong> {issue.tip2}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Issues;