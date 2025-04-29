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
