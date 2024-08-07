import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Grid } from '@mui/material';

const AboutYourSiteForm = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');

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
    console.log("Admin Email:", adminEmail);
    console.log("Admin Password:", adminPassword);
    console.log("Community Name:", communityName);
    console.log("Community Description:", communityDescription);
    window.location.href = '/DomainDetails';
  };

  const handleGoBack = () => {
    window.location.href = '/FreeDomainForm';
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
      <Typography variant="h5" gutterBottom>
        About Your Site
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
          label="Admin Password"
          value={adminPassword}
          onChange={handleAdminPasswordChange}
          fullWidth
          margin="normal"
          type="password"
        />
        <TextField
          label="Community Name"
          value={communityName}
          onChange={handleCommunityNameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Describe your community in a sentence"
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
              Go back
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutYourSiteForm;
