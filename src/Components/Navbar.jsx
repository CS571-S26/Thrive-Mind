import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "./Icon";

function CustomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{
        background: "linear-gradient(90deg, var(--color-primary-light), var(--color-primary))",
        borderRadius: "14px",
        margin: "10px",
        boxShadow: "0 4px 14px rgba(67,56,202,0.25)"
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#ffffff"
          }}
        >
          <Icon name="leaf" size={22} />
          Thrive Mind
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-1">
            {[
              { label: "Home", path: "/" },
              { label: "My Wellness", path: "/wellness" },
              { label: "Mental Health Issues", path: "/issues" },
              { label: "Mood Quiz", path: "/mood" },
              { label: "Resources", path: "/resources" },
              { label: "Self-care planner", path: "/planner" },
               { label: "About Us", path: "/about" },
              { label: "Privacy & Safety", path: "/privacy" }
            ].map(({ label, path }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                style={{
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontWeight: location.pathname === path ? "700" : "500",
                  background: location.pathname === path ? "rgba(0,0,0,0.18)" : "transparent",
                  color: "#ffffff",
                  transition: "background 0.2s"
                }}
              >
                {label}
              </Nav.Link>
            ))}

            {!loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginLeft: "6px",
                  paddingLeft: "10px",
                  borderLeft: "1px solid rgba(255,255,255,0.3)"
                }}
              >
                {user ? (
                  <>
                    <span style={{ color: "#ffffff", fontSize: "0.9rem" }}>
                      Hi, {user.displayName}
                    </span>
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        color: "#ffffff",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        cursor: "pointer"
                      }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/login"
                      style={{ color: "#ffffff", padding: "6px 10px" }}
                    >
                      Log In
                    </Nav.Link>
                    <Link
                      to="/signup"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        color: "#ffffff",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        textDecoration: "none"
                      }}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;