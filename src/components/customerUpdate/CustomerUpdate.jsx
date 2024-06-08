import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, UpdateCustomer } from '../../api/axios';
import Navbar from "../nav/Navbar";
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
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";


const CustomerUpdate = () => {
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState(true);

  const handleSubmit = (values) => {
    console.log("Veriler:", values);
    const customerId = updateData.customerId;
    const requestFunction = updateData.UpdateCustomer;

    requestFunction(values.name, values.surname, values.identityNumber, values.phoneNumber, values.email, values.registryDateLong)
      .then((data) => {
        if (data?.status === "Error") {
          Swal.fire({
            position: "center",
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
            dispatch(false);
            if (result.isConfirmed) {
              dispatch(null);
            }
          }).catch((error) => {
            console.error("Request error:", error);
          });
        };
      })
  };

  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [updatedCustomerName, setUpdatedCustomerName] = useState('');
  const [updatedCustomerSurname, setUpdatedCustomerSurname] = useState('');
  const [updatedCustomerIdentityNumber, setUpdatedCustomerIdentityNumber] = useState('');
  const [updatedCustomerPhoneNumber, setUpdatedCustomerPhoneNumber] = useState('');
  const [updatedCustomerEmail, setUpdatedCustomerEmail] = useState('');
  const [updatedCustomerRegistryDateLong, setUpdatedCustomerRegistryDateLong] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    getCustomerById(customerId)
      .then((data) => {
        if (data.status !== "Error") {
          setCustomer(data?.data);
          setUpdatedCustomerName(data?.data.customerName);
          setUpdatedCustomerSurname(data?.data.customerSurname);
          setUpdatedCustomerIdentityNumber(data?.data.customerIdentityNumber);
          setUpdatedCustomerPhoneNumber(data?.data.customerPhoneNumber);
          setUpdatedCustomerEmail(data?.data.customerEmail);
          setUpdatedCustomerRegistryDateLong(data?.data.customerRegistryDateLong);
        }
      })
      .catch((error) => {
        console.error("Müşteri bilgilerini alma hatası:", error);
      });
  }, [customerId]);

  const handleUpdate = async () => {
    try {
      await UpdateCustomer(
        customerId,
        updatedCustomerName,
        updatedCustomerSurname,
        updatedCustomerIdentityNumber,
        updatedCustomerPhoneNumber,
        updatedCustomerEmail,
        updatedCustomerRegistryDateLong
      );
      setUpdateMessage('Müşteri bilgileri başarıyla güncellendi.');
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Müşteri bilgileri başarıyla güncellendi.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Güncelleme başarısız:", error);
      setUpdateMessage('Müşteri bilgileri güncellenirken bir hata oluştu.');
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Müşteri bilgileri güncellenirken bir hata oluştu.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const ay = [];
  for (let i = 1; i <= 12; i++) {
    ay.push({
      text: i.toString(),
      value: i.toString()
    });
  }

  return (
  

    <>
      
        <CssBaseline />
        <Navbar />
        
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
              <p className="h4"> Üyelik Güncelleme Formu </p>
            </div>
              </Typography>
              {customer && (
              <Formik
                initialValues={{
                  name: updateData ? updateData.customerName : "",
                  surname: updateData ? updateData.customerSurname : "",
                  name: updateData ? updateData.customerIdentityNumber : "",
                  name: updateData ? updateData.customerPhoneNumber : "",
                  name: updateData ? updateData.customerEmail : "",
                  name: updateData ? updateData.customerRegistryDateLong : "",
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
                          value={updatedCustomerName || customer.customerName} 
              onChange={(e) => setUpdatedCustomerName(e.target.value)} 
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
                          value={updatedCustomerSurname || customer.customerSurname } 
              onChange={(e) => setUpdatedCustomerSurname(e.target.value)} 
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
              value={updatedCustomerIdentityNumber || customer.customerIdentityNumber } 
              onChange={(e) => setUpdatedCustomerIdentityNumber(e.target.value)} 
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
              value={updatedCustomerPhoneNumber || customer.customerPhoneNumber } 
              onChange={(e) => setUpdatedCustomerPhoneNumber(e.target.value)} 
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
              value={updatedCustomerEmail || customer.customerEmail } 
              onChange={(e) => setUpdatedCustomerEmail(e.target.value)} 
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
              value={updatedCustomerRegistryDateLong || customer.customerRegistryDateLong } 
              onChange={(e) => setUpdatedCustomerRegistryDateLong(e.target.value)} 
              />   
                        
                      )}
                    </Field>
                    <CDBBtn type="submit" variant="contained" color="dark"
                     className="btn-block my-3 mx-0" onClick={handleUpdate}>
                      
                      Güncelle
            </CDBBtn>
                    
                  </Form>
               )}
                
              </Formik>
              )}
            </Box>
          </Container>
    
      
    </>
  );
};

export default CustomerUpdate;
