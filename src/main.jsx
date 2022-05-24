import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/bootstrap.css";
import "./assets/bootstrap.bundle.js";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import EmployeeLeaves from "./EmployeeLeaves";
import ViewLeaves from "./ViewLeaves";
import { Navbar } from "./Components.jsx"



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/employeeleaves" element={<EmployeeLeaves />}></Route>
      <Route path="/viewleaves" element={<ViewLeaves />}></Route>
    </Routes>
  </BrowserRouter>
)
