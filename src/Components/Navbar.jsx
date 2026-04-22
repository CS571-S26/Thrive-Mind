import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function CustomNavbar() {
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(90deg, #CDB4DB, #A7C7E7)",
        borderRadius: "14px",
        margin: "10px",
        boxShadow: "0 4px 14px rgba(123,97,255,0.15)"
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>
          🌿 Thrive Mind
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-1">
            {[
              { label: "Home", path: "/" },
              { label: "Mental Health Issues", path: "/issues" },
              { label: "Mood Quiz", path: "/mood" },
              { label: "Resources", path: "/resources" },
              { label: "Self-care planner", path: "/planner" },

            ].map(({ label, path }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                style={{
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontWeight: location.pathname === path ? "700" : "500",
                  background: location.pathname === path ? "rgba(255,255,255,0.45)" : "transparent",
                  color: "#333",
                  transition: "background 0.2s"
                }}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;