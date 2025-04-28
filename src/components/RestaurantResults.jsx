import React, { useState, useEffect } from "react";
import { useInRouterContext, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getRandomColor } from "./colors";
import CreateFavoriteList from "./CreateFavoritesList";
import { useUser } from "../context/UserContext";

function RestaurantResults() {
  const { currentUser } = useUser() || {};
  const userId = currentUser?.id;

  const location = useLocation();
  const restaurants = location.state?.restaurants || [];
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState("");
  const [selectedRestaurants, setSelectedRestaurants] = useState(new Set());

  const handleRandomRestaurant = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      const randomRestaurant = restaurants[randomIndex];
      navigate("/random-restaurant", {
        state: { restaurant: randomRestaurant, restaurants: restaurants },
      });
    }
  };

  const toggleFavorite = (placeId) => {
    setSelectedRestaurants((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(placeId)) {
        newSelected.delete(placeId);
      } else {
        newSelected.add(placeId);
      }
      return newSelected;
    });
  };

  const handleAddToFavorites = async () => {
    if (!selectedList) {
      alert("Please select a favorite list.");
      return;
    }

    const selectedRestaurantsArray = restaurants.filter((r) =>
      selectedRestaurants.has(r.place_id)
    );
    for (const restaurant of selectedRestaurantsArray) {
      try {
        await fetch("http://localhost:8080/api/favorite-restaurants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: restaurant.name,
            address: restaurant.formatted_address,
            placeId: restaurant.place_id,
            rating: restaurant.rating,
            favoriteListId: selectedList,
          }),
        });
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
    alert("Selected restaurants added to favorites!");
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Restaurant Results:
      </Typography>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <Button
          variant="contained"
          onClick={handleRandomRestaurant}
          style={{ backgroundColor: getRandomColor() }}
        >
          Random Restaurant
        </Button>
        <CreateFavoriteList
          userId={userId}
          onListCreated={(newList) => setSelectedList(newList.id)}
          onListSelected={(id) => setSelectedList(id)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddToFavorites}
        >
          Add to Favorites
        </Button>
      </div>
      <Grid container spacing={2}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.place_id}>
            <Card style={{ backgroundColor: getRandomColor() }}>
              <CardContent>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.formatted_address}
                </Typography>
                {restaurant.rating && (
                  <Typography variant="body2" color="text.secondary">
                    Rating: {restaurant.rating}
                  </Typography>
                )}
                <IconButton
                  onClick={() => toggleFavorite(restaurant.place_id)}
                  color="error"
                >
                  {selectedRestaurants.has(restaurant.place_id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default RestaurantResults;
