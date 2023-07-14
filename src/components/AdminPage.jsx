import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Table, Form } from "react-bootstrap";
import axios from "axios";
import MyAccordionComp from "./MyAccordionComp";
import AdminNavbar from "./AdminNavbar";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState(null);

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

  async function getAllUsers() {
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
      console.log(response);
      setUserReports(response.data);
    } catch (error) {
      console.log("Error in get all reports!");
      console.error(error);
    }
  }

  async function modifyReport(id, newStatus, report, selectedStatus) {
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userData.accessToken}`,
      //   },
      // };
      const formData = new FormData();
      formData.append("reportType", report.reportType);
      formData.append("description", report.description);
      formData.append("latitude", report.latitude);
      formData.append("longitude", report.longitude);
      formData.append("status", selectedStatus);
      formData.append("username", selectedUsername);

      report.photos.forEach((photo, index) => {
        formData.append(`photo`, photo);
      });

      for (const photo of report.photos) {
        const fileResponse = await fetch(photo.imageUrl);
        const fileBlob = await fileResponse.blob();
        const file = new File([fileBlob], photo.name, { type: photo.type });

        formData.append("photo", file);
      }

      const response = await axios.put(
        `http://localhost:8080/api/report/${id}/${selectedUserId}`,
        formData
        //config
      );
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
    //getReportsByUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AdminNavbar />
      <Container className="my-5">
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
            <Table striped bordered hover responsive>
              <thead>
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
              {search(users).map((user, index) => (
                <tbody key={user.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.taxCode}</td>
                    <td>{user.roles[0].roleName}</td>
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
          </Col>
        </Row>
        <Row>
          <Col>
            {userReports.message === "There are no reports in the database!" ? (
              <h2>{userReports.message}</h2>
            ) : (
              userReports.map((report, index) => (
                <MyAccordionComp
                  key={report.id}
                  report={report}
                  index={index}
                  role={userData.userRole}
                  modifyReport={modifyReport}
                />
              ))
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AdminPage;

// // Costruisci un oggetto FormData
// // const formData = new FormData();
// // formData.append("report", JSON.stringify(updatedReport));

// // // Aggiungi le foto selezionate all'oggetto FormData
// // for (let i = 0; i < report.photos.length; i++) {
// //   const photo = report.photos[i];
// //   formData.append(`photo`, photo); // Usa `photoFiles` invece di `photo_${i}`
// // }
// /*async function modifyReport(id, newStatus, report, selectedStatus) {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userData.accessToken}`,
//         },
//       };

//       const updatedReport = {
//         id: report.id,
//         reportType: report.reportType,
//         description: report.description,
//         latitude: report.latitude,
//         longitude: report.longitude,
//         date: report.date,
//         photos: report.photos.map((photo) => ({
//           id: photo.id,
//           name: photo.name,
//           type: photo.type,
//           imageUrl: photo.imageUrl,
//         })),
//         status: selectedStatus,
//       };

//       const response = await axios.put(
//         `http://localhost:8080/api/report/${id}/${selectedUserId}`,
//         updatedReport,
//         config
//       );
//       console.log(response);
//       console.log("id user attuale" + selectedUserId);
//     } catch (error) {
//       console.log("id user attuale" + selectedUserId);
//       console.log("Error in modifying report!");
//       console.error(error);
//     }
//   }
//  */
