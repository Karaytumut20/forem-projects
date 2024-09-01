import React, { useState } from 'react';
import { Box, CssBaseline, Typography, Button, TextField, Grid, Paper } from '@mui/material';

const Settings = () => {
  const [userEmail, setUserEmail] = useState(''); // Varsayılan değerler örnek olarak boş
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [loading, setLoading] = useState(false); // Yükleme durumu başlangıçta false

  const handleLogout = () => {
    // Çıkış işlemi simülasyonu
    setUserEmail('');
    window.location.href = '/signin';
  };

  const handleSaveChanges = () => {
    // Değişiklikleri kaydetme işlemi simülasyonu
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Changes saved successfully!');
    }, 1000);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CssBaseline />
      <Paper
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'black', textAlign: 'center' }}>
          Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              value={userSurname}
              onChange={(e) => setUserSurname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
