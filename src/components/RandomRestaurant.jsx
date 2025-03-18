import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Container, Button, Box } from '@mui/material';
import { getRandomColor } from './colors';

function RandomRestaurant() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleStartOver = () => {
    navigate('/restaurant-search'); // Navigate back to the first page (RestaurantSearch)
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
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button
          color ="#808000"
          variant="contained"
          onClick={handleChooseAgain}
          style={{ marginRight: '10px', backgroundColor: getRandomColor() }}
        >
          Choose Again
        </Button>
        <Button
          color ="#808000"
          variant="contained"
          onClick={handleStartOver}
          style={{ backgroundColor: getRandomColor() }}
        >
          Start Over
        </Button>
      </Box>
    </Container>
  );
}

export default RandomRestaurant;