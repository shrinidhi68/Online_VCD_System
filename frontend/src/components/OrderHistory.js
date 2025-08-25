import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import UserService from "./UserService";
import Button from "react-bootstrap/Button";
import UserHeader from "./UserHeader";
import { Navigate } from "react-router-dom";

function App() {
  const [data, setData] = useState({
    payId: "",
    userId: {
      userId: "",
    },
    vcds: "",
    shippingAddress: "",
    totalCharges: "",
  });

  const [user, setUser] = useState({
    userId: localStorage.getItem("id"),
  });

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      UserService.getOrderHistoryByUser(user).then((response) => {
        setData(response.data);
      });
    }
  }, []);
  if (localStorage.getItem("id") !== null) {
    return (
      <>
        
        {data.length === 0 && (
          <center>
            <h1 style={{ color: "blue" }}>No order found</h1>
          </center>
        )}
        {data.length > 0 && (
          <center>
            <h1 style={{ color: "blue" }}>Orders</h1>
          </center>
        )}
        {data.length > 0 && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>ShippingAddress</th>
                <th>Product Ids</th>
                <th>Amount paid</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.payId}>
                  <td>{item.payId}</td>
                  <td>{item.shippingAddress}</td>
                  <td>{item.vcds}</td>
                  <td>{item.totalCharges}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
  } else {
    return <Navigate replace to="/login"></Navigate>;
  }
}
export default App;
