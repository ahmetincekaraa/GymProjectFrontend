
import Navbar from "../nav/Navbar"

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getAllCustomers,getCustomerById, deleteCustomer } from '../../api/axios'

import { useDispatch } from 'react-redux';

import {
  Button,
} from "@mui/material";


import { useNavigate, } from 'react-router-dom';


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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dispatched, setDispatched] = useState(false);

  const [customerList, setCustomerList] = useState([]);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  var updateData = useSelector((state) => state.data);

  const [customer, setCustomer] = useState();
  useEffect(() => {
    // getAllNews fonksiyonunu çağırarak haberleri al
    getAllCustomers()
      .then((data) => {
        if (data.status !== "Error") {
          // Haberler verisi geldiğinde state'i güncelle
          setCustomerList(data?.data);
        }
      })
      .catch((error) => {
        console.error("Üyelerin listelenme hatası:", error);
      });
      setDispatched(false);
  }, [dispatched]);

  useEffect(() => {
    if (dispatched) {
      // Yeniden listeleme işlemi burada gerçekleşecek
      getAllCustomers()
        .then((data) => {
          if (data.status !== "Error") {
            setCustomerList(data?.data);
          }
        })
        .catch((error) => {
          console.error("Üyelerin listelenme hatası:", error);
        });
    }
  }, [dispatched]);

  useEffect(() => {
    if(dispatched && updateData){
        console.log("AAAA");
        navigate("/AddCustomer")
        
    }
  }, [dispatched]);


  const handleUpdateClick = (customerId) => {
    navigate(`/customer-update/${customerId}`); // Düzenleme sayfasına yönlendirme
  };

  const handleUpdateClick2 = (customerId) => {
    navigate(`/customer-program/${customerId}`); // Düzenleme sayfasına yönlendirme
  };
  

  // const handleUpdateClick =  async (prop) => {

  //   await getCustomerById(prop)
  //   .then((data) => {
  //     if (data.status !== "Error") {
  //       // Haberler verisi geldiğinde state'i güncelle
  //       console.log("data",customer)
  //      dispatch({type: 'UpdateCustomer', payload: data?.data});
  //      setDispatched(true);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Üyelerin listelenme hatası:", error);
  //   });
  // };
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
            {/* Her haber öğesi için bir kart oluştur */}
            <TableHead>
          <TableRow>
            <StyledTableCell align="center">Ad Soyad</StyledTableCell>
            <StyledTableCell align="center">Telefon Numarası</StyledTableCell>
            <StyledTableCell align="center">Email Adresi</StyledTableCell>
            <StyledTableCell align="center">TC Kimlik Numarası</StyledTableCell>
            {/* <StyledTableCell align="center">Aidat Tutarı (₺)</StyledTableCell> */}
            
            <StyledTableCell align="center">Program</StyledTableCell>
            
            <StyledTableCell align="center">İşlem</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
            {customerList?.map((newsItem) => (
              
              <StyledTableRow key={newsItem.customerId}>
                
                  <StyledTableCell component="th" scope="row">
             {newsItem.customerName} {newsItem.customerSurname}
              </StyledTableCell>
                  
              <StyledTableCell align="center">{newsItem.customerPhoneNumber}</StyledTableCell>

              <StyledTableCell align="center">{newsItem.customerEmail}</StyledTableCell>

              <StyledTableCell align="center">{newsItem.customerIdentityNumber}</StyledTableCell>


              <StyledTableCell align="center" color="black">
              <CDBBtn style={{marginTop:"0.3em"}}
         size="medium"
         color="dark" 
         onClick={() => {
          handleUpdateClick2(newsItem.customerId);
        }}
            >                Program Düzenle
              </CDBBtn>
              </StyledTableCell>

              

              {/* <StyledTableCell align="center">{newsItem.customerRegistryDateLong}</StyledTableCell> */}
                    
                  
                  
                  
  
  {isLoggedIn && (
    
      <StyledTableRow container spacing={1} alignItems="center">
        <TableRow align="center">
          <CDBBtn style={{marginTop:"0.3em"}}
         size="medium"
         color="dark"  
            onClick={() => {
              handleUpdateClick(newsItem.customerId);
            }}
          >
            Düzenle
          </CDBBtn>
        
          
          <CDBBtn style={{marginTop:"0.2em"}}
         
          size="medium"
          
            color="danger"  
            onClick={() => {
              handleDeleteClick(newsItem.customerId);
            }}
            
          >
            Sil
          </CDBBtn>
          </TableRow>
          
      </StyledTableRow>
  
  )}
  
  
              </StyledTableRow> 
            ))} 
            </TableBody>
          </Table>
      </TableContainer>
      
    </>
  );
};
export default Customers;
