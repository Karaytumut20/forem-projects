import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Drawer, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ResponsiveAppBar from '../navbar/navbar';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLCmASch8Tet2R1MDnt9skETz6s2ZiIY8",
  authDomain: "forem-c78dc.firebaseapp.com",
  projectId: "forem-c78dc",
  storageBucket: "forem-c78dc.appspot.com",
  messagingSenderId: "62561986265",
  appId: "1:62561986265:web:dd455856dba47ec90f00c8",
  measurementId: "G-9G3GJCB5GR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const drawerWidth = 240;

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userData, setUserData] = useState([]);

  const emailInitial = userEmail ? userEmail.charAt(0).toUpperCase() : '';

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserEmail(user.email);
          
          const userCollectionRef = collection(db, 'userTable'); // Replace 'userTable' with your actual collection name
          const querySnapshot = await getDocs(userCollectionRef);
          
          querySnapshot.forEach((doc) => {
            if (doc.data().email === user.email) {
              const userData = doc.data();
              setUserName(userData.name || '');
              setUserSurname(userData.surname || '');
              setUserData(userData);
            }
          });
        }
      });
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUserEmail('');
        window.location.href = '/signin'; // Redirect to sign-in page after logout
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f7f7f7',
            borderRight: '1px solid #ddd',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button component="a" href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: 'black' }} />
          </ListItem>
          <ListItem button component="a" href="/dashboard">
            <ListItemIcon>
              <AccountCircleIcon />
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

        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          minHeight: '100vh',
        }}
      >
        <ResponsiveAppBar />

        <Toolbar />
        <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
          Welcome to Your Dashboard
        </Typography>
        {userName && userSurname && (
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            Welcome, {userName} {userSurname}
          </Typography>
        )}

        <Box
          sx={{
            bgcolor: '#fff',
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            mt: 4,
          }}
        >
          <Typography variant="h6" sx={{ color: 'black' }}>User Information</Typography>
          <Typography variant="body1" sx={{ color: 'black' }}><strong>Name:</strong> {userName}</Typography>
          <Typography variant="body1" sx={{ color: 'black' }}><strong>Surname:</strong> {userSurname}</Typography>
          <Typography variant="body1" sx={{ color: 'black' }}><strong>Email:</strong> {userEmail}</Typography>
        </Box>

        <Typography variant="body1" sx={{ mt: 4, color: 'black' }}>
          This is your main dashboard where you can manage your Forem services, view statistics, and update your account information. Use the side menu to navigate through different sections.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 3,
            mt: 4,
          }}
        >
          <Box
            sx={{
              bgcolor: '#fff',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: 'black' }}>Total Users</Typography>
            <Typography variant="h4" sx={{ color: 'black' }}>1,234</Typography>
            <Typography variant="body2" color="textSecondary">Active Users in your Community</Typography>
          </Box>

          <Box
            sx={{
              bgcolor: '#fff',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: 'black' }}>Revenue</Typography>
            <Typography variant="h4" sx={{ color: 'black' }}>$12,345</Typography>
            <Typography variant="body2" color="textSecondary">Monthly Revenue from Subscriptions</Typography>
          </Box>

          <Box
            sx={{
              bgcolor: '#fff',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: 'black' }}>New Signups</Typography>
            <Typography variant="h4" sx={{ color: 'black' }}>56</Typography>
            <Typography variant="body2" color="textSecondary">New Users This Month</Typography>
          </Box>

          <Box
            sx={{
              bgcolor: '#fff',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: 'black' }}>Support Tickets</Typography>
            <Typography variant="h4" sx={{ color: 'black' }}>12</Typography>
            <Typography variant="body2" color="textSecondary">Pending Support Tickets</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
