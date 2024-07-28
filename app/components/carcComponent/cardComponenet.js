import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const CardComponent = ({ content, author }) => (
  <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 'none' }}>
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormatQuoteIcon sx={{ fontSize: 50, color: 'black', transform: 'rotate(180deg)' }} />
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, color: 'black', margin: '10px 0px' }}>
          {content}
        </Typography>
      </Box>
      <Typography variant="h4" color="text.primary" sx={{ marginTop: 2, fontWeight: 'bold', marginTop: '50px' }}>
        {author}
      </Typography>
    </CardContent>
  </Card>
);

const CardComponentContainer = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: { xs: 0, sm: 10 } }}>
      <Grid container spacing={{ xs: 0, sm: 12 }} >
        <Grid item xs={6} sm={6} md={3}>
          <CardComponent 
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
            author="Yazar 1" 
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CardComponent 
            content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            author="Yazar 2" 
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CardComponent 
            content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." 
            author="Yazar 3" 
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CardComponent 
            content="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." 
            author="Yazar 4" 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardComponentContainer;
  