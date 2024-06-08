
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer, CDBBox } from "cdbreact";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/authActions';
import { loginFailure } from '../../actions/authActions';
import { loginRequest } from '../../api/axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { alignProperty } from "@mui/material/styles/cssUtils";


const defaultTheme = createTheme();



const Forms = () => {


  const loggedInUser = localStorage.getItem('loggedInUser');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (loggedInUser) {
    const { username, passwordLocal } = JSON.parse(loggedInUser);
    if(email == '' && password === ''){
      setEmail(username)
      setPassword(passwordLocal)
    }
   
  }
   
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(loggedInUser);
        setEmail(storedEmail);
        setPassword(storedPassword);
      }
    }, []);

    
  const handleSubmit = async (event) => {
    event.preventDefault();
    loginRequest(email, password)
    .then((data) => {
        if (data.status === 'Error') {
            Swal.fire({
                position: "center",
                icon: "error",
                title: data.errorMessage,
                showConfirmButton: false,
                timer: 1500
              });
         } 
         else{
            const token = data?.data;
            dispatch(loginSuccess(token));
            if(rememberMe){
              localStorage.setItem('loggedInUser', JSON.stringify({ email, password }));
            }
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Giriş Başarılı",
              showConfirmButton: true,
            }).then((result) => {      
                if (result.isConfirmed) {
                 
               
                    navigate('/');
                }
              });
         }     
      
    })
    .catch((error) => {
      console.error('Login error:', error);
      dispatch(loginFailure('Login failed. Please try again.'));
    });
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };
  return (
    <>

<ThemeProvider theme={defaultTheme}>
      <CDBContainer
        style={{
          width: "40%",
          marginTop: "6rem",
          marginLeft: "30%",
          background: "black",
          boxShadow: "0px -1px 5px black",
          color: "#e7c818"
        }}
      >
        <CDBCard
          style={{
            width: "30rem",
            background: "black",
            border: "0.1px solid black",
            color: "#e7c818",
          }}
        >
          <CDBCardBody className="mx-4">
            <div
              style={{
                border: "1px solid #e7c818",
                boxShadow: "1px 1px 6px 5px #e7c818",
              }}
              className="text-center mt-4 mb-2"
            >
              <p className="h4">Yetkili Giriş</p>
            </div>{" "}
            <br />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <div className="form-flex-row mb-n4">
              <div className="col">
              
                <CDBInput
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChangeEmail}
                  material
                  hint="First name"
                  type="text"
                  style={{
                    background: "black",
                    color: "#e7c818",
                    boxShadow: "0px -1px 5px #e7c818",
                  }}
                  placeholder="Email Adresi / Kullanıcı Adı"
                />
              </div>
              <div className="col">
                <CDBInput
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangePassword}
                  material
                  hint="Password"
                  
                  style={{
                    background: "black",
                    color: "#e7c818",
                    boxShadow: "0px -1px 5px #e7c818",
                  }}
                  placeholder="Parola"
                />
              </div> <br />
              <FormControlLabel 
                control={<Checkbox
                  value="remember" color="primary" />} 
                label="Beni Hatırla"
                onChange={handleChangeRememberMe}
              />
            </div>
            
            
            <CDBBtn color="dark" className="btn-block my-3 mx-0"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Yetkili Giriş
              </CDBBtn>
            </Box>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      </ThemeProvider>
    </>
  );
};
export default Forms;
