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
      <Container className="flex-lg-column mt-5 mb-sm-4">
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={10} sm={10} md={10} lg={4} xl={4} className="order-lg-1">
            <div>
              <img
                className="img-fluid my-sm-3"
                src={WelcomeImg}
                alt="pic"
              ></img>
            </div>
          </Col>
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={4}
            xl={4}
            className="order-lg-3 d-flex justify-content-around mb-sm-2 mt-2"
          >
            <RegistrationCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default FirstPage;
