import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const cards = [
    {
      emoji: "🧠",
      title: "Mental Health Issues",
      desc: "Explore common challenges like stress, anxiety, and burnout with guided support.",
      path: "/issues",
      color: "#5B45D6"
    },
    {
      emoji: "📚",
      title: "Resources",
      desc: "Find therapists, hotlines, apps, and professional help whenever you need it.",
      path: "/resources",
      color: "#7A4FB3"
    },
    {
      emoji: "💗",
      title: "Self-Care Planner",
      desc: "You do not need a perfect day. Just a few small acts of care can make a difference.",
      path: "/planner",
      color: "#B24373"
    }
  ];

  return (
    <Container className="mt-4">
      <div
        style={{
          textAlign: "center",
          padding: "48px 24px 40px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #f0ebff, #e8f4fd)",
          marginBottom: "32px",
          boxShadow: "0 8px 28px rgba(123,97,255,0.10)"
        }}
      >
        <p style={{ fontSize: "2.8rem", margin: 0 }} aria-hidden="true">
          🌿
        </p>

        <h1 style={{ fontSize: "2.4rem", margin: "12px 0 10px" }}>
          Welcome to Thrive Mind
        </h1>

        <p
          style={{
            color: "#4B5563",
            fontSize: "1.1rem",
            maxWidth: "520px",
            margin: "0 auto 24px"
          }}
        >
          Your mental health support hub — a safe space to explore, reflect,
          and find help.
        </p>

        <Button
          as={Link}
          to="/mood"
          className="btn-custom"
          style={{ padding: "10px 28px", fontSize: "1rem" }}
        >
          Check Your Mood →
        </Button>
      </div>

      <h2 className="visually-hidden-custom">
        Explore Thrive Mind Features
      </h2>

      <Row className="g-4 mb-4">
        {cards.map(({ emoji, title, desc, path, color }) => (
          <Col key={path} md={4}>
            <div
              className="card-style"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div
                  style={{ fontSize: "2rem", marginBottom: "10px" }}
                  aria-hidden="true"
                >
                  {emoji}
                </div>

                <h3
                  style={{
                    color,
                    fontSize: "1.1rem",
                    marginBottom: "8px"
                  }}
                >
                  {title}
                </h3>

                <p style={{ color: "#4B5563", fontSize: "0.95rem" }}>
                  {desc}
                </p>
              </div>

              <Button
                as={Link}
                to={path}
                className="btn-custom mt-3"
                style={{ alignSelf: "flex-start" }}
              >
                Explore →
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      <div
        style={{
          textAlign: "center",
          padding: "24px",
          borderRadius: "14px",
          background: "rgba(123,97,255,0.06)",
          color: "#5B45D6",
          fontWeight: "600",
          fontSize: "0.95rem"
        }}
      >
        💜 You are not alone. Help is always here.
      </div>
    </Container>
  );
}

export default Home;