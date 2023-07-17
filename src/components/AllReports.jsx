import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Carousel,
  Spinner,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Particle from "./Particle";

const AllReports = () => {
  const [query, setQuery] = useState("");
  const [reports, setReports] = useState([]);
  const [address, setAddress] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentReportIndex, setCurrentReportIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const userData = {
    username: localStorage.getItem("user"),
    accessToken: localStorage.getItem("API_KEY"),
    tokenType: localStorage.getItem("tokenType"),
    userRole: localStorage.getItem("role"),
  };

  const notifyWarning = () =>
    toast.error("Non ci sono foto per questa Segnalazione!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyInfo = () =>
    toast.info(`Scorri in basso per visualizzare le foto`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const search = (data, address) => {
    return data.filter(
      (item) =>
        item.date.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.reportType.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        (address &&
          address.toLowerCase().includes(query) &&
          address.includes(address))
    );
  };

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyClytQp1USp5keyCvaSk_V4h7vcThzE3UU`
      );

      if (response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        setAddress((prevAddress) => [...prevAddress, formattedAddress]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function getAllreports() {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/report/all`,
        config
      );
      console.log(response);
      const updatedReports = await Promise.all(
        response.data.map(async (report) => {
          if (report.latitude && report.longitude) {
            const address = await getAddress(report.latitude, report.longitude);
            return { ...report, address };
          } else {
            return report;
          }
        })
      );
      setReports(updatedReports);

      // const firstReport = response.data[0];
      // if (firstReport?.latitude && firstReport?.longitude) {
      //   getAddress(firstReport.latitude, firstReport.longitude);
      // }
    } catch (error) {
      console.log("Error in get all users!");
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllreports();
  }, []);

  const handleShowCarousel = (reportIndex, photoIndex) => {
    setCurrentReportIndex(reportIndex);
    setCurrentPhotoIndex(photoIndex);
    setShowCarousel(true);
  };

  return (
    <>
      <div className="particle__back">
        <Particle />
      </div>
      <AdminNavbar />
      <Container className="mt-5">
        {loading ? (
          <Row>
            <Col className="d-flex justify-content-center align-items-center my-5">
              <Spinner animation="border" variant="primary" size="lg" />
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col className="mt-5">
                <Form>
                  <Form.Group className="mb-3" controlId="query">
                    <Form.Label className="fs-3 bolder text-primary">
                      Filtra Segnalazioni
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="cerca.."
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col className="my-1">
                <h2 className="text-primary">Segnalazioni</h2>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Data</th>
                      <th>Descrizione</th>
                      <th>Indirizzo</th>
                      <th>Tipo Segnalazione</th>
                      <th>Stato</th>
                      <th>Foto</th>
                    </tr>
                  </thead>
                  {search(reports)?.map((report, reportIndex) => (
                    <tbody key={report.id}>
                      <tr>
                        <td>{reportIndex + 1}</td>
                        <td>{report.date}</td>
                        <td>{report.description}</td>
                        <td>{address[reportIndex]}</td>
                        <td>{report.reportType}</td>
                        <td>{report.status}</td>
                        <td>
                          {report.photos && report.photos.length > 0 ? (
                            <Button
                              className="py-2"
                              variant="info"
                              onClick={() => {
                                handleShowCarousel(reportIndex, 0);
                                notifyInfo();
                              }}
                            >
                              Vedi Foto
                            </Button>
                          ) : (
                            notifyWarning()
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Col>
            </Row>
            {showCarousel && (
              <Row className="d-flex justify-content-center align-items-center mt-3">
                <Col xs={8}>
                  <Carousel
                    className="my-5"
                    activeIndex={currentPhotoIndex}
                    onSelect={(selectedIndex) =>
                      setCurrentPhotoIndex(selectedIndex)
                    }
                  >
                    {reports[currentReportIndex]?.photos?.map(
                      (photo, photoIndex) => (
                        <Carousel.Item key={photoIndex}>
                          <img
                            className="d-block w-100"
                            src={photo.imageUrl}
                            alt={photo.name}
                          />
                          <Carousel.Caption className="text-info">
                            <h3>{photo.name}</h3>
                            <p>{photo.index}</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                      )
                    )}
                  </Carousel>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
      <ToastContainer />
    </>
  );
};

export default AllReports;
