import React, {useState} from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  TextareaAutosize,
} from "@mui/material";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer, CDBSelect } from "cdbreact";
import { Formik, Form, Field } from "formik";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../nav/Navbar"


import { useSelector } from "react-redux";
import { AddCustomer, UpdateCustomer } from '../../api/axios'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Height, Margin, Padding } from "@mui/icons-material";



const Kayit = () => {
  const dispatch = useDispatch();

  var updateData = false;

  const handleSubmit = (values) => {
    console.log("Form verileri:", values);
    const customerId = updateData ? updateData.customerId : "";

    const requestFunction = updateData ? UpdateCustomer : AddCustomer;

    requestFunction(values.name, values.surname, values.identityNumber, values.phoneNumber, values.email, values.registryDateLong)
      .then((data) => {
        if (data?.status === "Error") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: data.errorMessage,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: updateData ? "Üye Güncellendi" : "Üye Eklendi",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {            
              window.location.reload();
            }
          });
        }
      })
      .catch((error) => {
        console.error("Request error:", error);
      });
  };

  const ay = [];
  for (let i = 1; i <= 12; i++) {
    ay.push({
      text: i.toString(),
      value: i.toString()
    });
  }
  
  const [ayState] = useState(ay);
  
  return (
    <>
      
        <CssBaseline />
        <NavBar />
        
          <Container 
          style={{
            display:"flex",
            justifyContent:"center",
        
            width: "50%",
            marginTop: "-10rem",
            marginLeft: "32%",
            background: "black",
          boxShadow: "0px -1px 5px black",
          color: "#e7c818",
        }}>
            <Box
            style={{

              padding:'2rem',
              width: "30rem",
              background: "black",
              border: "0.1px solid black",
              color: "#e7c818",
            }}>
              <Typography  gutterBottom>
              <div
              style={{
                border: "1px solid #e7c818",
                boxShadow: "1px 1px 6px 5px #e7c818",
              }}
              className="text-center mt-4 mb-2"
            >
              <p className="h4"> Üyelik Kayıt Formu </p>
            </div>
              </Typography>
              <Formik
                initialValues={{
                  name: updateData ? updateData.customerName : "",
                  surname: updateData ? updateData.customerSurname : "",
                  identityNumber: updateData ? updateData.customerIdentityNumber : "",
                  phoneNumber: updateData ? updateData.customerPhoneNumber : "",
                  email: updateData ? updateData.customerEmail : "",
                  registryDateLong: updateData ? updateData.customerRegistryDateLong : "",
                }}
                onSubmit={handleSubmit}
              >
                {(formikProps) => (
                  <Form>
                    <Field name="name">
                      {({ field }) => (
                        <CDBInput
                          {...field}
                          material
                  hint="Name"
                  type="text"
                  style={{
                    background: "black",
                    color: "#e7c818",
                    boxShadow: "0px -1px 5px #e7c818",
                  }}
                  placeholder="Ad"
                          fullWidth
                          required
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                      )}
                    </Field>
                    <Field name="surname">
                      {({ field }) => (
                        <CDBInput
                          {...field}
                          fullWidth
                          required
                          variant="outlined"
                          sx={{ mb: 2 }}
                          material
                          hint="Surname"
                          type="text"
                          style={{
                            background: "black",
                            color: "#e7c818",
                            boxShadow: "0px -1px 5px #e7c818",
                          }}
                          placeholder="Soyad"
                        />
                      )}
                    </Field>
                    <Field name="identityNumber">
                      {({ field }) => (
                        <CDBInput
                          {...field}
                          fullWidth
                          required
                          multiline
                          minRows={12}
                          variant="outlined"
                          sx={{ mb: 2 }}
                          material
              hint="KimlikNumarası"
              type="text"
              style={{
                background: "black",
                color: "#e7c818",
                boxShadow: "0px -1px 5px #e7c818",
              }}
              placeholder="Kimlik Numarası"
                        />
                      )}
                    </Field>
                    <Field name="phoneNumber">
                      {({ field }) => (
                        <CDBInput
                          {...field}
                          fullWidth
                          required
                          multiline
                          minRows={12}
                          variant="outlined"
                          sx={{ mb: 2 }}
                          material
              hint="TelefonNumarası"
              type="text"
              style={{
                background: "black",
                color: "#e7c818",
                boxShadow: "0px -1px 5px #e7c818",
              }}
              placeholder="Telefon Numarası"
                        />
                      )}
                    </Field>
                    <Field name="email">
                      {({ field }) => (
                        <CDBInput
                          {...field}
                          fullWidth
                          required
                          multiline
                          minRows={12}
                          variant="outlined"
                          sx={{ mb: 2 }}
                          material
              hint="Email"
              type="text"
              style={{
                background: "black",
                color: "#e7c818",
                boxShadow: "0px -1px 5px #e7c818",
              }}
              placeholder="E-mail Adresi"
                        />
                      )}
                    </Field>
                    <Field name="registryDateLong">
                      {({ field }) => (
                        
                        <CDBSelect selected="Üyelik Süresi (Ay)"
                        options={ay}
                          {...field}
                          fullWidth
                          required
                          multiline
                          minRows={12}
                          variant="outlined"
                          sx={{mb: 2 }}
                          material
              hint="Kayıt Tarihi"
              type="select"
              style={{
                background: "black",
                color: "#e7c818",
                boxShadow: "0px -1px 5px #e7c818",
                marginTop:"1rem",
                width:"100%",
                
              }}
              placeholder="Üyelik Süresi (Ay)"
              />   
                        
                      )}
                    </Field>
                    <CDBBtn type="submit" variant="contained" color="dark"
                     className="btn-block my-3 mx-0">
                      {updateData ? "Üye Bilgilerini Güncelle" : "Üyelik Oluştur"}
              
            </CDBBtn>
                    
                  </Form>
                )}
              </Formik>
            </Box>
          </Container>
    
      
    </>
  );
};

export default Kayit;