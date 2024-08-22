import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ResponsiveAppBar from '../navbar/navbar';
import SwipeableTemporaryDrawer from '../sidebar/sidebar';
import './dashboard.css';

// Firebase configuration
const firebaseConfig = {
  // Firebase Config Here
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserEmail(user.email);
          
          const userCollectionRef = collection(db, 'userTable');
          const querySnapshot = await getDocs(userCollectionRef);
          
          querySnapshot.forEach((doc) => {
            if (doc.data().email === user.email) {
              const userData = doc.data();
              setUserName(userData.name || '');
              setUserSurname(userData.surname || '');
            }
          });
        }
        setLoading(false); // Stop loading when data is fetched
      });
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUserEmail('');
        window.location.href = '/signin';
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 0,
          ml: { xs: 0, lg: 35 },
        }}
      >
        <ResponsiveAppBar />
        <SwipeableTemporaryDrawer />
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
              gap: 3,
            maxWidth:450,
            
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
