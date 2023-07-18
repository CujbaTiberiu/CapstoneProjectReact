import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { MdOutgoingMail } from "react-icons/md";
import { BiHomeSmile } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

const MyNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("user");

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
            <Navbar.Brand href="/home">
              <img src={logo} alt="" style={{ width: "50px" }} />
              ComuniCate - Ciao{" "}
              <span className="text-primary fs-4">{username}</span>!
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  ComuniCate - Ciao{" "}
                  <span className="text-primary fs-4">{username}</span>!
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link
                    to="/home"
                    className="text-decoration-none text-primary nav-link d-flex align-items-center"
                  >
                    <BiHomeSmile className="fs-3" /> Home
                  </Link>
                  <Link
                    to="/report"
                    className="text-decoration-none text-info nav-link d-flex align-items-center"
                  >
                    <MdOutgoingMail className="fs-3" /> Segnalazioni
                  </Link>
                  <Nav.Link
                    onClick={handleLogOut}
                    className="d-flex align-items-center"
                  >
                    <MdLogout className="fs-3" /> Logout
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
