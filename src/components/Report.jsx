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
  };

  console.log(userData.accessToken);
  console.log(userData.username);

  async function getReports() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`, //eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0LnVzZXJAbWFpbC5jb20iLCJpYXQiOjE2ODg1NDM4MjgsImV4cCI6MTY4OTQwNzgyOH0.4f2PZIn4Sn0QKwIoSW7S23NLelWTDld7fjHzrH5uwiaBWK9OSeJbFiDBKqWcsB7D`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/report/user/${userData.username}`,
        config
      );
      console.log(response);
      setReports(response.data);
    } catch (error) {
      console.log("nada");
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
            {reports?.map((report, i) => (
              <MyAccordionComp key={report.id} report={report} />
            ))}
          </Col>
        </Row>
        <Row>
          <Col className="my-5">
            <h2 className="text-center mb-4">Fai una Segnalazione</h2>
            <FormReport />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Report;
