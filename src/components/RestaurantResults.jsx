import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const { currentUser } = useUser();

  useEffect(() => {
    if (currentUser) {
      console.log("User is logged in:", currentUser.username);
    }
  }, [currentUser]);

  const location = useLocation();
  const restaurants = location.state?.restaurants || [];
  const navigate = useNavigate();
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [selectedRestaurants, setSelectedRestaurants] = useState(new Set());

  useEffect(() => {
    fetch("http://localhost:8080/api/favorite-lists/all-lists", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setFavoriteLists(data))
      .catch((error) => console.error("Error fetching favorite lists:", error));
  }, []);

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
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Favorite List</InputLabel>
          <Select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
          >
            <MenuItem value="">Create a new Favorite List</MenuItem>

            {favoriteLists.map((list) => (
              <MenuItem key={list.id} value={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Card, CardContent, Typography, Grid, Button, IconButton } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { getRandomColor } from './colors'; // Import color utility

// function RestaurantResults() {
//   const location = useLocation();
//   const restaurants = location.state?.restaurants || [];
//   const navigate = useNavigate();

//   const handleRandomRestaurant = () => {
//     if (restaurants.length > 0) {
//       const randomIndex = Math.floor(Math.random() * restaurants.length);
//       const randomRestaurant = restaurants[randomIndex];
//       navigate('/random-restaurant', {
//         state: { restaurant: randomRestaurant, restaurants: restaurants },
//       });
//     }
//   };

//   const addToFavorites = async (restaurant) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/favorite-restaurants', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: restaurant.name,
//           address: restaurant.formatted_address,
//           placeId: restaurant.place_id,
//           rating: restaurant.rating,
//           favoriteListId: 1, // Change this dynamically based on user's selection
//         }),
//       });

//       if (response.ok) {
//         alert(`${restaurant.name} added to favorites!`);
//       } else {
//         alert('Failed to add restaurant to favorites.');
//       }
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
//       alert('An error occurred.');
//     }
//   };

//   if (!restaurants || restaurants.length === 0) {
//     return <Typography variant="body1">No restaurant results found.</Typography>;
//   }

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Restaurant Results:
//       </Typography>
//       <Button
//         variant="contained"
//         onClick={handleRandomRestaurant}
//         style={{ margin: '10px', backgroundColor: getRandomColor() }}
//       >
//         Random Restaurant
//       </Button>
//       <Grid container spacing={2}>
//         {restaurants.map((restaurant) => (
//           <Grid item xs={12} sm={6} md={4} key={restaurant.place_id}>
//             <Card style={{ backgroundColor: getRandomColor() }}>
//               <CardContent>
//                 <Typography variant="h6" component="div">
//                   {restaurant.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {restaurant.formatted_address}
//                 </Typography>
//                 {restaurant.rating && (
//                   <Typography variant="body2" color="text.secondary">
//                     Rating: {restaurant.rating}
//                   </Typography>
//                 )}
//                 <IconButton
//                   onClick={() => addToFavorites(restaurant)}
//                   color="error"
//                   sx={{ marginLeft: '10px' }}
//                 >
//                   <FavoriteIcon />
//                 </IconButton>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// export default RestaurantResults;

// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
// import { getRandomColor } from './colors'; // Import color utility

// function RestaurantResults() {
//   const location = useLocation();
//   const restaurants = location.state?.restaurants || [];

//   const navigate = useNavigate();

//   const handleRandomRestaurant = () => {
//     if (restaurants.length > 0) {
//       const randomIndex = Math.floor(Math.random() * restaurants.length);
//       const randomRestaurant = restaurants[randomIndex];
//       // Pass both the random restaurant and the full restaurant array
//       navigate('/random-restaurant', {
//         state: { restaurant: randomRestaurant, restaurants: restaurants },
//       });
//     }
//   };

//   if (!restaurants || restaurants.length === 0) {
//     return <Typography variant="body1">No restaurant results found.</Typography>;
//   }

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Restaurant Results:
//       </Typography>
//       <Button
//         color ="#808000"
//         variant="contained"
//         onClick={handleRandomRestaurant}
//         style={{ margin: '10px', backgroundColor: getRandomColor() }}
//       >
//         Random Restaurant
//       </Button>
//       <Grid container spacing={2}>
//         {restaurants.map((restaurant) => (
//           <Grid item xs={12} sm={6} md={4} key={restaurant.place_id}>
//             <Card style={{ backgroundColor: getRandomColor() }}>
//               <CardContent>
//                 <Typography variant="h6" component="div">
//                   {restaurant.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {restaurant.formatted_address}
//                 </Typography>
//                 {restaurant.rating && (
//                   <Typography variant="body2" color="text.secondary">
//                     Rating: {restaurant.rating}
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// export default RestaurantResults;
