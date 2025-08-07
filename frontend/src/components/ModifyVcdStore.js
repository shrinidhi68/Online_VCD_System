import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AdminHeader from "./AdminHeader";
import AdminService from "./AdminService";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
function App() {
  const [data, setData] = useState([]);
  const [redirect, setredirect] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (localStorage.getItem("id") != null) {
      AdminService.getByIdStore(id).then((response) => {
        setData(response.data);
      });
    }
  }, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.modifyStore(data)
      .then((response) => {
        alert(response.data);
        setredirect(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (localStorage.getItem("id") != null) {
    if (redirect) {
      return <Navigate replace to="/displayVcdStore" />;
    } else {
      return (
        <>
          <AdminHeader />
          <center>
            <div>
              <h2 style={{ backgroundColor: "green" }}>Modify VcdStore</h2>
            </div>
          </center>
          <br></br>
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>StoreId</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Store Id"
                  name="vcdStoreId"
                  value={data.vcdStoreId}
                  onChange={handleChange}
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className="justify-content-center">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>Enter PhoneNumber</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={data.phoneNumber}
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
                  value={data.storeAddress}
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
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      );
    }
  } else {
    return <Navigate replace to="/admin"></Navigate>;
  }
}
export default App;
