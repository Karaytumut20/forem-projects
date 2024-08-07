import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Cube from '../cube/cube';

const RecipeReviewCard = ({ title, content, details, frontColor, topColor, rightColor }) => {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
      <CardContent>
        <Cube frontColor={frontColor} topColor={topColor} rightColor={rightColor} />
        <h2>{title}</h2>
        <Typography>{content}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* Other actions can be added here if needed */}
      </CardActions>
      <Collapse in={false} timeout="auto" unmountOnExit>
        <CardContent>
          {details.map((detail, index) => (
            <Typography paragraph key={index}>
              {detail}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default function RecipeReviewCards() {
  const cardData = [
    {
      title: 'Card 1',
      content: 'This is the content for card 1.',
      details: [
        'Detail 1 for card 1.',
        'Detail 2 for card 1.',
        'Detail 3 for card 1.'
      ],
      colors: {
        frontColor: '#4e907e',
        topColor: '#5961a7',
        rightColor: '#5961a7'
      }
    },
    {
      title: 'Card 2',
      content: 'This is the content for card 2.',
      details: [
        'Detail 1 for card 2.',
        'Detail 2 for card 2.',
        'Detail 3 for card 2.'
      ],
      colors: {
        frontColor: '#4e907e',
        topColor: '#4e907e',
        rightColor: '#5961a7'
      }
    },
    {
      title: 'Card 3',
      content: 'This is the content for card 3.',
      details: [
        'Detail 1 for card 3.',
        'Detail 2 for card 3.',
        'Detail 3 for card 3.'
      ],
      colors: {
        frontColor: '#4e907e',
        topColor: '#4e907e',
        rightColor: '#4e907e'
      }
    },
    {
      title: 'Card 4',
      content: 'This is the content for card 4.',
      details: [
        'Detail 1 for card 4.',
        'Detail 2 for card 4.',
        'Detail 3 for card 4.'
      ],
      colors: {
        frontColor: '#ea7d72',
        topColor: '#4e907e',
        rightColor: '#5961a7'
      }
    }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {cardData.map((data, index) => (
        <RecipeReviewCard
          key={index}
          title={data.title}
          content={data.content}
          details={data.details}
          frontColor={data.colors.frontColor}
          topColor={data.colors.topColor}
          rightColor={data.colors.rightColor}
        />
      ))}
    </div>
  );
}
