"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SwipeablePermanentDrawer() {
  const [drawerWidth] = useState(250);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Toggle drawer state
  const toggleDrawer = (isOpen) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  // Handle user logout action
  const handleLogout = () => {
    console.log('User logged out');
    // Handle logout logic here
  };

  // Drawer list content
  const list = () => (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={isMobile ? toggleDrawer(false) : undefined} // Sadece mobilde kapatmak için
      onKeyDown={isMobile ? toggleDrawer(false) : undefined} // Sadece mobilde kapatmak için
    >
      <List>
        <ListItem
          button
          component="a"
          href="/"
          sx={{ backgroundColor: pathname === '/' ? '#f0f0f0' : 'transparent' }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          component="a"
          href="/dashboard"
          sx={{ backgroundColor: pathname === '/dashboard' ? '#f0f0f0' : 'transparent' }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          component="a"
          href="/profile"
          sx={{ backgroundColor: pathname === '/profile' ? '#f0f0f0' : 'transparent' }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem
          button
          component="a"
          href="/settings"
          sx={{ backgroundColor: pathname === '/settings' ? '#f0f0f0' : 'transparent' }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {!isMobile && (
        <SwipeableDrawer
          anchor="left"
          open={true}
          variant="permanent" // Büyük ekranlarda sürekli açık
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
        >
          {list()}
        </SwipeableDrawer>
      )}

      {isMobile && (
        <>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ marginLeft: -15 }} />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)} // Drawer'ı kapatmak için
            onOpen={toggleDrawer(true)}  // Drawer'ı açmak için
            variant="temporary" // Mobilde geçici olarak açılır/kapanır
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
          >
            {list()}
          </SwipeableDrawer>
        </>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          padding: 0,
        }}
      />
    </Box>
  );
}
