import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserService from "./UserService";
import { Navigate } from "react-router-dom";
import Header from "./Header";

function App() {
  const [user, setUser] = useState({
    userEmail: "",
    password: "",
  });

  const [redirect, setredirect] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.login(user)
      .then((response) => {
        localStorage.setItem("id", response.data.userId);
        alert("login successfull");
        setUser({
          userEmail: "",
          password: "",
        });
        setredirect(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (redirect) {
    return <Navigate replace to="/userhome" />;
  } else {
    return (
      <>
        <Header />
        <Container>
          <h1 style={{ textAlign: "center" }}>USER LOGIN</h1>
          <Row className="justify-content-center">
            <Col md={4}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="userEmail"
                    value={user.userEmail}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
