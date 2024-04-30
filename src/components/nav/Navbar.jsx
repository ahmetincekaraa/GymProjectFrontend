import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
// import Program from '../program/Program.jsx';
import CustomerList from '../customers/CustomerList'
import Kayit from '../kayit/Kayit'
import { Routes, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <CDBSidebar backgroundColor="" textColor="black">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <CDBSidebarHeader>Üyelik İşlemleri</CDBSidebarHeader>
        </CDBSidebarHeader>

        <CDBSidebarContent style={{maxWidth: "70%"}}>
          <CDBSidebarMenu >
            <Link to="/Kayit/">
              <CDBSidebarMenuItem icon="fa fa-save">
                Üyelik Kayıt
              </CDBSidebarMenuItem>
            </Link>
           
            <Link to="/CustomerList/">
              <CDBSidebarMenuItem icon="fa fa-list">
                Üye Listesi
              </CDBSidebarMenuItem>
            </Link>

            {/* <Link to="/Üye-Bul">
              <CDBSidebarMenuItem icon="fa fa-search">
                Üye Bul
              </CDBSidebarMenuItem>
            </Link> */}
          </CDBSidebarMenu>

          
        </CDBSidebarContent >

        <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
      </CDBSidebar >
    </>
  );
};

export default Navbar;