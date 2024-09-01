import React, { useState } from 'react';
import { Box, CssBaseline, Typography, Button } from '@mui/material';

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [loading, setLoading] = useState(false); // Veri çekme işlemi olmadığından başlangıçta false

  const handleLogout = () => {
    // Çıkış işlemi simülasyonu
    setUserEmail('');
    window.location.href = '/signin';
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'black', mt: 2 }}>
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
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" sx={{ color: 'black' }}>User Information</Typography>
          <Typography variant="body1" sx={{ color: 'black' }}><strong>Name:</strong> {userName}</Typography>
          <Typography variant="body1" sx={{ color: 'black' }}><strong>Surname:</strong> {userSurname}</Typography>
          <Typography variant="body1" sx={{ color: 'black' }}><strong>Email:</strong> {userEmail}</Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
