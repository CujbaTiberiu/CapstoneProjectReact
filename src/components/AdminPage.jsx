import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Form,
  Spinner,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import MyAccordionComp from "./MyAccordionComp";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import Particle from "./Particle";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const search = (data) => {
    // const keys = [
    //   "name",
    //   "lastName",
    //   "username",
    //   "email",
    //   "taxCode",
    //   "roles[0].roleName",
    // ];

    return data.filter(
      (
        item //keys.some((key) => item[key].toLowerCase().includes(query))
      ) =>
        item.name.toLowerCase().includes(query) ||
        item.lastName.toLowerCase().includes(query) ||
        item.username.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.taxCode.toLowerCase().includes(query) ||
        item.roles[0].roleName.toLowerCase().includes(query)
    );
  };

  const userData = {
    username: localStorage.getItem("user"),
    accessToken: localStorage.getItem("API_KEY"),
    tokenType: localStorage.getItem("tokenType"),
    userRole: localStorage.getItem("role"),
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedUsers = search(users).slice(indexOfFirstItem, indexOfLastItem);

  //notify - allerts
  const notifyError = (utente) =>
    toast.error(`Non ci sono Segnalazioni per utente ${utente}!`, {
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

  const notifyInfo = (text) =>
    toast.info(`${text}`, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  async function getAllUsers() {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/user/all`,
        config
      );
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log("Error in get all users!");
      console.error(error);
    }
    setLoading(false);
  }

  async function getReportsByUsername(username) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/report/user/${username}`,
        config
      );
      if (response.status === 200) {
        console.log(response);
        setUserReports(response.data);
        notifySucces(
          `Segnalazioni recuperate con successo per utente ${username}`
        );
      } else if (response.status === 500) {
        notifyError(username);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log("Error in get all reports!");
      console.error(error);
      notifyError(username);
    }
  }

  function dataURItoBlob(dataURI) {
    if (typeof dataURI !== "string" || !dataURI.startsWith("data:")) {
      // Gestisci il caso in cui `dataURI` non sia definito o non abbia il formato corretto
      return null;
    }
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  async function modifyReport(id, newStatus, report, selectedStatus) {
    try {
      const formData = new FormData();
      formData.append("reportType", report.reportType);
      formData.append("description", report.description);
      formData.append("latitude", report.latitude);
      formData.append("longitude", report.longitude);
      formData.append("status", selectedStatus);
      formData.append("username", selectedUsername);

      report.photos.forEach((photo, index) => {
        const fileBlob = dataURItoBlob(photo.imageData);
        const file = new File([fileBlob], photo.name, { type: photo.type });
        formData.append("photo", file);
      });

      const response = await axios.put(
        `http://localhost:8080/api/report/${id}/${selectedUserId}`,
        formData
      );
      notifySucces("Aggiornamento dello stato avvenuta con successo!");
      notifyInfo(
        `Premi nuovamente 'Aggiorna Status' per chiudere la casella di conferma!`
      );
      //getAllUsers();
      console.log(response);
      console.log("id user attuale" + selectedUserId);
    } catch (error) {
      console.log("id user attuale" + selectedUserId);
      console.log("Error in modifying report!");
      console.error(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="particle__back">
        <Particle />
      </div>
      <AdminNavbar />
      <Container className="my-5">
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
                      Filtra utenti
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
                <h2 className="text-primary">Utenti</h2>
                <Table striped bordered hover responsive="sm">
                  <thead className="fs-5">
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Cognome</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Codice Fiscale</th>
                      <th>Ruolo</th>
                      <th>Segnalazioni</th>
                    </tr>
                  </thead>
                  {paginatedUsers.map((user, index) => (
                    <tbody key={user.id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.taxCode}</td>
                        <td>{user.roles[0].roleName.replace("ROLE_", "")}</td>
                        <td>
                          <Button
                            className="py-2"
                            variant="info"
                            onClick={() => {
                              getReportsByUsername(user.username);
                              setSelectedUsername(user.username);
                              setSelectedUserId(user.id);
                            }}
                          >
                            Vedi Segnalazioni
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
                <Pagination className="d-flex justify-content-center align-items-center">
                  {Array.from({
                    length: Math.ceil(search(users).length / itemsPerPage),
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
            <Row>
              <Col>
                {userReports.map((report, index) => (
                  <MyAccordionComp
                    key={report.id}
                    report={report}
                    index={index}
                    role={userData.userRole}
                    modifyReport={modifyReport}
                  />
                ))}
              </Col>
            </Row>
          </>
        )}
        ;
      </Container>
      <ToastContainer />
    </>
  );
};
export default AdminPage;
