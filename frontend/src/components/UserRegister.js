import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import UserService from "./UserService";
import { Navigate } from "react-router-dom";
import Header from "./Header";

function App() {
  const [validated, setValidated] = useState(false);
  const [redirect, setredirect] = useState(false);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPhoneNumber: "",
    password: "",
    address: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  //   const handleSubmit = (event) => {
  //     const form = event.currentTarget;
  //     if (form.checkValidity() === false) {
  //       event.preventDefault();
  //     }
  //     setValidated(true);
  //   };
  // const handleChange1 = (event) => {
  //   const phoneno = {
  //     userPhoneNumber: event.target.value,
  //   };
  //   if (phoneno.length === 10) {
  //     setUser({ ...user, userPhoneNumber: event.target.value });
  //   } else {
  //     event.target.setCustomValidity("pleasee enter 10 number");
  //   }
  // };
  const handleSubmit1 = (e) => {
    e.preventDefault();

    if (user.userEmail !== "") {
      UserService.saveUser(user)
        .then((response) => {
          alert(response.data);
          setMsg("/login");
          setUser({
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            userPhoneNumber: "",
            password: "",
            address: "",
          });
          setredirect(true);
          setValidated(false);
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data);
          setValidated(false);
        });
    }
  };
  if (redirect) {
    return <Navigate replace to={msg} />;
  } else {
    return (
      <>
        <Header />
        <center>
          <div>
            <h2>USER REGISTRATION</h2>
          </div>
        </center>
        <br></br>
        <Form onSubmit={handleSubmit1}>
          <Row className="justify-content-center">
            <Form.Group as={Col} md="2" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="userFirstName"
                value={user.userFirstName}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="userLastName"
                value={user.userLastName}
                onChange={handleChange}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="validationCustomEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="Email"
                placeholder="name@example.com"
                aria-describedby="inputGroupPrepend"
                name="userEmail"
                value={user.userEmail}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please Enter a Email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group as={Col} md="2" controlId="validationCustom03">
              <Form.Label>PhoneNumber</Form.Label>
              <Form.Control
                type="number"
                placeholder="PhoneNumber"
                name="userPhoneNumber"
                value={user.userPhoneNumber}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid phoneNumber.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="validationCustom05">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                onChange={handleChange}
                required
              />
              <Form.Text id="passwordHelpBlock" muted>
                Must contain at least one number and one uppercase and lowercase
                letter, and at least 8 or more characters.
              </Form.Text>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                as="textarea"
                rows={3}
                name="address"
                value={user.address}
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
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}
export default App;
