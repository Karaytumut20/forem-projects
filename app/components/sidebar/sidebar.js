import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
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
import { usePathname } from 'next/navigation'; // Use usePathname

export default function SwipeableTemporaryDrawer() {
  const [drawerWidth, setDrawerWidth] = useState(250);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false); // Initialize with a default value

  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      setDrawerWidth(isLarge ? 250 : 200);
      setDrawerOpen(isLarge);
    };

    // Check on component mount
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const toggleDrawer = useCallback((open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  }, []);

  const handleLogout = () => {
    console.log('User logged out');
    // Implement your logout functionality here
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          button
          component="a"
          href="/"
          sx={{ backgroundColor: pathname === '/' ? '#f0f0f0' : 'transparent' }} // Active state styling
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
          sx={{ backgroundColor: pathname === '/dashboard' ? '#f0f0f0' : 'transparent' }} // Active state styling
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
          sx={{ backgroundColor: pathname === '/profile' ? '#f0f0f0' : 'transparent' }} // Active state styling
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
          sx={{ backgroundColor: pathname === '/settings' ? '#f0f0f0' : 'transparent' }} // Active state styling
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
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={isLargeScreen ? undefined : toggleDrawer(false)}
        onOpen={isLargeScreen ? undefined : toggleDrawer(true)}
        variant={isLargeScreen ? 'persistent' : 'temporary'}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        {list('left')}
      </SwipeableDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isLargeScreen ? `${drawerWidth}px` : 0,
          padding: 0,
        }}
      >
        {!isLargeScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ ml: -7.7, p: 0 }}
          >
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
