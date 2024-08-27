import * as React from 'react';
import { useEffect, useState } from 'react';
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

const pages = ['Products', 'Pricing', 'Blog'];

export default function SwipeableTemporaryDrawer() {
  const drawerWidth = 250;

  const [state, setState] = useState({ left: false });
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      if (isLarge && currentPath !== '/dashboard') {
        setState({ left: false });
      } else if (isLarge && currentPath === '/dashboard') {
        setState({ left: true });
      } else {
        setState({ left: false });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPath]);

  useEffect(() => {
    const { pathname } = window.location;
    setCurrentPath(pathname);
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Handle logout logic here
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* Dashboard sayfasında büyük ekranda Pages hariç diğer menüler görünecek */}
        {currentPath === '/dashboard' && isLargeScreen && (
          <>
            <ListItem
              button
              component="a"
              href="/home"
              sx={{
                backgroundColor: currentPath === '/home' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                color: currentPath === '/home' ? 'blue' : 'black',
                borderRadius: currentPath === '/home' ? '10px' : '0',
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: currentPath === '/home' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="/dashboard"
              sx={{
                backgroundColor: currentPath === '/dashboard' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                color: currentPath === '/dashboard' ? 'blue' : 'black',
                borderRadius: currentPath === '/dashboard' ? '10px' : '0',
              }}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: currentPath === '/dashboard' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="/profile"
              sx={{
                backgroundColor: currentPath === '/profile' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                color: currentPath === '/profile' ? 'blue' : 'black',
                borderRadius: currentPath === '/profile' ? '10px' : '0',
              }}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: currentPath === '/profile' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="/settings"
              sx={{
                backgroundColor: currentPath === '/settings' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                color: currentPath === '/settings' ? 'blue' : 'black',
                borderRadius: currentPath === '/settings' ? '10px' : '0',
              }}
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: currentPath === '/settings' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: 'black' }} />
            </ListItem>
          </>
        )}

        {/* Dashboard sayfasında küçük ekranda Pages dahil tüm menüler görünecek */}
        {currentPath === '/dashboard' && !isLargeScreen && (
          <>
            <ListItem
              button
              component="a"
              href="/home"
              sx={{
                backgroundColor: currentPath === '/home' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                color: currentPath === '/home' ? 'blue' : 'black',
                borderRadius: currentPath === '/home' ? '10px' : '0',
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: currentPath === '/home' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="/dashboard"
              sx={{
                backgroundColor: currentPath === '/dashboard' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                color: currentPath === '/dashboard' ? 'blue' : 'black',
                borderRadius: currentPath === '/dashboard' ? '10px' : '0',
              }}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: currentPath === '/dashboard' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="/profile"
              sx={{
                backgroundColor: currentPath === '/profile' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                color: currentPath === '/profile' ? 'blue' : 'black',
                borderRadius: currentPath === '/profile' ? '10px' : '0',
              }}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: currentPath === '/profile' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="/settings"
              sx={{
                backgroundColor: currentPath === '/settings' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                color: currentPath === '/settings' ? 'blue' : 'black',
                borderRadius: currentPath === '/settings' ? '10px' : '0',
              }}
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: currentPath === '/settings' ? 'blue' : 'black' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: 'black' }} />
            </ListItem>

            {pages.map((page) => (
              <ListItem
                button
                key={page}
                component="a"
                href={`/${page.toLowerCase()}`}
                sx={{
                  backgroundColor: currentPath === `/${page.toLowerCase()}` ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  color: currentPath === `/${page.toLowerCase()}` ? 'blue' : 'black',
                  borderRadius: currentPath === `/${page.toLowerCase()}` ? '10px' : '0',
                }}
              >
                <ListItemText primary={page} />
              </ListItem>
            ))}
          </>
        )}

        {/* Diğer sayfalarda sadece Pages görünecek */}
        {currentPath !== '/dashboard' && pages.map((page) => (
          <ListItem
            button
            key={page}
            component="a"
            href={`/${page.toLowerCase()}`}
            sx={{
              backgroundColor: currentPath === `/${page.toLowerCase()}` ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              color: currentPath === `/${page.toLowerCase()}` ? 'blue' : 'black',
              borderRadius: currentPath === `/${page.toLowerCase()}` ? '10px' : '0',
            }}
          >
            <ListItemText primary={page} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar sadece Dashboard'da büyük ekranda gösterilir */}
      {(!isLargeScreen || currentPath === '/dashboard') && (
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
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isLargeScreen && currentPath === '/dashboard' ? `${drawerWidth}px` : 0,
          padding: 0,
        }}
      >
        {/* Hamburger ikonunu sadece küçük ekranda göster */}
        {!isLargeScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer('left', true)}
            sx={{ mr: 0, p: 0 }}
          >
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
