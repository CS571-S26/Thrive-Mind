import { Container, Row, Col, Button } from "react-bootstrap";

function AboutUs() {
  const teamCards = [
    {
      emoji: "💗",
      title: "Why We Built Thrive Mind",
      color: "#E07BA0",
      text:
        "We built Thrive Mind to create a calm and welcoming space where users can learn about mental health, reflect on how they are feeling, and find support resources in one place."
    },
    {
      emoji: "🌿",
      title: "Our Goal",
      color: "#7B61FF",
      text:
        "Our goal is to make mental wellness support feel more approachable, gentle, and easy to explore. We wanted the website to feel supportive instead of overwhelming."    
    },
    {
      emoji: "✨",
      title: "What We Learned",
      color: "#4A90E2",
      text:
        "This project helped us practice React, routing, reusable components, React Bootstrap, state management, and building interactive features with a thoughtful user experience."
    }
  ];

  const features = [
    {
      emoji: "💙",
      title: "Mood Quiz",
      color: "#4A90E2",
      text:
        "A short interactive check in that helps users reflect on their current mood and receive supportive suggestions."
    },
    {
      emoji: "🧠",
      title: "Mental Health Issues",
      color: "#7B61FF",
      text:
        "A page that explains common challenges like stress, anxiety, burnout, loneliness, grief, and low self esteem."
    },
    {
      emoji: "📚",
      title: "Resources",
      color: "#C084FC",
      text:
        "A collection of crisis lines, therapy resources, mental health apps, campus support, and educational links."
    },
    {
      emoji: "💗",
      title: "Self Care Planner",
      color: "#E07BA0",
      text:
        "An interactive planner where users can track small daily wellness habits and see their progress."
    }
  ];

  return (
    <Container className="mt-4">
      <div className="card-style">
        <div
          style={{
            textAlign: "center",
            padding: "44px 24px 36px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #f0ebff, #fff3fa, #e8f4fd)",
            marginBottom: "30px",
            boxShadow: "0 8px 28px rgba(123,97,255,0.10)"
          }}
        >
          <p style={{ fontSize: "2.8rem", margin: 0 }}>🌸</p>

          <h1 style={{ fontSize: "2.35rem", margin: "12px 0 12px" }}>
            About Us
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "1.05rem",
              maxWidth: "760px",
              margin: "0 auto",
              lineHeight: "1.8"
            }}
          >
            Hi, we are <strong>Ishita</strong> and{" "}
            <strong>Charit</strong>, students at{" "}
            <strong>UW-Madison</strong>. We created{" "}
            <strong>Thrive Mind</strong> as a mental wellness website focused on
            support, reflection, and accessible self care tools.
          </p>
        </div>

        <Row className="g-4 mb-4">
          <Col lg={7}>
            <div
              style={{
                background: "linear-gradient(135deg, #ffffff, #fbf7ff)",
                borderRadius: "16px",
                padding: "24px",
                border: "1.5px solid #ede7f8",
                height: "100%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                minHeight: "520px", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center"
              }}
            >
              <h2 style={{ marginBottom: "12px" }}>🍀 Our Story</h2>

              <p
                style={{
                  color: "#5b6470",
                  lineHeight: "1.8",
                  marginBottom: "14px",
                  
                }}
              >
                As students, we understand that stress, pressure, and burnout
                can feel difficult to manage. That inspired us to create Thrive
                Mind as a soft and supportive space where people can pause,
                reflect, and find helpful tools.
                
              </p>

              <p
                style={{
                  color: "#5b6470",
                  lineHeight: "1.8",
                  marginBottom: 0
                }}
              >
                In the future, we hope to turn this initiative into something 
                larger than a website. Thrive Mind is our first step toward 
                creating an organization or NGO that supports mental wellness, 
                spreads awareness, and helps people feel more heard.
              </p>
            </div>
          </Col>

          <Col lg={5}>
            <div
              style={{
                background: "linear-gradient(135deg, #fff7fb, #f3edff)",
                borderRadius: "16px",
                padding: "24px",
                border: "1.5px solid #f0dceb",
                height: "100%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
              }}
            >
              <h2 style={{ marginBottom: "12px" }}>📬 Contact</h2>

              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "rgba(123,97,255,0.08)",
                  marginBottom: "14px"
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#7B61FF",
                    fontWeight: 700,
                    marginBottom: "6px"
                  }}
                >
                  Gmail
                </div>

                <a
                  href="mailto:ishafyiw@gmail.com"
                  style={{
                    textDecoration: "none",
                    color: "#4A4A4A",
                    fontWeight: 600,
                    wordBreak: "break-word"
                  }}
                >
                  ishafyiw@gmail.com
                </a>
              </div>

              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "rgba(224,123,160,0.09)",
                  marginBottom: "18px"
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#E07BA0",
                    fontWeight: 700,
                    marginBottom: "6px"
                  }}
                >
                  PS
                </div>

                <div
    style={{
      margin: 0,
      color: "#5b6470",
      lineHeight: "1.7",
      fontSize: "0.92rem"
    }}
  >
    <p style={{ marginBottom: "10px" }}>
      Please shoot us an email!
    </p>

    <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
      <li>Your thoughts or feedback</li>
      <li>Any Ideas</li>
      <li>Anything you want to talk about</li>
      <li>If you would like to collaborate,
      contribute ideas, or help us grow Thrive Mind into something bigger</li>
    </ul>
  </div>
</div>

              <Button
                className="btn-custom"
                href="mailto:yourgmail@gmail.com?subject=Thrive%20Mind%20Feedback"
              >
                Send Feedback
              </Button>
            </div>
          </Col>
        </Row>

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "16px" }}>🌷 About the Project</h2>

          <Row className="g-3">
            {teamCards.map((card, index) => (
              <Col md={4} key={index}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #faf7ff)",
                    borderRadius: "14px",
                    padding: "18px",
                    border: `1.5px solid ${card.color}30`,
                    height: "100%",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
                    {card.emoji}
                  </div>

                  <h5 style={{ color: card.color, marginBottom: "8px" }}>
                    {card.title}
                  </h5>

                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.93rem",
                      lineHeight: "1.65",
                      marginBottom: 0
                    }}
                  >
                    {card.text}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div>
          <h2 style={{ marginBottom: "16px" }}>🧩 What Thrive Mind Offers</h2>

          <Row className="g-3">
            {features.map((feature, index) => (
              <Col md={6} key={index}>
                <div
                  style={{
                    background: `${feature.color}08`,
                    borderRadius: "14px",
                    padding: "18px",
                    border: `1.5px solid ${feature.color}30`,
                    height: "100%",
                    transition: "all 0.18s ease"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px"
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>
                      {feature.emoji}
                    </span>

                    <h5
                      style={{
                        color: feature.color,
                        margin: 0
                      }}
                    >
                      {feature.title}
                    </h5>
                  </div>

                  <p
                    style={{
                      color: "#5a5a5a",
                      fontSize: "0.92rem",
                      lineHeight: "1.6",
                      marginBottom: 0
                    }}
                  >
                    {feature.text}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "28px",
            padding: "16px",
            borderRadius: "12px",
            background: "rgba(123,97,255,0.06)",
            color: "#7B61FF",
            fontSize: "0.92rem",
            fontWeight: 500
          }}
        >
          💜 Thank you for visiting Thrive Mind. Your feedback helps us make it
          better.
        </div>
      </div>
    </Container>
  );
}

export default AboutUs;