import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Container, Button } from '@mui/material';
import { getRandomColor } from './Colors';

function RandomRestaurant() {
  const location = useLocation();
  const restaurants = location.state?.restaurants || [];
  const [randomRestaurant, setRandomRestaurant] = useState(null);

  useEffect(() => {
    selectRandom();
  }, [restaurants]);

  const selectRandom = () => {
    if (restaurants && restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setRandomRestaurant(restaurants[randomIndex]);
    }
  };

  const handleChooseAgain = () => {
    selectRandom();
  };

  if (!randomRestaurant) {
    return <Typography variant="body1">No restaurant selected.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Card style={{ marginTop: '20px', backgroundColor: getRandomColor() }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {randomRestaurant.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {randomRestaurant.formatted_address}
          </Typography>
          {randomRestaurant.rating && (
            <Typography variant="body1" color="text.secondary">
              Rating: {randomRestaurant.rating}
            </Typography>
          )}
        </CardContent>
      </Card>
      <Button
        variant="contained"
        onClick={handleChooseAgain}
        style={{ marginTop: '20px', backgroundColor: getRandomColor() }}
      >
        Choose Again
      </Button>
    </Container>
  );
}

export default RandomRestaurant;