import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserHeader from "./UserHeader";
import UserService from "./UserService";
import Table from "react-bootstrap/Table";
import { Navigate } from "react-router-dom";

function App() {
  const [place, setPlace] = useState("");
  const handleChange = (e) => {
    setPlace(e.target.value);
  };
  const [vcdStore, setVcdStore] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.searchVcdStore(place)
      .then((response) => {
        setVcdStore(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (localStorage.getItem("id") === null) {
    return <Navigate replace to="/login"></Navigate>;
  } else {
    return (
      <div>
        
        <center>
          <h1 style={{ color: "green" }}>
            Search VcdStore by place (e.g., city, state)
          </h1>
        </center>
        <Navbar className="justify-content-center">
          <Form inline onSubmit={handleSubmit}>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  name="place"
                  value={place}
                  onChange={handleChange}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Search</Button>
              </Col>
            </Row>
          </Form>
        </Navbar>

        {vcdStore.length > 0 && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Store Id</th>
                <th>PhoneNumber</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {vcdStore.map((item) => (
                <tr key={item.vcdStoreId}>
                  <td>{item.vcdStoreId}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.storeAddress}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

export default App;
