import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Link } from '@mui/material';

const FooterCard = () => {
  return (
    <Card
      sx={{
        backgroundColor: '#387D6A',
        color: 'white',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <CardContent>
        <Grid container alignItems="center" marginTop={"2%"}>
          {/* Sol Tarafta Forem2go */}
          <Grid item xs={6}>
            <Typography variant="h6">Forem2go</Typography>
          </Grid>
          {/* Sağ Tarafta Diğer Öğeler */}
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end" flexWrap="wrap">
              <Link href="#" color="inherit" underline="none">
                <Typography variant="body2" sx={{ marginRight: 2 }}>Home</Typography>
              </Link>
              <Link href="#" color="inherit" underline="none">
                <Typography variant="body2" sx={{ marginRight: 2 }}>Pricing</Typography>
              </Link>
              <Link href="#" color="inherit" underline="none">
                <Typography variant="body2" sx={{ marginRight: 2 }}>Features</Typography>
              </Link>
              <Link href="#" color="inherit" underline="none">
                <Typography variant="body2" sx={{ marginRight: 2 }}>Set up</Typography>
              </Link>
              <Link href="#" color="inherit" underline="none">
                <Typography variant="body2" sx={{ marginRight: 2 }}>Users say</Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
        {/* Alt Kısımda Merkezde Hizalanmış "© 2024. All rights reserved" */}
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2">© 2024. All rights reserved</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FooterCard;
