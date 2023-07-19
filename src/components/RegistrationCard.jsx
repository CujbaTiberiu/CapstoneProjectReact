import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import logo from "../assets/imgs/logo.png";
import { Link } from "react-router-dom";

const RegistrationCard = () => {
  return (
    <Card>
      <Card.Img variant="top h-75 w-75" src={logo} />
      <Card.Body>
        <Card.Title>
          Benvenuto su <span className="text-primary fs-3">ComuniCate</span>
        </Card.Title>
        <Card.Text className="fs-5">
          La piattaforma semplice e compatta che ti permette di comunicare in
          modo facile con il tuo comune!
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <Link to="/registration" className="text-decoration-none div__anim">
          <ListGroup.Item>
            <span className="text-primary fs-5">Step 1</span> - Registrati
          </ListGroup.Item>
        </Link>
        <Link to="/login" className="text-decoration-none div__anim">
          <ListGroup.Item>
            <span className="text-primary fs-5">Step 2</span> - Fai il login
          </ListGroup.Item>
        </Link>
        <ListGroup.Item>
          <span className="text-primary fs-5">Step 3</span> - Fai la tua prima
          segnalazione!
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default RegistrationCard;
