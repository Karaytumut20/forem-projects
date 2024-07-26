import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Grid, List, ListItem } from '@mui/material';

const pricingOptions = [
  {
    title: "Basic",
    price: "$59 per month",
    description: "Ideal for small communities",
    features: [
      "Unlimited members",
      "Unlimited staff",
      "50k monthly pageviews",
      "community.hellokars.org domain"
    ]
  },
  {
    title: "Middle",
    price: "$79 per month",
    description: "Perfect for growing communities with more advanced needs",
    features: [
      "Unlimited members",
      "Unlimited staff",
      "50k monthly pageviews",
      "community.hellokars.org domain"
    ]
  },
  {
    title: "Pro",
    price: "$109 per month",
    description: "Customized solutions for large-scale communities",
    features: [
      "Unlimited members",
      "Unlimited staff",
      "50k monthly pageviews",
      "community.hellokars.org domain"
    ]
  },
];

function CardComp() {
  return (
    <>
      {pricingOptions.map((option, index) => (
        <Grid item key={index}>
          <Card elevation={0} style={{  width: '400px', textAlign: 'left', color: "black" }}>
            <CardContent>
              <Typography variant="h4" component="div" style={{ fontWeight: 'bold', fontSize: '32px', marginBottom: '10px' ,textAlign:"center",margin: '10px'}}>
                {option.title}
              </Typography>
              <Typography variant="h1" color="textSecondary" style={{ fontWeight: 'bold', fontSize: '50px', color: "black", marginBottom: '10px' }}>
                {option.price}
              </Typography>
              <Typography variant="body1" component="p" style={{ fontWeight: 'bold', fontSize: '1rem', margin: '20px 0px' }}>
                {option.description}
              </Typography>
              <List style={{ paddingLeft: '0' }}>
                {option.features.map((feature, featureIndex) => (
                  <ListItem key={featureIndex} style={{ padding: '0', marginBottom: '10px', display: 'list-item' }}>
                  •  {feature}
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions style={{ justifyContent: 'center', padding: '16px' }}>
              <Button size="small" variant="contained" style={{ backgroundColor: 'black', color: '#fff', width: "195px", height: "46px", borderRadius: "10px" }}>
                Buy Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}

export default CardComp;
