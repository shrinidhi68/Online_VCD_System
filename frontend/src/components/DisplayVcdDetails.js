import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import AdminHeader from "./AdminHeader";
import AdminService from "./AdminService";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [mod] = useState("/modifyVcdPage/");

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      AdminService.displayVcd().then((response) => {
        setData(response.data);
      });
    }
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this id " + id + " ?"
    );
    if (confirm) {
      AdminService.deleteVcd(id)
        .then((response) => {
          AdminService.displayVcd().then((response) => {
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
        <AdminHeader />
        <center>
          <h1 style={{ color: "blue" }}>List of Vcds</h1>
        </center>
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
              <th>Modify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
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
                  <a href={mod + item.vcdId}>
                    <Button variant="primary">Modify</Button>
                  </a>
                </td>
                <td>
                  {" "}
                  <Button
                    type=""
                    variant="danger"
                    onClick={() => handleDelete(item.vcdId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  } else {
    return <Navigate replace to="/admin"></Navigate>;
  }
}
export default App;
