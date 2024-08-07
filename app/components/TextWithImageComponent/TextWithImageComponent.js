import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

const TextWithImageComponent = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on larger screens
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1% 15%',
      textAlign: 'start',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        textAlign: 'start',
        width: { xs: '100%', md: '50%' }, // Full width on small screens
        mb: { xs: 2, md: 0 }, // Margin-bottom on small screens
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
        Get started today
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: 'black', width: { xs: '100%', md: '70%' } }}>
        Ready to launch your community? Sign up now and get your Forem platform running in minutes!
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#F76A65',
          color: 'black',
          width: '211px',
          height: '55px',
          mt: 2,
        }}
      >
        Get your form now
      </Button>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '100%', md: '50%' }, // Full width on small screens
        mt: { xs: 2, md: 0 }, // Margin-top on small screens
      }}
    >
      <Image
        src="/fotograf.png"
        alt="A descriptive alt text for the image"
        layout="responsive"
        width={600}
        height={300}
      />
    </Box>
  </Box>
);

export default TextWithImageComponent;
