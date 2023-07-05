import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const MyAccordionComp = ({ report }) => {
  return (
    <Accordion className="my-2">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Segnalazione numero {report.id}</Accordion.Header>
        <Container>
          <Accordion.Body>
            <p>Tipo Segnalazione - {report.reportType}</p>
            <p>Descrizione - {report.description}</p>
            <p>Data - {report.date}</p>
            <Row>
              <p>Foto:</p>
              {report?.photos.map((photo) => (
                <Col key={photo.id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={photo.imageUrl}
                      alt={photo.name}
                    />
                    <Card.Body>
                      <Card.Text>{photo.name}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Accordion.Body>
        </Container>
      </Accordion.Item>
    </Accordion>
  );
};

export default MyAccordionComp;
