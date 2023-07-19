import { Col, Container, Row } from "react-bootstrap";
import FormReport from "./FormReport";
import MyNavbar from "./MyNavbar";
import MyAccordionComp from "./MyAccordionComp";
import React, { useState, useEffect } from "react";
import axios from "axios";
import waveDown from "../assets/imgs/waveHome.svg";
import waveUp from "../assets/imgs/waveUp.svg";
import page from "../assets/imgs/page.svg";
import guide from "../assets/imgs/guideLines.svg";
import { ToastContainer, toast } from "react-toastify";
import { BsInstagram } from "react-icons/bs";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [resp, setResp] = useState([]);

  const userData = {
    username: localStorage.getItem("user"),
    accessToken: localStorage.getItem("API_KEY"),
    tokenType: localStorage.getItem("tokenType"),
    userRole: localStorage.getItem("role"),
  };

  console.log(userData.accessToken);
  console.log(userData.username);

  const notifyError = (text) =>
    toast.error(`${text}`, {
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
      setResp(response.status);
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
      notifySucces("Segnalazione cancellata con successo!");
      getReports();
    } catch (error) {
      notifyError("Errore nella cancellazione!");
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
      <img className="img-fluid mt-5" src={waveUp} alt="pic"></img>
      <Container>
        <Row className="d-flex justify-content-around align-items-center">
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div>
              <img className="img-fluid my-5" src={page} alt="pic"></img>
            </div>
          </Col>
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div className="div__anim">
              <h4>
                <span className="title__reg">Ciao!</span> Qui troverai due
                sezioni importanti
              </h4>
              <p className="fs-4">
                Il form ti permette di fare le segnalazioni al tuo Comune,
                mentre nella lista troverai le segnalazioni che hai già inviato.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around align-items-center">
          <Col xs={8} sm={10} md={6} lg={4} className="my-5">
            <div className="div__anim order-md-2">
              <h4>
                Ti invitiamo ad{" "}
                <span className="title__reg">osservare alcune linee</span> guida
                per un utilizzo responsabile della piattaforma:
              </h4>
              <p className="fs-4"></p>
              <p>
                Non ci sono limiti al numero di segnalazioni che puoi fare, ma
                ti chiediamo di utilizzare il buon senso e{" "}
                <span className="text-info">
                  non inviare segnalazioni ripetitive
                </span>
                .
              </p>
              <p>
                Ricorda che le segnalazioni sono un mezzo per migliorare la tua
                comunità, quindi utilizzale{" "}
                <span className="text-info">per problemi o situazioni</span> che
                richiedono l'intervento delle{" "}
                <span className="text-info">autorità locali</span>.
              </p>
              <p>
                Assicurati di fornire{" "}
                <span className="text-info">
                  informazioni accurate e dettagliate
                </span>{" "}
                nelle tue segnalazioni, in modo che possano essere valutate e
                risolte in modo efficace.
              </p>
              <p>
                Mantieni un{" "}
                <span className="text-info">tono rispettoso e cortese</span>{" "}
                nelle comunicazioni con il Comune.
              </p>
              <p>
                <span className="text-info">
                  Rispetta la privacy e la riservatezza delle altre persone
                </span>
                . Evita di condividere informazioni personali sensibili nelle
                tue segnalazioni.
              </p>
              {/* <p>
                Se hai dubbi o domande sull'utilizzo dell'app, consulta la
                sezione delle FAQ o contatta il supporto del Comune.
              </p> */}
            </div>
          </Col>
          <Col
            xs={8}
            sm={10}
            md={6}
            lg={4}
            className="order-first order-md-last"
          >
            <div>
              <img className="img-fluid my-5" src={guide} alt="pic"></img>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="my-5">
            <h2 className="text-center mb-4 mt-5">
              Le tue <span className="text-info">Segnalazioni</span>
            </h2>
            {resp === 500 ? (
              <p>Nessuna segnalazione presente!</p>
            ) : (
              reports?.map((report, index) => (
                <MyAccordionComp
                  key={report.id}
                  report={report}
                  index={index}
                  deleteReport={deleteReport}
                  role={userData.userRole}
                />
              ))
            )}
          </Col>
        </Row>
        <Row>
          <Col className="my-5">
            <h2 className="text-center mb-4">
              Fai una <span className="text-info">Segnalazione</span>
            </h2>
            <FormReport getReports={getReports} />
          </Col>
        </Row>
      </Container>
      <img className="img-fluid" src={waveDown} alt="pic"></img>
      <ToastContainer />
    </>
  );
};
export default Report;
