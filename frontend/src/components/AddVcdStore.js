import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AdminHeader from "./AdminHeader";
import AdminService from "./AdminService";
import { Navigate } from "react-router-dom";

function App() {
  const [vcdStore, setVcdStore] = useState({
    storeAddress: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    setVcdStore({ ...vcdStore, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.addVcdStore(vcdStore)
      .then((response) => {
        alert(response.data);
        setVcdStore({
          storeAddress: "",
          phoneNumber: "",
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (localStorage.getItem("id") !== null) {
    return (
      <>
        <AdminHeader />
        <center>
          <div>
            <h2 style={{ backgroundColor: "green" }}>Add VcdStore</h2>
          </div>
        </center>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Form.Group as={Col} md="2" controlId="validationCustom01">
              <Form.Label>Enter PhoneNumber</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Phone Number"
                name="phoneNumber"
                value={vcdStore.phoneNumber}
                pattern="[1-9]{1}[0-9]{9}"
                title="Please enter exactly 10 digits"
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label> Enter Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                as="textarea"
                rows={3}
                name="storeAddress"
                value={vcdStore.storeAddress}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br></br>
          <Row className="justify-content-center">
            <Col md={1}>
              <Button className="justify-content-center" type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  } else {
    return <Navigate replace to="/admin"></Navigate>;
  }
}
export default App;
