import * as React from 'react';
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
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger ikonu için
import { useEffect, useState } from 'react';

const pages = ['Products', 'Pricing', 'Blog'];

export default function SwipeableTemporaryDrawer() {
  const drawerWidth = 250; // Çekmece genişliği

  const [state, setState] = useState({ left: false });
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';

    if (isBrowser) {
      const handleResize = () => {
        const isLarge = window.innerWidth >= 1024;
        setIsLargeScreen(isLarge);
        if (isLarge) {
          setState({ left: true });
        } else {
          setState({ left: false });
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // initial check

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (!isLargeScreen) {
      setState({ ...state, [anchor]: open });
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component="a" href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ color: 'black' }} />
        </ListItem>

        {isLargeScreen
          ? null
          : pages.map((page) => (
              <ListItem button key={page} component="a" href={`/${page.toLowerCase()}`}>
                <ListItemText primary={page} sx={{ color: 'black' }} />
              </ListItem>
            ))}

        <ListItem button component="a" href="/dashboard">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: 'black' }} />
        </ListItem>
        <ListItem button component="a" href="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{ color: 'black' }} />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: 'black' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
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
         onClick={toggleDrawer('left', true)}
         sx={{ mr: 0, p: 0 }}  // Margin ve padding değerlerini sıfır yapıyoruz.
       >
         <MenuIcon sx={{ color: 'black' }} />
       </IconButton>
       
        )}
      </Box>
    </Box>
  );
}
