import React from "react";
import Header from "./Header";
export default function Home() {
  const myStyle = {
    backgroundImage: "url('')",

    height: "100vh",

    marginTop: "-70px",

    fontSize: "20px",

    backgroundSize: "cover",

    backgroundRepeat: "no-repeat",
  };
  return (
    <div>
      <Header />
      <center>
        <h1 style={{ color: "green" }}>Welcome to Online Vcd System</h1>
      </center>
    </div>
  );
}
