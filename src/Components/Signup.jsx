import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "./Icon";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signup(email, password, displayName);
      navigate("/wellness");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <div className="card-style" style={{ maxWidth: "420px", margin: "0 auto" }}>
        <h1 className="page-title">
          <Icon name="users" size={28} /> Sign Up
        </h1>

        <p style={{ color: "#4B5563", marginBottom: "20px" }}>
          Create an account to sync your mood history and self-care habits
          across devices.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="signup-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signup-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signup-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <Form.Text>At least 8 characters.</Form.Text>
          </Form.Group>

          <Button
            type="submit"
            className="btn-custom w-100"
            disabled={submitting}
          >
            {submitting ? "Creating account…" : "Sign Up"}
          </Button>
        </Form>

        <p style={{ marginTop: "16px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </Container>
  );
}

export default Signup;
