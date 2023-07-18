import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import WelcomeImg from "../assets/imgs/welcome.svg";
import RegistrationCard from "./RegistrationCard";
import Particle from "../components/Particle";

const FirstPage = () => {
  return (
    <>
      <div className="particle__back">
        <Particle />
      </div>
      <Container className="my-5 flex-lg-column">
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={10} sm={10} md={10} lg={4} xl={4} className="order-lg-1">
            <div>
              <img className="img-fluid my-3" src={WelcomeImg} alt="pic"></img>
            </div>
          </Col>
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={4}
            xl={4}
            className="order-lg-3 my-5 d-flex justify-content-around"
          >
            <RegistrationCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default FirstPage;
