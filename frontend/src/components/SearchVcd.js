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
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [cart, setCart] = useState({
    userId: {
      userId: localStorage.getItem("id"),
    },
    vcdId: {
      vcdId: "",
    },
  });

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const [vcdDetails, setVcdDetails] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.searchVcdByName(name)
      .then((response) => {
        setVcdDetails(response.data);
      })
      .catch((error) => {
        UserService.searchVcdByCatgory(name)
          .then((response) => {
            setVcdDetails(response.data);
          })
          .catch((error1) => {
            UserService.searchVcdByLanguage(name)
              .then((response) => {
                setVcdDetails(response.data);
              })
              .catch((error2) => {
                UserService.searchVcdByRating(name)
                  .then((response) => {
                    setVcdDetails(response.data);
                  })
                  .catch((error3) => {
                    alert(error.response.data);
                  });
              });
          });
      });
  };
  const handleAdd = (id) => {
    const updatedCart = {
      userId: {
        userId: localStorage.getItem("id"),
      },
      vcdId: {
        vcdId: id,
      },
    };
    console.log(cart.userId.userId + " " + cart.vcdId.vcdId);
    UserService.addToCart(updatedCart)
      .then((response) => {
        alert(response.data);
        setRedirect(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  if (localStorage.getItem("id") !== null) {
    if (redirect) {
      return <Navigate replace to="/userhome" />;
    } else {
      return (
        <div>
          <UserHeader />
          <center>
            <h1 style={{ color: "green" }}>
              Search VcdDetails by (e.g., category, ratings,name,language)
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
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Search</Button>
                </Col>
              </Row>
            </Form>
          </Navbar>

          {vcdDetails.length > 0 && (
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Vcd Id</th>
                  <th>Vcd Name</th>
                  <th>Language</th>
                  <th>Categorye</th>
                  <th>Ratings</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th>Store Id</th>
                  <th>Add to Cart</th>
                </tr>
              </thead>
              <tbody>
                {vcdDetails.map((item) => (
                  <tr key={item.vcdId}>
                    <td>{item.vcdId}</td>
                    <td>{item.vcdName}</td>
                    <td>{item.language}</td>
                    <td>{item.category}</td>
                    <td>{item.ratings}</td>
                    <td>{item.quantity}</td>
                    <td>{item.cost}</td>
                    <td>{item.storeId.vcdStoreId}</td>

                    <td>
                      {" "}
                      <Button
                        variant="primary"
                        onClick={() => handleAdd(item.vcdId)}
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      );
    }
  } else {
    return <Navigate replace to="/login"></Navigate>;
  }
}
export default App;
