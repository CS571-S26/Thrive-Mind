import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const issues = [
  {
    name: "Stress",
    emoji: "😓",
    color: "#7B61FF",
    tip1: "Take a short walk and step away for a few minutes.",
    tip2: "Try guided meditation or journaling to slow your thoughts.",
    extra: "Chronic stress can affect sleep and physical health. Consider speaking to a counselor if it persists."
  },
  {
    name: "Anxiety",
    emoji: "😰",
    color: "#4A90E2",
    tip1: "Practice deep breathing for a few minutes — inhale 4s, hold 4s, exhale 4s.",
    tip2: "Talk to a trusted friend or use mindfulness exercises to ground yourself.",
    extra: "Anxiety disorders are the most common mental health condition. A therapist can help with tools like CBT."
  },
  {
    name: "Burnout",
    emoji: "🔥",
    color: "#E07BA0",
    tip1: "Take a short break and rest without guilt.",
    tip2: "Set boundaries, reduce overload, and ask for support from friends or a supervisor.",
    extra: "Burnout can look like exhaustion, cynicism, and reduced effectiveness. Prioritizing rest is not weakness."
  },
  {
    name: "Loneliness",
    emoji: "💔",
    color: "#9B59B6",
    tip1: "Reach out to one person you trust today — even a short text helps.",
    tip2: "Join a community, support group, or campus organization to find connection.",
    extra: "Loneliness is a medical risk factor. Social bonds are as important as diet and sleep."
  },
  {
    name: "Fear",
    emoji: "😨",
    color: "#2980B9",
    tip1: "Pause and name what you are feeling — labeling emotions reduces their intensity.",
    tip2: "Break the problem into smaller steps and seek guidance from someone you trust.",
    extra: "Fear becomes a problem when it stops you from living your life. Exposure therapy and counseling can help."
  },
  {
    name: "Depression",
    emoji: "😔",
    color: "#5D6D7E",
    tip1: "Try to move your body gently — even a 10-minute walk can shift your mood.",
    tip2: "Speak to a mental health professional. Depression is treatable.",
    extra: "Depression is not a character flaw. It's a medical condition that responds well to treatment."
  },
  {
    name: "Grief",
    color: "#7F8C8D",
    tip1: "Give yourself permission to feel without judgment.",
    tip2: "Seek support from a grief counselor or support group — you do not need to heal alone.",
    extra: "Grief has no timeline. Be patient with yourself and accept help when offered."
  },
  {
    name: "Low Self-Esteem",
    emoji: "😞",
    color: "#C084FC",
    tip1: "Write three things you did well today — no matter how small.",
    tip2: "Consider therapy to explore and reshape unhelpful thought patterns.",
    extra: "Self-esteem can be rebuilt. Cognitive behavioral therapy is highly effective for this."
  },
];

function Issues() {
  const [expanded, setExpanded] = useState(null);

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h2 style={{ marginBottom: "6px" }}>🧠 Mental Health Issues</h2>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          Explore common challenges and supportive actions. Click any card to learn more.
        </p>

        <Row className="g-3">
          {issues.map((issue, index) => (
            <Col key={index} md={6} lg={6}>
              <div
                onClick={() => setExpanded(expanded === index ? null : index)}
                style={{
                  background: "linear-gradient(135deg, #ffffff, #f9f7ff)",
                  border: `1.5px solid ${expanded === index ? issue.color : "#e9e7f5"}`,
                  borderRadius: "14px",
                  padding: "18px",
                  cursor: "pointer",
                  boxShadow: expanded === index ? `0 6px 20px ${issue.color}22` : "0 4px 12px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "1.5rem" }}>{issue.emoji}</span>
                  <h3 style={{ color: issue.color, margin: 0, fontSize: "1.1rem" }}>{issue.name}</h3>
                </div>
                <p style={{ marginBottom: "6px", fontSize: "0.9rem" }}>
                  <strong style={{ color: "#4A90E2" }}>Quick Help:</strong> {issue.tip1}
                </p>
                <p style={{ marginBottom: expanded === index ? "10px" : 0, fontSize: "0.9rem" }}>
                  <strong style={{ color: "#C084FC" }}>Deeper Help:</strong> {issue.tip2}
                </p>
                {expanded === index && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: `${issue.color}0d`,
                      borderLeft: `3px solid ${issue.color}`,
                      fontSize: "0.85rem",
                      color: "#4A4A4A"
                    }}
                  >
                    💡 {issue.extra}
                  </div>
                )}
                <div style={{ textAlign: "right", marginTop: "6px", fontSize: "0.75rem", color: "#aaa" }}>
                  {expanded === index ? "▲ less" : "▼ more"}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Issues;