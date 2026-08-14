import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "./Components/Icon";

function Home() {
  const needs = [
    {
      emoji: "😰",
      label: "I'm feeling overwhelmed",
      path: "/issues?open=stress",
      color: "#5B45D6"
    },
    {
      emoji: "😴",
      label: "I'm exhausted",
      path: "/issues?open=burnout",
      color: "#B24373"
    },
    {
      emoji: "🧑‍🤝‍🧑",
      label: "I feel lonely",
      path: "/issues?open=loneliness",
      color: "#7A4FB3"
    },
    {
      emoji: "💬",
      label: "I want someone to talk to",
      path: "/resources?section=uw-madison-support",
      color: "#1F7A46"
    }
  ];

  return (
    <Container className="mt-4">
      <div className="home-hero">
        <div className="home-hero-icon">
          <Icon name="leaf" size={40} />
        </div>

        <p className="home-hero-kicker">🎓 Mental Wellness for College Students</p>

        <h1 className="home-hero-title">
          Feel better. Understand yourself. Find support.
        </h1>

        <p className="home-hero-subtitle">
          Thrive Mind is a mental wellness hub built for college students — a
          safe space to check in, reflect, and connect with the right kind of
          help, from campus resources to crisis support.
        </p>

        <div className="home-hero-actions">
          <Button as={Link} to="/mood" className="btn-custom home-hero-cta">
            Check My Mood →
          </Button>

          <Button
            as={Link}
            to="/resources"
            className="home-hero-cta-secondary"
          >
            Find Support →
          </Button>
        </div>
      </div>

      <div className="home-need-section">
        <h2 className="home-need-title">What do you need right now?</h2>

        <Row className="g-3">
          {needs.map(({ emoji, label, path, color }, index) => (
            <Col key={path} sm={6} lg={3}>
              <Link
                to={path}
                className="home-need-card fade-in-item"
                style={{ "--card-accent": color, animationDelay: `${index * 0.06}s` }}
              >
                <div className="home-need-emoji" aria-hidden="true">
                  {emoji}
                </div>

                <div className="home-need-label">{label}</div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      <div className="home-footer-note">
        💜 You are not alone. Help is always here.
      </div>
    </Container>
  );
}

export default Home;
