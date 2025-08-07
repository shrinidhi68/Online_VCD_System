import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>ONLINE VCD SYSTEM</Navbar.Brand>
        <Nav className="d-flex">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="login">UserLogin</Nav.Link>
          <Nav.Link href="userRegister">RegisterUser</Nav.Link>
          <Nav.Link href="admin">AdminLogin</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
