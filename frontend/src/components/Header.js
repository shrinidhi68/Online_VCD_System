import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Outlet, Link } from "react-router-dom";

export default function Header() {
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>ONLINE VCD SYSTEM</Navbar.Brand>
        <Nav className="d-flex">
           <Nav.Link><Link to="/">Home</Link></Nav.Link>
          <Nav.Link> <Link to="/login">UserLogin</Link></Nav.Link>
          <Nav.Link><Link to="/userRegister">RegisterUser</Link></Nav.Link>
          <Nav.Link><Link to="/admin">AdminLogin</Link></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <main>
    <Outlet />
    </main>
    
    </>

  );
}
