import React from "react";
import Header from "../header/Header";     // MainMenu adında sayfa yapılacak..
import Navbar from "../nav/Navbar";
import { Routes, Route } from "react-router-dom";
import Kayit from '../kayit/Kayit'
// import Program from './components/program/Program'
// import Search from './components/search/Search'
import CustomerList from '../customers/CustomerList'

const HomePage = () => {
  
  
  return (
    <div className="container">
      {<Navbar /> } <br />
      <Routes>

    
          
      {/* <Kayit/> */}
      {/* <Images/> */}
        {/* <Route path="/Kayit" element={<Kayit/>}/> */}
      {/* <Route path="/Program" element={<Program />} />
      <Route path="/Üye-Bul" element={<Search />} />  */}
      
      { <Route path="/CustomerList" element={<CustomerList />} /> }
      </Routes>
    </div>
  );
};

export default HomePage;