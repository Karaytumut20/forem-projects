"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../../firebase/config';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeablePermanentDrawerHome from '../sidebar-home/sidebar-home';

const ResponsiveAppBarHome = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email || '');
        localStorage.setItem('userEmail', user.email || '');
      } else {
        setUserEmail('');
        localStorage.removeItem('userEmail');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMenuOpen = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);
  
  const handleMenuClose = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleNavigate = useCallback((url) => {
    const destination = userEmail ? url : '/signin';
    window.location.href = destination;
  }, [userEmail]);

  const handleLogout = useCallback(() => {
    auth.signOut()
      .then(() => {
        setUserEmail('');
        localStorage.removeItem('userEmail');
        handleMenuClose();
        window.location.href = '/signin';
      })
      .catch((error) => console.error('Error signing out: ', error));
  }, [handleMenuClose]);

  const handleDrawerToggle = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const emailInitial = useMemo(() => (userEmail ? userEmail.charAt(0).toUpperCase() : ''), [userEmail]);

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            {isSmallScreen && (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  sx={{ marginRight: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <SwipeablePermanentDrawerHome 
                  onOpen={handleDrawerToggle}
                  onClose={handleDrawerToggle}
                  open={isDrawerOpen}
                >
                  <Box
                    sx={{ width: 250, padding: 0 }}
                    role="presentation"
                    onClick={handleDrawerToggle}
                    onKeyDown={handleDrawerToggle}
                  >
                    {/* Drawer içerik kısmı */}
                  </Box>
                </SwipeablePermanentDrawerHome>
              </>
            )}
            <Typography
      variant="h6"
      component="a"
      href="/"
      sx={{
        mr: 1,
        fontFamily: 'monospace',
        color: '#000',
        textDecoration: 'none',
        fontSize: '16px',
        marginLeft: isSmallScreen ? -5 : -2, // Ekran boyutuna göre marginLeft ayarı
      }}
    >
      Forem2go
    </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              sx={{ color: '#000', background: '#ffd740', fontSize: '11px', minWidth: '100px' }}
              onClick={() => handleNavigate('/signin')}
            >
              Live demo
            </Button>
            <Button
              sx={{ color: '#000', fontSize: '11px', minWidth: '100px' }}
              onClick={() => handleNavigate('initialize/domain-config')}
            >
              Get started now
            </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar sx={{ width: 30, height: 30, mr: 1 }}>
                  {emailInitial}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default React.memo(ResponsiveAppBarHome);
