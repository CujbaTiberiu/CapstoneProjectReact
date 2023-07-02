import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import Home from "./Home";
import logimg from "../assets/imgs/sigin.svg";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const User = {
      username: username,
      password: password,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(User),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResponseText(data);
      } else {
        console.log("Error occurred with the request");
        alert("Username or password wrong!");
      }
    } catch (error) {
      console.log("Generic error occurred", error);
      alert(error);
    }

    setLoading(false);
  };

  return (
    <Container className="py-5 mt-5">
      {loading ? (
        <Row>
          <Col className="mx-auto mb-4">
            <Spinner animation="border" variant="primary" size="lg" />
          </Col>
        </Row>
      ) : responseText ? (
        <Home />
      ) : (
        <Row className="d-flex justify-content-center my-5 gy-2">
          <Col xs={8} sm={10} md={6} lg={6} className="order-lg-1">
            <div>
              <img className="img-fluid my-3" src={logimg} alt="pic"></img>
            </div>
          </Col>
          <Col xs={10} md={6} lg={6} xl={4} xxl={4} className="mb-4 login-box">
            <h1 className="title__reg d-flex justify-content-center">
              ComuniCate
            </h1>
            <h3 className="my-3 d-flex justify-content-center">
              Effettua il Login
            </h3>
            <form>
              <div className="user-box">
                <input
                  type="text"
                  name=""
                  value={username}
                  onChange={handleUserNameChange}
                  required
                />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input
                  type="password"
                  name=""
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <label>Password</label>
              </div>
              <center>
                <a className="color-white" onClick={handleSubmit}>
                  LOGIN
                  <span></span>
                </a>
              </center>
            </form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Login;
