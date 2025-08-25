import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserService from "./UserService";
import { Navigate,Outlet,Link } from "react-router-dom";

export default function Header() {
  const [redirect, setRedirect] = useState(false);
  const handlerSubmit = (e) => {
    e.preventDefault();
    UserService.logout()
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
    return <Navigate replace to="/login" />;
  } else {
    return (
      <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>ONLINE VCD SYSTEM</Navbar.Brand>
          <Nav className="d-flex">
            <Nav.Link><Link to="/userHeader">Home</Link></Nav.Link>
            <Nav.Link><Link to="/userHeader/searchVcdStore">Search VcdStore</Link></Nav.Link>
            <Nav.Link> <Link to="/userHeader/searchVcd">Search Vcds</Link></Nav.Link>
            <Nav.Link ><Link to="/userHeader/viewCart">Cart</Link></Nav.Link>
            <Nav.Link ><Link to="/userHeader/orderHistory">Order History</Link></Nav.Link>
            <Form className="d-flex" onSubmit={handlerSubmit}>
              <Button variant="outline-danger" type="submit">
                Logout
              </Button>
            </Form>
          </Nav>
        </Container>
      </Navbar>
     <main>
      <Outlet/>
     </main>
     </>
    );
  }
}
