import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import AdminHeader from "./AdminHeader";
import AdminService from "./AdminService";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [redirect, setredirect] = useState(false);
  const [mod, setMod] = useState("");

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      AdminService.displayVcdStore().then((response) => {
        setData(response.data);
      });
    }
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this id " + id + " ?"
    );
    if (confirm) {
      AdminService.deleteVcdStore(id)
        .then((response) => {
          AdminService.displayVcdStore().then((response) => {
            setData(response.data);
          });
          alert(response.data);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };
  const handleModify = (id) => {
    setMod("/modifyPage/" + id);
    setredirect(true);
  };
  if (localStorage.getItem("id") !== null) {
    if (redirect) {
      return <Navigate replace to={mod} />;
    } else {
      return (
        <>
          <AdminHeader />
          <center>
            <h1 style={{ color: "blue" }}>List of VcdStore</h1>
          </center>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Store Id</th>
                <th>PhoneNumber</th>
                <th>Address</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.vcdStoreId}>
                  <td>{item.vcdStoreId}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.storeAddress}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleModify(item.vcdStoreId)}
                    >
                      Modify
                    </Button>
                  </td>
                  <td>
                    {" "}
                    <Button
                      type=""
                      variant="danger"
                      onClick={() => handleDelete(item.vcdStoreId)}
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
    }
  } else {
    return <Navigate replace to="/admin"></Navigate>;
  }
}
export default App;
