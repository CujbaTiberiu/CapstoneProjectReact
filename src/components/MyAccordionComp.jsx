import { useState, useEffect } from "react";
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
import axios from "axios";

const MyAccordionComp = ({ report, deleteReport, index }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${report.latitude},${report.longitude}&key=AIzaSyClytQp1USp5keyCvaSk_V4h7vcThzE3UU`
        );

        if (response.data.results.length > 0) {
          const formattedAddress = response.data.results[0].formatted_address;
          setAddress(formattedAddress);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAddress();
  }, [report.latitude, report.longitude]);

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
            <p>Indirizzo - {address}</p>
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
