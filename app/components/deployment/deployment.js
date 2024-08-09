import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const SiteOnTheWay = () => {
  const handleJumpIn = () => {
    window.location.href = '/';
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      padding={3}
    >
      <Typography variant="h5" mb={2} color="textPrimary">Your site is on the way!</Typography>
      <Typography variant="body1" align="center" mb={3} color="textPrimary">
        So far so good! We got your payment and we’re on it! We’re now setting up your FOREM Community.
        <br />
        Check your email for the updates. Note that normally it takes 12-24 hours.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleJumpIn}>
        Jump In
      </Button>
    </Box>
  );
};

export default SiteOnTheWay;
