import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="mt-4">
      <div className="card-style" style={{ textAlign: "center", padding: "48px 24px" }}>
        <p style={{ fontSize: "2.8rem", margin: 0 }}>🌱</p>

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
