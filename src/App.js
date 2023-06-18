import React,{useState} from "react";
import Register from "./SignUpForm/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./SignUpForm/Welcome";
import Api from "./Api/Api";
// import Countries from "./Countries/City";
import NodeApi from "./form/NodeApi";
import Practice from "./Practice/Practice";
import Shop from "./nn/Shop";
import './App.css';
import Product from "./Shopping/Product";



const App = () => {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
 

  return (
    <div className="header">
      {/* <BrowserRouter>
        <Routes> */}
      {/* <Route path='/' element={<Register />} /> */}
      {/* <Route path='/welcome' element= {<Welcome />} /> 
        </Routes>
        <Api />
      </BrowserRouter> */}
      {/* <Countries /> */}
      {/* <NodeApi /> */}
      {/* <Shop /> */}
      {/* <Practice /> */}
      <Product />
    </div>
  );
};

export default App;
