import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AdminService from "./AdminService";
import { Navigate } from "react-router-dom";

export default function Header() {
  const [redirect, setRedirect] = useState(false);
  const handlerSubmit = (e) => {
    e.preventDefault();
    AdminService.logout()
      .then((response) => {
        alert(response.data);
        setRedirect(true);
        localStorage.removeItem("id");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (redirect) {
    return <Navigate replace to="/admin" />;
  } else {
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>ONLINE VCD SYSTEM</Navbar.Brand>
          <Nav className="d-flex">
            <Nav.Link href="/adminHome">Home</Nav.Link>
            <Nav.Link href="/addStore">Add VcdStore</Nav.Link>
            <Nav.Link href="/displayVcdStore">View Vcd Store</Nav.Link>
            <Nav.Link href="/addVcd">Add Vcd Details</Nav.Link>
            <Nav.Link href="/vcdDetails">View Vcd Details</Nav.Link>
            <Form className="d-flex" onSubmit={handlerSubmit}>
              <Button variant="outline-danger" type="submit">
                Logout
              </Button>
            </Form>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
