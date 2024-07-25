// src/components/CenteredText.js

import React from 'react';
import { Box, Typography } from '@mui/material';

const CenteredText = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h4" component="h1" color="black">
        Get started with Forem2go today
      </Typography>
    </Box>
  );
};

export default CenteredText;
