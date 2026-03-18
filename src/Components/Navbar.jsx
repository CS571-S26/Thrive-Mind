import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(90deg, #CDB4DB, #A7C7E7)",
        borderRadius: "12px",
        margin: "10px"
      }}
    >
      <Container>
        <Navbar.Brand style={{ fontWeight: "bold" }}>
          Thrive Mind 💜
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/issues">Issues</Nav.Link>
          <Nav.Link as={Link} to="/mood">Mood Checker</Nav.Link>
          <Nav.Link as={Link} to="/talk">Let's Talk</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;