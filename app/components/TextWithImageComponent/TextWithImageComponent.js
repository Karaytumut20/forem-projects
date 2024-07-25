import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const TextWithImageComponent = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }, // Ekran küçüldüğünde column, büyük ekranlarda row
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
        width: { xs: '100%', md: '50%' }, // Ekran küçüldüğünde tam genişlik
        mb: { xs: 2, md: 0 }, // Küçük ekranlarda alt boşluk
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2, color: 'black' }}>
        Get started today
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2, color: 'black', width: { xs: '100%', md: '70%' } }}>
        Ready to launch your community? Sign up now and get your Forem platform running in minutes!
      </Typography>
      <Button
        style={{
          background: "#F76A65",
          border: "none",
          display: "flex",
          width: "211px",
          height: "55px",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "black",
          marginTop: "20px",
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
        width: { xs: '100%', md: '50%' }, // Ekran küçüldüğünde tam genişlik
        mt: { xs: 2, md: 0 }, // Küçük ekranlarda üst boşluk
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
