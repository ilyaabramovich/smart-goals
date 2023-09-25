import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Navigation from "../components/navigation";

export default function Header() {
  return (
    <header>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            SMART goals
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navigation />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
