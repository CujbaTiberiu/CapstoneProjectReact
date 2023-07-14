import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  Form,
} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import axios from "axios";

const MyAccordionComp = ({
  report,
  deleteReport,
  index,
  role,
  modifyReport,
}) => {
  const [address, setAddress] = useState("");
  const [selectedReportStatus, setSelectedReportStatus] = useState(
    report.reportStatus
  );

  const handleUpdateStatus = (newStatus) => {
    modifyReport(report.id, newStatus, report, selectedReportStatus);
  };

  const reportStatus = [
    "RICEVUTA",
    "IN_CARICO",
    "INTERVENTO_IN_CORSO",
    "INTERVENTO_IN_STAND_BY",
    "INTERVENTO_FINITO",
    "SUCCESSO",
  ];

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

  const popoverDelete = (
    <Popover id="confirm-delete">
      <Popover.Header as="h3">Sei sicuro?</Popover.Header>
      <Popover.Body>
        <Button variant="danger" onClick={() => deleteReport(report.id)}>
          Si
        </Button>
      </Popover.Body>
    </Popover>
  );

  const popoverModify = (
    <Popover id="confirm-modify">
      <Popover.Header as="h3">Sei sicuro?</Popover.Header>
      <Popover.Body>
        <Button
          variant="danger"
          onClick={() => handleUpdateStatus(report.id, report)}
        >
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
            <p>Stato della Segnalazione - {report.status}</p>
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
            {role === "ROLE_USER" ? (
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popoverDelete}
              >
                <Button variant="outline-danger" className="my-2">
                  Cancella
                </Button>
              </OverlayTrigger>
            ) : (
              <div>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="reportStatus" className="title__reg">
                    Stato della Segnalazione
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="reportStatus"
                    name="reportStatus"
                    value={selectedReportStatus}
                    onChange={(e) => setSelectedReportStatus(e.target.value)}
                    required
                  >
                    <option value="">{report.status}</option>
                    {reportStatus.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {/* <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverModify}
                >
                  <Button variant="outline-primary" className="my-2">
                    Aggiorna Status
                  </Button>
                </OverlayTrigger> */}
              </div>
            )}
          </Accordion.Body>
        </Container>
      </Accordion.Item>
    </Accordion>
  );
};

export default MyAccordionComp;
