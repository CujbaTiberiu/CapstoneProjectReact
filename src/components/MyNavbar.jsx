import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { MdOutgoingMail } from "react-icons/md";
import { BiHomeSmile } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear("API_KEY", "userName");
    navigate("/login");
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3 fixed-top shadow"
        >
          <Container fluid>
            <Navbar.Brand href="#">ComuniCate</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  ComuniCate
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>
                    <Link
                      to="/home"
                      className="text-decoration-none text-primary"
                    >
                      <BiHomeSmile />
                      Home
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="#action2">
                    <MdOutgoingMail /> Segnalazioni
                  </Nav.Link>
                  <Nav.Link href="#action2" onClick={handleLogOut}>
                    <MdLogout /> Logout
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default MyNavbar;
