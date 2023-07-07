import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import WelcomeImg from "../assets/imgs/welcome.svg";
import RegistrationCard from "./RegistrationCard";
import Particle from "../components/Particle";

const Registration = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTaxCodeChange = (event) => {
    setTaxCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      taxCode: taxCode,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response;
        console.log(data);
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setUserName("");
        setTaxCode("");
        setRegistrationCompleted(true);
        alert("Registrato con successo!");
      } else {
        console.log("Error occurred with the request");
        alert("All rows are required!");
      }
    } catch (error) {
      console.log("Generic error occurred", error);
      alert(error);
    }
  };

  return (
    <>
      <div className="particle__back">
        <Particle />
      </div>
      <Container className="my-5 flex-lg-column">
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={8} sm={10} md={6} lg={4} className="order-lg-1">
            <div>
              <img className="img-fluid my-3" src={WelcomeImg} alt="pic"></img>
            </div>
          </Col>
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={4}
            className="order-lg-3 my-5 d-flex justify-content-around"
          >
            <RegistrationCard />
          </Col>
          <Col xs={10} lg={4} className="login-box order-lg-2">
            <h3 className=" my-3 d-flex justify-content-center">Registrati</h3>
            <form>
              <div className="user-box">
                <input
                  type="text"
                  name=""
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                <label>Nome</label>
              </div>
              <div className="user-box">
                <input
                  type="text"
                  name=""
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
                <label>Cognome</label>
              </div>
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
                  type="email"
                  name=""
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <label>@Email</label>
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
              <div className="user-box">
                <input
                  type="text"
                  name=""
                  value={taxCode}
                  onChange={handleTaxCodeChange}
                  required
                />
                <label>Codice Fiscale</label>
              </div>

              {registrationCompleted ? (
                <center>
                  <Link to="/login" className="nav-link">
                    <a className="text-black">
                      Vai al Login
                      <span></span>
                    </a>
                  </Link>
                </center>
              ) : (
                <center>
                  <a className="text-black" onClick={handleSubmit}>
                    REGISTRATI
                    <span></span>
                  </a>
                </center>
              )}
              <Link to="/login" className="nav-link">
                <div className="text-secondary d-flex justify-content-center">
                  Già registrato? Effettua il login!
                </div>
              </Link>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registration;
