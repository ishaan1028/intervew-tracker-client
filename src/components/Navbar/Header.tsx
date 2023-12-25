import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink to="/" className="brand">
          InterviewTracker
        </NavLink>
        <Nav className="ml-auto">
          {isLoggedIn && <NavLink to="/interview">Home</NavLink>}
          {!isLoggedIn && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          {isLoggedIn && (
            <Button variant="danger" className="ms-3" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
