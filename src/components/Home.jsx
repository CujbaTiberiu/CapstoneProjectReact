import { Col, Container, Row } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import { Link } from "react-router-dom";
import WHome from "../assets/imgs/welcomehome.svg";
import signalHome from "../assets/imgs/signalHome.svg";
import chooseHome from "../assets/imgs/chooseHome.svg";
import describeHome from "../assets/imgs/describeHome.svg";
import mapHome from "../assets/imgs/mapHome.svg";
import photosHome from "../assets/imgs/photosHome.svg";
import doneHome from "../assets/imgs/doneHome.svg";
import waveHome from "../assets/imgs/waveHome.svg";

const Home = () => {
  return (
    <>
      <MyNavbar />
      <Container fluid className="bg-secondary mt-5">
        <Row className="d-flex justify-content-around align-items-center">
          <Col xs={8} sm={10} md={6} lg={4} className="mt-sm-5">
            <div>
              <img className="img-fluid my-5" src={WHome} alt="pic"></img>
            </div>
          </Col>
          <Col xs={8} sm={10} md={6} lg={4}>
            <div className="div__anim">
              <h2>
                Benvenuto in <span className="title__reg">ComuniCate</span>!
              </h2>
              <p className="fs-4">
                ComuniCate è un'applicazione che ti permette di comunicare
                facilmente con la tua amministrazione comunale.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row className="d-flex justify-content-between align-items-center">
          <Col
            xs={8}
            sm={10}
            md={6}
            lg={4}
            className="order-last order-md-first"
          >
            <Link to="/report" className="text-decoration-none">
              <div className="div__anim">
                <h3 className="text-info">
                  <span className="title__reg">Fai una</span> Segnalazione
                </h3>
                <p className="text-black fs-4">
                  Hai notato un problema o un'inconveniente nel tuo quartiere?
                  Fai una segnalazione alla tua amministrazione comunale in
                  pochi semplici passaggi:
                </p>
              </div>
            </Link>
          </Col>
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div>
              <img className="img-fluid my-5" src={signalHome} alt="pic"></img>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around align-items-center">
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div>
              <img className="img-fluid my-5" src={chooseHome} alt="pic"></img>
            </div>
          </Col>
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div className="div__anim">
              <h4>
                <span className="title__reg">Passo 1</span>: Scegli un tipo di
                segnalazione
              </h4>
              <p className="fs-4">
                Seleziona il tipo di problema che vuoi segnalare, ad esempio
                "Illuminazione pubblica" o "Rifiuti".
              </p>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between align-items-center">
          <Col
            xs={8}
            sm={10}
            md={6}
            lg={4}
            className="order-last order-md-first"
          >
            <div className="div__anim">
              <h4>
                <span className="title__reg">Passo 2</span>: Descrivi il
                problema
              </h4>
              <p className="fs-4">
                Descrivi dettagliatamente il problema che hai riscontrato,
                specificando luogo, orario, e qualsiasi altro dettaglio utile.
              </p>
            </div>
          </Col>
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div>
              <img
                className="img-fluid my-5"
                src={describeHome}
                alt="pic"
              ></img>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around align-items-center">
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div>
              <img className="img-fluid my-5" src={mapHome} alt="pic"></img>
            </div>
          </Col>
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div className="div__anim">
              <h4>
                <span className="title__reg">Passo 3</span>: Scegli una
                posizione sulla mappa
              </h4>
              <p className="fs-4">
                Utilizza la mappa interattiva per indicare la posizione esatta
                del problema. Puoi trascinare il segnaposto o fare clic sulla
                mappa per impostare la posizione.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between align-items-center">
          <Col
            xs={8}
            sm={10}
            md={6}
            lg={4}
            className="order-last order-md-first"
          >
            <div className="div__anim">
              <h4>
                <span className="title__reg">Passo 4</span>: Carica le foto
              </h4>
              <p className="fs-4">
                Se disponi di foto del problema, puoi allegarle alla
                segnalazione per fornire ulteriori dettagli visivi.
              </p>
            </div>
          </Col>
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div>
              <img className="img-fluid my-5" src={photosHome} alt="pic"></img>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around align-items-center">
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div>
              <img className="img-fluid my-5" src={doneHome} alt="pic"></img>
            </div>
          </Col>
          <Col xs={8} sm={10} md={6} lg={4} className="">
            <div className="div__anim">
              <h4 className="title__reg">Fatto!</h4>
              <p className="fs-4">
                Segnalare problemi al tuo comune non è mai stato più semplice di
                cosi!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="img-fluid" src={waveHome} alt="pic"></img>
    </>
  );
};

export default Home;
