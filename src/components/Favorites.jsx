import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

function Favorites() {
  const [favoriteLists, setFavoriteLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch favorite lists from backend
    fetch('http://localhost:8080/api/favorite-lists')
      .then((response) => response.json())
      .then((data) => setFavoriteLists(data))
      .catch((error) => console.error('Error fetching favorite lists:', error));
  }, []);

  const handleViewList = (listId) => {
    navigate(`/favorites/${listId}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Favorite Lists
      </Typography>
      <Grid container spacing={2}>
        {favoriteLists.map((list) => (
          <Grid item xs={12} sm={6} md={4} key={list.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{list.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewList(list.id)}
                >
                  View Restaurants
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Favorites;
