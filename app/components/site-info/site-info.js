import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Grid } from '@mui/material';

const AboutYourSiteForm = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    // Aktif kullanıcı ID'sini al (örneğin, localStorage'dan)
    const currentUserID = localStorage.getItem('currentUserID'); // Kimlik doğrulama sonucu buradan gelmeli
    if (currentUserID) {
      setUserID(currentUserID);
    } else {
      // Eğer bir user ID yoksa, yönlendirme yapılabilir veya hata mesajı verilebilir
      console.warn("User ID bulunamadı.");
    }
  }, []);

  const handleAdminEmailChange = (event) => {
    setAdminEmail(event.target.value);
  };

  const handleAdminPasswordChange = (event) => {
    setAdminPassword(event.target.value);
  };

  const handleCommunityNameChange = (event) => {
    setCommunityName(event.target.value);
  };

  const handleCommunityDescriptionChange = (event) => {
    setCommunityDescription(event.target.value);
  };

  const handleContinue = () => {
    // Kullanıcı bilgilerinin depolanması
    localStorage.setItem('community_adminEmail', adminEmail);
    localStorage.setItem('community_password', adminPassword);
    localStorage.setItem('community_name', communityName);
    localStorage.setItem('community_desc', communityDescription);
    localStorage.setItem('community_paymentStatus', 'Pending');
    localStorage.setItem('community_createdDate', new Date().toISOString());

    // UserID'yi de ekle
    if (userID) {
      localStorage.setItem('community_userID', userID);
    } else {
      console.error('User ID bulunamadı, veriler tam olmayabilir.');
    }

    // Onay sayfasına yönlendirme
    window.location.href = 'confirmation';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
        padding: 3
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
        Site Hakkında
      </Typography>

      <Box
        component="form"
        sx={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <TextField
          label="Admin Email"
          value={adminEmail}
          onChange={handleAdminEmailChange}
          fullWidth
          margin="normal"
          type="email"
        />
        <TextField
          label="Admin Şifresi"
          value={adminPassword}
          onChange={handleAdminPasswordChange}
          fullWidth
          margin="normal"
          type="password"
        />
        <TextField
          label="Topluluk İsmi"
          value={communityName}
          onChange={handleCommunityNameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Topluluğunuzu bir cümleyle tanımlayın"
          value={communityDescription}
          onChange={handleCommunityDescriptionChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleGoBack}
            >
              Geri Dön
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleContinue}
            >
              Devam Et
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutYourSiteForm;
