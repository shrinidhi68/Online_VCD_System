import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
import Header from "./components/Header";
import UserHeader from "./components/UserHeader";

export default function Rout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<Home />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="admin" element={<AdminLogin />} />
          <Route path="userRegister" element={<UserRegister />} />
        </Route>
        <Route path="userHeader" element={<UserHeader/>}>
          <Route index  element={<UserHome />} />
          <Route path="searchVcdStore" element={<SearchVcdStore />} />
          <Route path="searchVcd" element={<SearchVcd />} />
          <Route path="orderHistory" element={<OrderHistory />} />
          <Route path="viewCart" element={<ViewCart />} />
        </Route>
        <Route path="adminHome" element={<AdminHome />} />
        
        <Route path="addStore" element={<AddVcdStore />} />
        <Route path="displayVcdStore" element={<DisplayVcdStore />} />
        <Route path="vcdDetails" element={<DisplayVcdDetails />} />
        <Route path="addVcd" element={<AddVcd />} />
        <Route path="modifyPage/:id" element={<ModifyVcdStore />} />
        <Route path="modifyVcdPage/:id" element={<ModifyVcdDetails />} />
     
        <Route path="modifyCart/:id" element={<ModifyCart />} />
        <Route path="confirmOrder" element={<ConfirmOrder />} />
        
        
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
