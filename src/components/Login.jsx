/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import logimg from "../assets/imgs/sigin.svg";
import { useLocalStorage } from "react-use";
import Particle from "../components/Particle";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
        localStorage.setItem("API_KEY", data.accessToken);
        localStorage.setItem("user", data.username);
        localStorage.setItem("tokenType", data.tokenType);
        localStorage.setItem("role", data.role);
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
  let token = localStorage.getItem("API_KEY");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="particle__back">
        <Particle />
      </div>
      <Container className="py-5 mt-5">
        {loading ? (
          <Row>
            <Col className="d-flex justify-content-center align-items-center my-5">
              <Spinner animation="border" variant="primary" size="lg" />
            </Col>
          </Row>
        ) : (
          <Row className="d-flex justify-content-center my-5 gy-2">
            <Col xs={8} sm={10} md={6} lg={6} className="order-lg-1">
              <div>
                <img className="img-fluid my-3" src={logimg} alt="pic"></img>
              </div>
            </Col>
            <Col
              xs={10}
              md={6}
              lg={6}
              xl={4}
              xxl={4}
              className="mb-4 login-box"
            >
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
    </>
  );
};

export default Login;
