import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { getRandomColor } from './colors'; // Import color utility

function RestaurantResults() {
  const location = useLocation();
  const restaurants = location.state?.restaurants || [];
  const navigate = useNavigate();

  const handleRandomRestaurant = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      const randomRestaurant = restaurants[randomIndex];
      // Pass both the random restaurant and the full restaurant array
      navigate('/random-restaurant', {
        state: { restaurant: randomRestaurant, restaurants: restaurants },
      });
    }
  };

  if (!restaurants || restaurants.length === 0) {
    return <Typography variant="body1">No restaurant results found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Restaurant Results:
      </Typography>
      <Button
        color ="#808000"
        variant="contained"
        onClick={handleRandomRestaurant}
        style={{ margin: '10px', backgroundColor: getRandomColor() }}
      >
        Random Restaurant
      </Button>
      <Grid container spacing={2}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.place_id}>
            <Card style={{ backgroundColor: getRandomColor() }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.formatted_address}
                </Typography>
                {restaurant.rating && (
                  <Typography variant="body2" color="text.secondary">
                    Rating: {restaurant.rating}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default RestaurantResults;