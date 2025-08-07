import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import UserHome from "./components/UserHome";
import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import AdminHome from "./components/AdminHome";
import AddVcdStore from "./components/AddVcdStore";
import DisplayVcdStore from "./components/DisplayVcdStore";
import AddVcd from "./components/AddVcd";
import DisplayVcdDetails from "./components/DisplayVcdDetails";
import ModifyVcdStore from "./components/ModifyVcdStore";
import ModifyVcdDetails from "./components/ModifyVcdDetails";
import SearchVcdStore from "./components/SearchVcdStore";
import SearchVcd from "./components/SearchVcd";
import ViewCart from "./components/ViewCart";
import ModifyCart from "./components/ModifyCart";
import ConfirmOrder from "./components/ConfirmOrder";
import OrderHistory from "./components/OrderHistory";

export default function Rout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="adminHome" element={<AdminHome />} />
        <Route path="userhome" element={<UserHome />} />
        <Route path="addStore" element={<AddVcdStore />} />
        <Route path="displayVcdStore" element={<DisplayVcdStore />} />
        <Route path="vcdDetails" element={<DisplayVcdDetails />} />
        <Route path="addVcd" element={<AddVcd />} />
        <Route path="modifyPage/:id" element={<ModifyVcdStore />} />
        <Route path="modifyVcdPage/:id" element={<ModifyVcdDetails />} />
        <Route path="searchVcdStore" element={<SearchVcdStore />} />
        <Route path="searchVcd" element={<SearchVcd />} />
        <Route path="viewCart" element={<ViewCart />} />
        <Route path="modifyCart/:id" element={<ModifyCart />} />
        <Route path="confirmOrder" element={<ConfirmOrder />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="userRegister" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Rout />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
