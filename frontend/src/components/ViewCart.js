import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import UserService from "./UserService";
import Button from "react-bootstrap/Button";
import UserHeader from "./UserHeader";
import { Navigate } from "react-router-dom";
function App() {
  const [data, setData] = useState([]);
  const [mod] = useState("/modifyCart/");
  const [user, setUser] = useState({
    userId: localStorage.getItem("id"),
  });

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      UserService.getCartDetailsByUser(user).then((response) => {
        setData(response.data);
      });
    }
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this id " + id + " ?"
    );
    if (confirm) {
      UserService.deleteFromCart(id)
        .then((response) => {
          UserService.getCartDetailsByUser(user).then((response) => {
            setData(response.data);
          });
          alert(response.data);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };
  if (localStorage.getItem("id") !== null) {
    return (
      <>
        <UserHeader />
        {data.length === 0 && (
          <center>
            <h1 style={{ color: "blue" }}>No Cart Items</h1>
          </center>
        )}
        {data.length > 0 && (
          <center>
            <h1 style={{ color: "blue" }}>Cart Items</h1>
          </center>
        )}
        {data.length > 0 && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Vcd Name</th>
                <th>Quantity</th>
                <th>Cost</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.cartId}>
                  <td>{item.vcdId.vcdName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.vcdId.cost}</td>
                  <td>
                    <a href={mod + item.cartId}>
                      <Button variant="primary">Modify</Button>
                    </a>
                  </td>
                  <td>
                    {" "}
                    <Button
                      type=""
                      variant="danger"
                      onClick={() => handleDelete(item.cartId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {data.length > 0 && (
          <center>
            <a href="/confirmOrder">
              <Button className="justify-content-center">Book</Button>
            </a>
          </center>
        )}
      </>
    );
  } else {
    return <Navigate onClick replace to="/login"></Navigate>;
  }
}
export default App;
