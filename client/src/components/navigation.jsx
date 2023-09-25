import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export default function Navigation() {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const match = useMatch("/");

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  if (!isLoggedIn) {
    if (!match) {
      return null;
    }

    return (
      <Nav>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/signin">
            Sign in
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  return (
    <>
      <Nav className="me-auto">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/goals">
            My goals
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Navbar.Text className="me-2">
          Signed in as: {user.username}
        </Navbar.Text>
        <Nav.Item>
          <Button
            variant="link"
            className="ms-auto text-secondary link-underline link-underline-opacity-0"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </Nav.Item>
      </Nav>
    </>
  );
}
