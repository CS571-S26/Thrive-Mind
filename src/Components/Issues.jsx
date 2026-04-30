import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const issues = [
  {
    name: "Stress",
    emoji: "😓",
    color: "#5B45D6",
    tip1: "Take a short walk and step away for a few minutes.",
    tip2: "Try guided meditation or journaling to slow your thoughts.",
    extra: "Chronic stress can affect sleep and physical health. Consider speaking to a counselor if it persists."
  },
  {
    name: "Anxiety",
    emoji: "😰",
    color: "#2C6FB3",
    tip1: "Practice deep breathing for a few minutes — inhale 4s, hold 4s, exhale 4s.",
    tip2: "Talk to a trusted friend or use mindfulness exercises to ground yourself.",
    extra: "Anxiety disorders are common mental health conditions. A therapist can help with tools like CBT."
  },
  {
    name: "Burnout",
    emoji: "🔥",
    color: "#B24373",
    tip1: "Take a short break and rest without guilt.",
    tip2: "Set boundaries, reduce overload, and ask for support from friends or a supervisor.",
    extra: "Burnout can look like exhaustion, cynicism, and reduced effectiveness. Prioritizing rest is not weakness."
  },
  {
    name: "Loneliness",
    emoji: "💔",
    color: "#7A4FB3",
    tip1: "Reach out to one person you trust today — even a short text helps.",
    tip2: "Join a community, support group, or campus organization to find connection.",
    extra: "Social connection matters. Even small moments of connection can help you feel less alone."
  },
  {
    name: "Fear",
    emoji: "😨",
    color: "#2C6FB3",
    tip1: "Pause and name what you are feeling — labeling emotions can reduce their intensity.",
    tip2: "Break the problem into smaller steps and seek guidance from someone you trust.",
    extra: "Fear becomes harder when it stops you from living your life. Counseling can help you build tools to manage it."
  },
  {
    name: "Depression",
    emoji: "😔",
    color: "#4B5563",
    tip1: "Try to move your body gently — even a 10-minute walk can shift your mood.",
    tip2: "Speak to a mental health professional. Depression is treatable.",
    extra: "Depression is not a character flaw. It is a condition that can improve with support and treatment."
  },
  {
    name: "Grief",
    emoji: "🕊️",
    color: "#4B5563",
    tip1: "Give yourself permission to feel without judgment.",
    tip2: "Seek support from a grief counselor or support group — you do not need to heal alone.",
    extra: "Grief has no fixed timeline. Be patient with yourself and accept help when offered."
  },
  {
    name: "Low Self-Esteem",
    emoji: "😞",
    color: "#7A4FB3",
    tip1: "Write three things you did well today — no matter how small.",
    tip2: "Consider therapy to explore and reshape unhelpful thought patterns.",
    extra: "Self-esteem can be rebuilt. Cognitive behavioral therapy is one helpful approach."
  }
];

function Issues() {
  const [expanded, setExpanded] = useState(null);

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h1 style={{ marginBottom: "6px" }}>
          🧠 Mental Health Issues
        </h1>

        <p style={{ color: "#4B5563", marginBottom: "24px" }}>
          Explore common challenges and supportive actions. Click any card to
          learn more.
        </p>

        <h2 className="visually-hidden-custom">
          List of Mental Health Issues
        </h2>

        <Row className="g-3">
          {issues.map((issue, index) => (
            <Col key={index} md={6} lg={6}>
              <button
                type="button"
                onClick={() => setExpanded(expanded === index ? null : index)}
                aria-expanded={expanded === index}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "linear-gradient(135deg, #ffffff, #f9f7ff)",
                  border: `1.5px solid ${
                    expanded === index ? issue.color : "#d7d4e8"
                  }`,
                  borderRadius: "14px",
                  padding: "18px",
                  cursor: "pointer",
                  boxShadow:
                    expanded === index
                      ? `0 6px 20px ${issue.color}22`
                      : "0 4px 12px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px"
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }} aria-hidden="true">
                    {issue.emoji}
                  </span>

                  <h2
                    style={{
                      color: issue.color,
                      margin: 0,
                      fontSize: "1.1rem"
                    }}
                  >
                    {issue.name}
                  </h2>
                </div>

                <p style={{ marginBottom: "6px", fontSize: "0.9rem", color: "#3F3F46" }}>
                  <strong style={{ color: "#2C6FB3" }}>Quick Help:</strong>{" "}
                  {issue.tip1}
                </p>

                <p
                  style={{
                    marginBottom: expanded === index ? "10px" : 0,
                    fontSize: "0.9rem",
                    color: "#3F3F46"
                  }}
                >
                  <strong style={{ color: "#7A4FB3" }}>Deeper Help:</strong>{" "}
                  {issue.tip2}
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
                      color: "#3F3F46"
                    }}
                  >
                    💡 {issue.extra}
                  </div>
                )}

                <div
                  style={{
                    textAlign: "right",
                    marginTop: "6px",
                    fontSize: "0.8rem",
                    color: "#4B5563"
                  }}
                >
                  {expanded === index ? "▲ less" : "▼ more"}
                </div>
              </button>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Issues;