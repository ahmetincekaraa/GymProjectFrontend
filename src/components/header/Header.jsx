import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import FNX from '../varlıklar/fnx.ico'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Ana sayfaya yönlendir
    handleCloseUserMenu(); // Menüyü kapat
  };

  return (
    <>
      <AppBar className='AppBar' position="static" sx={{backgroundColor:'black', boxShadow:'5px 5px 30px 5px black ', width:'100%', paddingLeft:'30%',borderRadius:'0.5rem' }}>
        <Container maxWidth="xl" >
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {/* Menü öğeleri */}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,ml: 1,marginLeft:"-10rem",
                display: { xs: 'flex', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontSize: '2.5rem',
                fontWeight: 700,
                letterSpacing: '.3rem',
                background:'black',
                color: '#e7c818',
                textDecoration: 'none',
                boxShadow:'-3.5px 3px 3.5px 1px #e7c818', borderRadius:'1rem 0rem 0rem 1rem'
              }}
            >
            FNX GYM CENTER 
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="FNX GYM">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={FNX}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!isLoggedIn ? (
                  <Link to='/Login'>
                    <MenuItem sx={{background:'#e7c818', color:'black', boxShadow:'5px 2px 10px 10px black'}} key="login" onClick={handleCloseUserMenu}>
                      <Typography  textAlign="center">Yetkili Giriş</Typography>
                    </MenuItem>
                  </Link>
                ) : (
                  <MenuItem sx={{background:'#e7c818', color:'black', boxShadow:'5px 2px 10px 10px black'}} key="logout" onClick={handleLogout}>
                    <Typography  textAlign="center">Çıkış Yap</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
