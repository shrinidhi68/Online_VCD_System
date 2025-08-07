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
  const [redirect, setredirect] = useState(false);
  const [cart, setCart] = useState({
    cartId: "",
    userId: {
      userId: "",
    },
    vcdId: {
      vcdId: "",
      vcdName: "",
    },
    quantity: "",
  });
  const [user, setUser] = useState({
    userId: localStorage.getItem("id"),
  });
  const { id } = useParams();
  useEffect(() => {
    UserService.getCartById(id).then((response) => {
      setData(response.data);
      setCart(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.modifyCart(data)
      .then((response) => {
        alert(response.data);
        setredirect(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (redirect) {
    return <Navigate replace to="/viewCart" />;
  } else {
    return (
      <>
        <UserHeader />
        <center>
          <div>
            <h2 style={{ backgroundColor: "green" }}>Modify Item quantity</h2>
          </div>
        </center>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Form.Group as={Col} md="2" controlId="validationCustom01">
              <Form.Label>Vcd Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Vcd Name"
                name="vcdId"
                value={cart.vcdId.vcdName}
                readOnly
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group as={Col} md="2" controlId="validationCustom01">
              <Form.Label>Enter Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={data.quantity}
                min={1}
                max={50}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
}
export default App;
