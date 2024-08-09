"use client";
import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';

const DomainDetails = () => {
  const handleContinue = () => {
    window.location.href = 'checkout';
  };

  const handleGoBack = () => {
    window.location.href = 'site-info';
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
        You are almost done
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ color: 'black' }}>
        You’ll be forwarded to the Stripe page to continue with payment.
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 3
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleGoBack}
          sx={{ flex: 1, marginRight: 1 }}
        >
          Go back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          sx={{ flex: 1, marginLeft: 1 }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default DomainDetails;
