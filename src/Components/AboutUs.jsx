import { Container, Row, Col, Button } from "react-bootstrap";

function AboutUs() {
  const teamCards = [
    {
      emoji: "💗",
      title: "Why We Built Thrive Mind",
      color: "#B24373",
      text:
        "We built Thrive Mind to create a calm and welcoming space where users can learn about mental health, reflect on how they are feeling, and find support resources in one place."
    },
    {
      emoji: "🌿",
      title: "Our Goal",
      color: "#5B45D6",
      text:
        "Our goal is to make mental wellness support feel more approachable, gentle, and easy to explore. We wanted the website to feel supportive instead of overwhelming."
    },
    {
      emoji: "✨",
      title: "What We Learned",
      color: "#2C6FB3",
      text:
        "This project helped us practice React, routing, reusable components, React Bootstrap, state management, and building interactive features with a thoughtful user experience."
    }
  ];

  const features = [
    {
      emoji: "💙",
      title: "Mood Quiz",
      color: "#2C6FB3",
      text:
        "A short interactive check in that helps users reflect on their current mood and receive supportive suggestions."
    },
    {
      emoji: "🧠",
      title: "Mental Health Issues",
      color: "#5B45D6",
      text:
        "A page that explains common challenges like stress, anxiety, burnout, loneliness, grief, and low self esteem."
    },
    {
      emoji: "📚",
      title: "Resources",
      color: "#7A4FB3",
      text:
        "A collection of crisis lines, therapy resources, mental health apps, campus support, and educational links."
    },
    {
      emoji: "💗",
      title: "Self Care Planner",
      color: "#B24373",
      text:
        "An interactive planner where users can track small daily wellness habits and see their progress."
    }
  ];

  return (
    <Container className="mt-4">
      <div className="card-style">
        <div className="about-hero">
          <p className="about-hero-emoji" aria-hidden="true">
            🌸
          </p>

          <h1 className="about-hero-title">About Us</h1>

          <p className="about-hero-text">
            Hi, we are <strong>Ishita</strong> and{" "}
            <strong>Charith</strong>, students at{" "}
            <strong>UW-Madison</strong>. We created{" "}
            <strong>Thrive Mind</strong> as a mental wellness website focused on
            support, reflection, and accessible self care tools.
          </p>
        </div>

        <Row className="g-4 mb-4">
          <Col lg={7}>
            <div className="about-story-card">
              <h2>🍀 Our Story</h2>

              <p>
                As students, we understand that stress, pressure, and burnout
                can feel difficult to manage. That inspired us to create Thrive
                Mind as a soft and supportive space where people can pause,
                reflect, and find helpful tools.
              </p>

              <p>
                In the future, we hope to turn this initiative into something
                larger than a website. Thrive Mind is our first step toward
                creating an organization or NGO that supports mental wellness,
                spreads awareness, and helps people feel more heard.
              </p>
            </div>
          </Col>

          <Col lg={5}>
            <div className="about-contact-card">
              <h2>📬 Contact</h2>

              <div className="about-contact-item">
                <div className="about-contact-label">Gmail</div>

                <a href="mailto:ishafyiw@gmail.com" className="about-contact-link">
                  ishafyiw@gmail.com
                </a>
              </div>

              <div className="about-contact-item">
                <div className="about-contact-label">Gmail</div>

                <a
                  href="mailto:charithpareddy@gmail.com"
                  className="about-contact-link"
                >
                  charithpareddy@gmail.com
                </a>
              </div>

              <div className="about-contact-ps">
                <div className="about-contact-ps-label">PS</div>

                <div className="about-contact-ps-body">
                  <p>Please shoot us an email!</p>

                  <ul>
                    <li>Your thoughts or feedback</li>
                    <li>Any Ideas</li>
                    <li>Anything you want to talk about</li>
                    <li>
                      If you would like to collaborate, contribute ideas, or
                      help us grow Thrive Mind into something bigger
                    </li>
                  </ul>
                </div>
              </div>

              <Button
                className="btn-custom"
                href="mailto:ishafyiw@gmail.com?cc=charithpareddy@gmail.com&subject=Thrive%20Mind%20Feedback"
              >
                Send Feedback
              </Button>
            </div>
          </Col>
        </Row>

        <div className="about-section">
          <h2 className="about-section-title">🌷 About the Project</h2>

          <Row className="g-3">
            {teamCards.map((card, index) => (
              <Col md={4} key={index}>
                <div
                  className="about-team-card"
                  style={{ "--card-accent": card.color }}
                >
                  <div className="about-team-emoji">{card.emoji}</div>

                  <h5 className="about-team-title">{card.title}</h5>

                  <p className="about-team-text">{card.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div>
          <h2 className="about-section-title">🧩 What Thrive Mind Offers</h2>

          <Row className="g-3">
            {features.map((feature, index) => (
              <Col md={6} key={index}>
                <div
                  className="about-feature-card"
                  style={{ "--card-accent": feature.color }}
                >
                  <div className="about-feature-header">
                    <span className="about-feature-emoji">{feature.emoji}</span>

                    <h5 className="about-feature-title">{feature.title}</h5>
                  </div>

                  <p className="about-feature-text">{feature.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="about-footer-note">
          💜 Thank you for visiting Thrive Mind. Your feedback helps us make it
          better.
        </div>
      </div>
    </Container>
  );
}

export default AboutUs;
