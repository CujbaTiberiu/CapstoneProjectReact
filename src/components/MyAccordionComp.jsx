import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const MyAccordionComp = ({ report, deleteReport, index }) => {
  const popover = (
    <Popover id="confirm-delete">
      <Popover.Header as="h3">Sei sicuro?</Popover.Header>
      <Popover.Body>
        <Button variant="danger" onClick={() => deleteReport(report.id)}>
          Si
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Accordion className="my-2">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Segnalazione numero {index + 1}</Accordion.Header>
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
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <Button variant="outline-danger" className="my-2">
                Cancella
              </Button>
            </OverlayTrigger>
          </Accordion.Body>
        </Container>
      </Accordion.Item>
    </Accordion>
  );
};

export default MyAccordionComp;
