import React from "react";
import UserHeader from "./UserHeader";
import { Navigate } from "react-router-dom";
function App() {
  if (localStorage.getItem("id") === null) {
    return <Navigate replace to="/login"></Navigate>;
  } else {
    return (
      <div>
       
        <center>
          <h1 style={{ color: "green" }}>
            Welcome to Online Vcd System Login Page
          </h1>
        </center>
      </div>
    );
  }
}
export default App;
