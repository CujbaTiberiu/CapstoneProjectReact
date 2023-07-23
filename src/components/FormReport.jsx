/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { FcStackOfPhotos } from "react-icons/fc";
import Map from "./Map";
import { ToastContainer, toast } from "react-toastify";
import { RiMailSendLine } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";

const reportTypes = [
  "STRADA",
  "MARCIAPIEDE",
  "SEGNALETICA",
  "EDIFICI_PUBBLICI",
  "VERDE_PUBBLICO",
  "SERVIZI_PUBBLICI",
  "ILLUMINAZIONE",
  "ARREDO_URBANO",
  "DECORO_URBANO",
  "RIFIUTI",
  "ANIMALI",
];

const FormReport = ({ getReports }) => {
  const userData = {
    username: localStorage.getItem("user"),
    accessToken: localStorage.getItem("API_KEY"),
    tokenType: localStorage.getItem("tokenType"),
    role: localStorage.getItem("role"),
  };

  const fileInputRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [report, setReport] = useState({
    reportType: "",
    description: "",
    latitude: "",
    longitude: "",
    photos: [
      {
        name: "",
        type: "",
        imageData: "",
      },
    ],
    username: "",
  });

  const notifyWarning = (text) =>
    toast.warning(`${text}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifySucces = (text) =>
    toast.success(`${text}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    if (userData) {
      const username = userData.username;
      setReport((prevReport) => ({
        ...prevReport,
        username: username,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };

  const handleMapClick = (latitude, longitude) => {
    setReport((prevReport) => ({
      ...prevReport,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    }));
  };

  const updateReportPhotos = (photoArray) => {
    setReport((prevReport) => ({
      ...prevReport,
      photos: photoArray,
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const updatedPhotos = [...photos, ...files];
    setPhotos(updatedPhotos);
    updateReportPhotos(updatedPhotos);
    setSelectedFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    const updatedPhotos = [...photos, ...files];
    setSelectedFiles(updatedPhotos);
    setPhotos(updatedPhotos);
    updateReportPhotos(updatedPhotos);
  };

  const handleSelectPhotosClick = () => {
    fileInputRef.current.click();
  };

  const handleDeletePhoto = (index) => {
    const updatedPhotos = [...photos];
    const deletedFile = updatedPhotos.splice(index, 1)[0]; // Rimuovi la foto dall'array

    // Aggiorna lo stato delle foto e dei file selezionati
    setPhotos(updatedPhotos);
    setSelectedFiles(updatedPhotos);

    // Opzionalmente, puoi fare qualcos'altro con il file eliminato (ad esempio, rimuoverlo dal server)
    console.log("File eliminato:", deletedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (report.latitude === 41.8719 || report.longitude === 12.4774) {
      notifyWarning("Seleziona o scrivi un indirizzo sulla mappa");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("reportType", report.reportType);
      formData.append("description", report.description);
      formData.append("latitude", report.latitude);
      formData.append("longitude", report.longitude);
      formData.append("username", report.username);

      report.photos.forEach((photo, index) => {
        formData.append(`photo`, photo);
      });

      const response = await axios.post(
        "http://localhost:8080/api/report",
        formData
      );
      console.log(response.data);
      setReport({
        reportType: "",
        description: "",
        latitude: "",
        longitude: "",
        photos: [
          {
            name: "",
            type: "",
            imageData: "",
          },
        ],
        username: userData.username,
      });
      setPhotos([]);
      setSelectedFiles([]);
      notifySucces("Segnalazione inviata con successo!");
      getReports();
    } catch (error) {
      notifyWarning(
        "Inserisci almeno una foto del problema che vuoi segnalare!"
      );
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="reportType" className="title__reg">
                  Tipo della Segnalazione
                </Form.Label>
                <Form.Control
                  as="select"
                  id="reportType"
                  name="reportType"
                  value={report.reportType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleziona il tipo d segnalazione</option>
                  {reportTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type.replace(/_/g, " ")}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description" className="title__reg">
                  Descrivi il problema
                </Form.Label>
                <Form.Control
                  as="textarea"
                  id="description"
                  name="description"
                  value={report.description}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </Form.Group>
              <Col>
                <div>
                  <Form.Label className="title__reg">
                    Scegli la posizione sulla mappa
                  </Form.Label>
                  <Map onMapClick={handleMapClick} />
                </div>
              </Col>
              <Form.Group>
                <Form.Label htmlFor="latitude"></Form.Label>
                <Form.Control
                  type="text"
                  id="latitude"
                  name="latitude"
                  value={report.latitude}
                  onChange={handleChange}
                  required
                  hidden
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="longitude"></Form.Label>
                <Form.Control
                  type="text"
                  id="longitude"
                  name="longitude"
                  value={report.longitude}
                  onChange={handleChange}
                  required
                  hidden
                />
              </Form.Group>
              <Form.Label htmlFor="reportType" className="title__reg">
                Inserisci almeno una foto del problema
              </Form.Label>
              <Form.Group
                className="mb-3"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ border: "2px dashed #ccc", padding: "20px" }}
              >
                <Form.Label htmlFor="file"></Form.Label>
                <Form.Control
                  type="file"
                  alt="img"
                  accept="image/*"
                  id="photos"
                  name="photos"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  multiple
                  onChange={handleFileInputChange}
                />
                <div
                  type="button"
                  onClick={handleSelectPhotosClick}
                  className="text-center"
                >
                  <p>
                    Seleziona Foto <FcStackOfPhotos />
                  </p>
                  <p className="fs-4">oppure</p>
                  <p>Trascina le foto qui</p>
                </div>
                {selectedFiles.map((file, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`File ${index}`}
                      style={{
                        width: "100%",
                        borderRadius: "20px",
                      }}
                    />
                    <div>
                      <p>{file.name}</p>
                      <Button
                        className="py-2 btn btn-danger reg__anim"
                        type="button"
                        onClick={() => handleDeletePhoto(index)}
                      >
                        Rimuovi foto <MdOutlineDeleteForever />
                      </Button>
                    </div>
                  </div>
                ))}
              </Form.Group>
              <Button
                type="submit"
                className="btn btn-info w-100 fs-3 reg__anim"
              >
                Invia Segnalazione <RiMailSendLine />
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default FormReport;
