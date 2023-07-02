import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import logo from "../assets/imgs/logo2.png";

const RegistrationCard = () => {
  return (
    <Card>
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>Benvenuto su Comunicate</Card.Title>
        <Card.Text>
          La piattaforma semplice e compatta che ti permette di comunicare in
          modo facile con il tuo comune!
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Step 1 - Registrati</ListGroup.Item>
        <ListGroup.Item>Step 2 - Fai il login</ListGroup.Item>
        <ListGroup.Item>Step 3 -Fai la tua prima segnalazione!</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default RegistrationCard;
