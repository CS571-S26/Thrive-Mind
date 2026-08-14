import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "./Icon";

function NotFound() {
  return (
    <Container className="mt-4">
      <div className="card-style" style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{ display: "flex", justifyContent: "center", color: "var(--accessible-purple)" }}>
          <Icon name="compass" size={40} />
        </div>

        <h1 style={{ margin: "12px 0 10px" }}>Page Not Found</h1>

        <p style={{ color: "#6b7280", maxWidth: "480px", margin: "0 auto 24px" }}>
          We couldn't find the page you were looking for. Let's get you back to
          somewhere calm.
        </p>

        <Button as={Link} to="/" className="btn-custom">
          Back to Home →
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
