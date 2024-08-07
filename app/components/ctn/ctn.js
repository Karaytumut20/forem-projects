import * as React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

function InfoWithButton() {
  return (
    <Box sx={{ background: 'white', padding: 3 }}>
      <Grid container spacing={4.5} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              padding: 3,
              borderRadius: '15px',
              background: '#4D917F',
              textAlign: 'center',
              color: 'white',
              marginTop: { xs: '0%', md: '-20%' }, // Responsive marginTop
              zIndex: 1,
              position: 'relative',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
              All Forem2go plans include
            </Typography>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', textAlign: 'left' }}>
              {[
                'FREE full weekly update',
                'Unlimited server migrations',
                'Full root access',
                'FREE 24/7 fully managed support',
                'Ultra-fast NVMe storage',
                'Optional control panels available',
                'Highest quality servers by Dell®',
                '100% uptime SLA with 10x money back',
              ].map((text, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <Typography variant="body1" gutterBottom>
                    {text}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              padding: 1,
              borderRadius: '15px',
              textAlign: 'start',
              zIndex: 2,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography
              gutterBottom
              sx={{ color: 'black', marginBottom: 2, fontWeight: 'bold', fontSize: '40px' }}
            >
              World's only hosted and managed solution for Forem
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black', marginBottom: 2 }}>
              Launch your community platform effortlessly and leave the technical worries to us
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#F76A65',
                width: '200px',
                height: '50px',
                color: 'black',
                textAlign: 'center',
                '&:hover': {
                  backgroundColor: '#e65a4f', // Optional: Darker shade on hover
                },
              }}
            >
              Get your form now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default InfoWithButton;
