import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/config'; // Adjust the import path as needed
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserEmail(user.email);
      else setUserEmail('');
    });
    return unsubscribe;
  }, []);

  const handleMenuOpen = (setAnchorEl) => (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = (setAnchorEl) => () => setAnchorEl(null);

  const handleNavigate = () => {
    const url = userEmail ? 'initialize/domain-config' : 'signin';
    window.location.href = url;
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUserEmail('');
        handleMenuClose(setAnchorElUser)();
        window.location.href = '/signin';
      })
      .catch((error) => console.error('Error signing out: ', error));
  };

  const emailInitial = userEmail ? userEmail.charAt(0).toUpperCase() : '';

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffff', boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ flexDirection: isSmallScreen ? 'column' : 'row', alignItems: 'center', py: 1 }}>
          
          {/* İlk Satır: Forem2go ve Sayfa Linkleri */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              mb: isSmallScreen ? 1 : 0,
            }}
          >
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              Forem2go
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ color: '#000', mx: 1, fontSize: '12px', minWidth: '60px' }}
                  onClick={() => handleMenuClose(setAnchorElUser)()}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>

          {/* İkinci Satır (Sadece küçük ekranlar için): Avatar ve Butonlar */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: isSmallScreen ? 'center' : 'flex-end',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'row',
            }}
          >
            <Button
              sx={{ color: '#000', background: '#ffd740', mx: 1, fontSize: '11px', minWidth: '100px' }}
              onClick={() => handleNavigate('/sign-in')}
            >
              Live demo
            </Button>
            <Button
              sx={{ color: '#000', mx: 1, fontSize: '11px', minWidth: '100px' }}
              onClick={handleNavigate}
            >
              Get started now
            </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleMenuOpen(setAnchorElUser)} sx={{ p: 0, ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {emailInitial}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElUser)}
            onClose={handleMenuClose(setAnchorElUser)}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  if (setting === 'Logout') handleLogout();
                  else if (setting === 'Dashboard') window.location.href = '/dashboard';
                  handleMenuClose(setAnchorElUser)();
                }}
              >
                <Typography sx={{ color: '#000', fontSize: '14px' }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
