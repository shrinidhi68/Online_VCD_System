import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminService from "./AdminService";
import Header from "./Header";
import { Navigate } from "react-router-dom";

function App() {
  const [admin, setAdmin] = useState({
    adminId: "",
    password: "",
  });
  const [redirect, setredirect] = useState(false);
  const handleChange = (event) => {
    setAdmin({ ...admin, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.login(admin)
      .then((response) => {
        alert(response.data);
        localStorage.setItem("id", admin.adminId);
        setAdmin({
          adminId: "",
          password: "",
        });

        setredirect(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (redirect) {
    return <Navigate replace to="/adminHome" />;
  } else {
    return (
      <>
        {/* <Header /> */}
        <Container>
          <h1 style={{ textAlign: "center" }}>ADMIN LOGIN</h1>
          <Row className="justify-content-center">
            <Col md={4}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Admin Id</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Admin Id"
                    name="adminId"
                    value={admin.adminId}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={admin.password}
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
