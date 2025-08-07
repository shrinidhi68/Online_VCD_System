import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import UserHeader from "./UserHeader";
import UserService from "./UserService";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");
  const [redirect, setredirect] = useState(false);

  const [user, setUser] = useState({
    userId: localStorage.getItem("id"),
  });

  useEffect(() => {
    if (localStorage.getItem("id") != null) {
      UserService.getCart(user).then((response) => {
        setTotal(response.data);
      });
    }
  }, []);
  const [payment, setPayment] = useState({
    userId: {
      userId: localStorage.getItem("id"),
    },
    shippingAddress: "",
    validFrom: "",
    validTo: "",
    creditCardNumber: "",
    totalCharges: "",
  });

  const handleChange = (event) => {
    setPayment({ ...payment, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatePayment = {
      ...payment,
      totalCharges: total,
    };
    UserService.orderBooking(updatePayment)
      .then((response) => {
        alert(response.data);
        setredirect(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (localStorage.getItem("id") !== null) {
    if (redirect) {
      return <Navigate replace to="/viewCart" />;
    } else {
      return (
        <>
          <UserHeader />
          <center>
            <div>
              <h2 style={{ backgroundColor: "green" }}>ConfirmOrder</h2>
            </div>
          </center>
          <br></br>
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>Enter CreditCardNumber</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="CreditCardNumber"
                  name="creditCardNumber"
                  value={payment.creditCardNumber}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-center">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>Enter CreditCard FromDate</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="From Date"
                  name="validFrom"
                  value={payment.validFrom}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-center">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>Enter CreditCard expire Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder=" Expire Date"
                  name="validTo"
                  value={payment.validTo}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-center">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>TotalAmount to pay</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="TotalAmount"
                  name="totalCharges"
                  value={total}
                  onChange={handleChange}
                  readOnly
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-center">
              <Form.Group as={Col} md="3" controlId="validationCustom01">
                <Form.Label>shipping Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  as="textarea"
                  rows={3}
                  name="shippingAddress"
                  value={payment.shippingAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <br></br>
            <Row className="justify-content-center">
              <Col md={1}>
                <Button className="justify-content-center" type="submit">
                  Book
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      );
    }
  } else {
    return <Navigate replace to="/login"></Navigate>;
  }
}
export default App;
