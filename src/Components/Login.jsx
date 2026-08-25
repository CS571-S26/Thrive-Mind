import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "./Icon";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
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
          <Icon name="users" size={28} /> Log In
        </h1>

        <p style={{ color: "#4B5563", marginBottom: "20px" }}>
          Log in to sync your mood history and self-care habits.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="login-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="login-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Form.Group>

          <Button
            type="submit"
            className="btn-custom w-100"
            disabled={submitting}
          >
            {submitting ? "Logging in…" : "Log In"}
          </Button>
        </Form>

        <p style={{ marginTop: "16px", textAlign: "center" }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </Container>
  );
}

export default Login;
