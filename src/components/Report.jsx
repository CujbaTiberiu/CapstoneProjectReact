import { Col, Container, Row } from "react-bootstrap";
import FormReport from "./FormReport";
import MyNavbar from "./MyNavbar";
import MyAccordionComp from "./MyAccordionComp";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Report = () => {
  const [reports, setReports] = useState([]);

  const userData = {
    username: localStorage.getItem("user"),
    accessToken: localStorage.getItem("API_KEY"),
    tokenType: localStorage.getItem("tokenType"),
    userRole: localStorage.getItem("role"),
  };

  console.log(userData.accessToken);
  console.log(userData.username);

  async function getReports() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/report/user/${userData.username}`,
        config
      );
      console.log(response);
      setReports(response.data);
    } catch (error) {
      console.log("Error in get all reports!");
      console.error(error);
    }
  }

  async function deleteReport(reportId) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:8080/api/report/${reportId}`,
        config
      );
      console.log(response);
      alert("Segnalazione cancellata con successo!");
      getReports();
    } catch (error) {
      alert("Errore nella cancellazione!");
      console.log("Error in deleting report!");
      console.error(error);
    }
  }

  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <MyNavbar />
      <Container className="my-5">
        <Row>
          <Col className="my-5">
            <h2 className="text-center mb-4">Le tue Segnalazioni</h2>
            {reports?.map((report, index) => (
              <MyAccordionComp
                key={report.id}
                report={report}
                index={index}
                deleteReport={deleteReport}
                role={userData.userRole}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col className="my-5">
            <h2 className="text-center mb-4">Fai una Segnalazione</h2>
            <FormReport getReports={getReports} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Report;
