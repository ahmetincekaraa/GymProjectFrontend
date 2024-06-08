
import Navbar from "../nav/Navbar"

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getAllCustomers,getCustomerById, deleteCustomer } from '../../api/axios'

import { useDispatch } from 'react-redux';

import {
  Button,
} from "@mui/material";


import { useNavigate, } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CDBBtn, CDBContainer } from "cdbreact";
import { Router, Route, Link } from 'react-router-dom';

import Swal from "sweetalert2";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: '#e7c818'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(area, movement, set, number) {
  return { area, movement, set, number};
}

const rows = [
  createData('GÖĞÜS ', 159, 6.0, 24, 4.0),
  createData('ÖN KOL', 237, 9.0, 37, 4.3),
  createData('ARKA KOL', 237, 9.0, 37, 4.3),
  createData('SIRT', 237, 9.0, 37, 4.3),
  createData('OMUZ', 237, 9.0, 37, 4.3),
  createData('BACAK', 237, 9.0, 37, 4.3),
  createData('KARIN', 237, 9.0, 37, 4.3),
];


const CustomerProgram = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dispatched, setDispatched] = useState(false);


  const handleDeleteClick = async (customerId) => {
    Swal.fire({
      title: "Üye silinsin mi?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "İptal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCustomer(customerId)
          .then((response) => {
            if (response.status !== "Error") {
              dispatch({ type: "deleteCustomer", payload: customerId });
              setDispatched(true);
              Swal.fire(
                "Silme işlemi tamamlandı.",
                "",
                "success"
              );
            } else {
              Swal.fire("Hata!", response.message, "error");
            }
          })
          .catch((error) => {
            console.error("Müşteri silme hatası:", error);
            Swal.fire(
              "Hata!",
              "Müşteri silinirken bir hata oluştu.",
              "error"
            );
          });
      }
    });
  };
  
  
  return (
    <><Navbar />

      <TableContainer style={{
      width: "80%",
      marginTop: "-11rem",
      marginLeft: "20%", borderRadius:'1rem 1rem 0rem 0rem'}}>
        
        
        
          
          <Table sx={{ minWidth: 700, background:'#e7c818', border:'2px solid black',  }} aria-label="customized table">
            <TableHead>
          <TableRow>
            <StyledTableCell align="center">Geliştirilecek Bölge</StyledTableCell>
            <StyledTableCell align="center">Hareket İsmi</StyledTableCell>
            <StyledTableCell align="center">Set</StyledTableCell>
            <StyledTableCell align="center">Sayı</StyledTableCell>
            {/* <StyledTableCell align="center">Aidat Tutarı (₺)</StyledTableCell> */}
            
          
            
            <StyledTableCell align="center">İşlem</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
            {rows?.map((row) => (
              
              <StyledTableRow key={row.area}>
                
                  <StyledTableCell component="th" scope="row"
                  align="center">
             {row.area}
              </StyledTableCell>
                  
              <StyledTableCell align="center">
<PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Dashboard
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
              </StyledTableCell>

              <StyledTableCell align="center">{row.customerEmail}</StyledTableCell>

              <StyledTableCell align="center">{row.customerIdentityNumber}</StyledTableCell>


              <StyledTableCell align="center" color="black">
              <CDBBtn style={{marginTop:"0.3em"}}
         size="medium"
         color="dark" 
         
            >                Program Düzenle
              </CDBBtn>
              </StyledTableCell>

              

              {/* <StyledTableCell align="center">{newsItem.customerRegistryDateLong}</StyledTableCell> */}
                    
                  
                  
                  
  
 
    
      <StyledTableRow container spacing={1} alignItems="center">
        <TableRow align="center">
          
        
          
          <CDBBtn style={{marginTop:"0.2em"}}
         
          size="medium"
          
            color="danger"  
            onClick={() => {
              handleDeleteClick(row.customerId);
            }}
            
          >
            Sil
          </CDBBtn>
          </TableRow>
          
      </StyledTableRow>
  
  
  
  
              </StyledTableRow> 
            ))} 
            </TableBody>
          </Table>
      </TableContainer>
      
    </>
  );
};
export default CustomerProgram;
