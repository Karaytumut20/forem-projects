import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const cards = [
  { title: 'Hassle-Free Installation', description: 'This is the description for card 1. This description is longer to provide more details about the content of the card and its purpose.' },
  { title: 'Hassle-Free Installation', description: 'This is the description for card 2. It contains additional information to give the reader a better understanding of what this card is about.' },
  { title: 'Hassle-Free Installation', description: 'This is the description for card 3. The description is extended to showcase more text and provide a comprehensive overview of the card\'s content.' },
  { title: 'Hassle-Free Installation', description: 'This is the description for card 4. A longer description helps in giving more context and clarity about the card\'s topic and its relevance.' },
  { title: 'Hassle-Free Installation', description: 'This is the description for card 5. Including a more detailed description ensures that the card\'s content is well understood by the viewer.' },
  { title: 'Hassle-Free Installation', description: 'This is the description for card 6. By extending the description, we can provide more insights and a better explanation of what the card represents.' },
  { title: 'Hassle-Free Installation', description: 'This is the description for card 7. The extended description offers a more thorough understanding of the card\'s content and purpose.' },
  { title: 'Hassle-Free Installation', description: 'This is the description for card 8. A detailed description gives a clearer picture of the card\'s intent and what it aims to convey.' }
];

const CardGrid = () => {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {cards.map((card, index) => (
        <Grid item xs={5} sm={6} md={3} key={index} container justifyContent="center">
          <Card sx={{ height: "300px", width: '200px', boxShadow: 'none',}}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
