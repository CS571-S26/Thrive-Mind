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
      <div className="home-hero">
        <p className="home-hero-emoji" aria-hidden="true">
          🌿
        </p>

        <h1 className="home-hero-title">Welcome to Thrive Mind</h1>

        <p className="home-hero-subtitle">
          Your mental health support hub — a safe space to explore, reflect,
          and find help.
        </p>

        <Button as={Link} to="/mood" className="btn-custom home-hero-cta">
          Check Your Mood →
        </Button>
      </div>

      <h2 className="visually-hidden-custom">
        Explore Thrive Mind Features
      </h2>

      <Row className="g-4 mb-4">
        {cards.map(({ emoji, title, desc, path, color }) => (
          <Col key={path} md={4}>
            <div className="card-style home-card">
              <div>
                <div className="home-card-emoji" aria-hidden="true">
                  {emoji}
                </div>

                <h3
                  className="home-card-title"
                  style={{ "--card-accent": color }}
                >
                  {title}
                </h3>

                <p className="home-card-desc">{desc}</p>
              </div>

              <Button
                as={Link}
                to={path}
                className="btn-custom mt-3 home-card-cta"
              >
                Explore →
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      <div className="home-footer-note">
        💜 You are not alone. Help is always here.
      </div>
    </Container>
  );
}

export default Home;
