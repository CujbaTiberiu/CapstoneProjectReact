import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Carousel,
  Spinner,
  Pagination,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Particle from "./Particle";

const AllReports = () => {
  const [query, setQuery] = useState("");
  const [reports, setReports] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentReportIndex, setCurrentReportIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reportAddresses, setReportAddresses] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalReportsShown, setTotalReportsShown] = useState(0);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedReports = search(reports).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const getAddress = async (reportId, latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyClytQp1USp5keyCvaSk_V4h7vcThzE3UU`
      );

      if (response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        setReportAddresses((prevAddresses) => ({
          ...prevAddresses,
          [reportId]: formattedAddress,
        }));
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
            const address =
              reportAddresses[report.id] ||
              (await getAddress(report.id, report.latitude, report.longitude));
            return { ...report, address };
          } else {
            return report;
          }
        })
      );
      setReports(updatedReports);
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
    const actualReportIndex = totalReportsShown + reportIndex;
    setCurrentReportIndex(actualReportIndex);
    setCurrentPhotoIndex(photoIndex);
    setShowCarousel(true);
  };

  useEffect(() => {
    // Calcoliamo il numero totale di report mostrati fino alla pagina corrente
    const startIndex = (currentPage - 1) * itemsPerPage;
    setTotalReportsShown(startIndex);
  }, [currentPage]);

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
                      onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col className="my-1">
                <h2 className="text-primary">Segnalazioni</h2>
                <Table striped bordered hover responsive="sm">
                  <thead className="fs-5">
                    <tr>
                      <th>#</th>
                      <th>Data</th>
                      <th>Descrizione</th>
                      <th>Indirizzo</th>
                      <th>Tipo</th>
                      <th>Stato</th>
                      <th>Foto</th>
                    </tr>
                  </thead>
                  {paginatedReports.map((report, reportIndex) => (
                    <tbody key={report.id}>
                      <tr>
                        <td>{reportIndex + 1}</td>
                        <td>{report.date}</td>
                        <td>{report.description}</td>
                        <td>{reportAddresses[report.id]}</td>
                        <td>{report.reportType.replace(/_/g, " ")}</td>
                        <td>{report.status.replace(/_/g, " ")}</td>
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
                <Pagination className="d-flex justify-content-center align-items-center">
                  {Array.from({
                    length: Math.ceil(search(reports).length / itemsPerPage),
                  }).map((item, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
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
