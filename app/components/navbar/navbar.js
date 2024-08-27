import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/config';
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
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger icon import
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableTemporaryDrawer from '../sidebar/sidebar';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  const isDashboardOpen = typeof window !== 'undefined' && window.location.pathname === '/dashboard';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserEmail(user.email);
      else setUserEmail('');
    });
    return unsubscribe;
  }, []);

  const handleMenuOpen = (setAnchorEl) => (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = (setAnchorEl) => () => setAnchorEl(null);

  const handleNavigate = (url) => {
    const destination = userEmail ? url : 'signin';
    window.location.href = destination;
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

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const emailInitial = userEmail ? userEmail.charAt(0).toUpperCase() : '';

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            {isSmallScreen && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ marginRight: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <SwipeableTemporaryDrawer 
              open={isDrawerOpen} 
              onClose={handleDrawerToggle} 
              onOpen={handleDrawerToggle} 
            >
              <Box
                sx={{ width: 250, padding: 2 }}
                role="presentation"
                onClick={handleDrawerToggle}
                onKeyDown={handleDrawerToggle}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{ width: '100%', textAlign: 'left' }}
                    onClick={() => handleNavigate(page.toLowerCase())}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </SwipeableTemporaryDrawer>
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                mr: 1,
                ml: isLargeScreen ? (isDashboardOpen ? -35 : 1) : 1,
                fontFamily: 'monospace',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              Forem2go
            </Typography>
          </Box>

          {!isSmallScreen && (
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ color: '#000', fontSize: '12px', minWidth: '60px', }}
                  onClick={() => handleMenuClose(setAnchorElUser)()}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              sx={{ color: '#000', background: '#ffd740', fontSize: '11px', minWidth: '100px' ,}}
              onClick={() => handleNavigate('/sign-in')}
            >
              Live demo
            </Button>
            <Button
              sx={{ color: '#000', fontSize: '11px', minWidth: '100px', mx: 1 }}
              onClick={() => handleNavigate('initialize/domain-config')}
            >
              Get started now
            </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleMenuOpen(setAnchorElUser)} size="small">
                <Avatar sx={{ width: 30, height: 30 }}>
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
