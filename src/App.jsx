import React from "react";
import Header from './components/header/Header'     
// import Navbar from "./components/nav/Navbar";
import "./App.css";
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import Kayit from './components/kayit/Kayit'   
// import Program from './components/program/Program'
// import Search from './components/search/Search'
import Login from './components/login/Login'
import CustomerList from './components/customers/CustomerList'
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from "./actions/authActions";
import HomePage from "./components/homePage/homePage";
import CustomerUpdate from "./components/customerUpdate/CustomerUpdate";
import CustomerProgram from "./components/customerProgram/CustomerProgram"

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      dispatch(loginSuccess(userData));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
  
  return (
    <div className="container">
      { <Header />} <br />
      <Routes>

      <Route path="/" element={isLoggedIn ? <HomePage /> : <Login />} />
      {/* // <Navbar /> } */}
       <Route path="/Kayit" element={<Kayit/>}/>
      {/* <Route path="/Program" element={<Program />} /> */}
     {/* <Route path="/Üye-Bul" element={<Search />} />  */}
      <Route path="/Login" element={<Login />} />
      <Route style={{
        display:"flex",
        justifyContent:"center",
      }} path="/CustomerList"  element={<CustomerList />} /> 
      <Route path="/customer-update/:customerId" element={<CustomerUpdate />} /> 
      <Route path="/customer-program/:customerId" element={<CustomerProgram />} />
      </Routes>
    </div>
  );
};

export default App;