import React from "react";
import AdminHeader from "./AdminHeader";
import { Navigate } from "react-router-dom";

function App() {
  if (localStorage.getItem("id") !== null) {
    return (
      <div>
        <AdminHeader />
        <center>
          <h1 style={{ color: "green" }}>
            Welcome to Online Vcd System Admin Page
          </h1>
        </center>
      </div>
    );
  } else {
    return <Navigate replace to="/admin"></Navigate>;
  }
}
export default App;
