import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { FormControl, Select, MenuItem } from "@mui/material";

const CreateFavoriteList = ({ onListCreated, onListSelected }) => {
  const { currentUser } = useUser() || {};
  console.log("currentUser:", currentUser);
  const userId = currentUser?.id;

  const [listName, setListName] = useState("");
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/favorite-lists/user/${userId}`,
          { withCredentials: true }
        );
        setFavoriteLists(response.data);
      } catch (err) {
        console.error("Error fetching favorite lists:", err);
        setError("Failed to fetch favorite lists.");
      }
    };

    if (userId) {
      fetchFavoriteLists();
    }
  }, [userId]);

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!listName.trim()) return;
    if (!userId) {
      console.error("User ID is missing");
      setError("User is not authenticated.");
      setListName("");
      return;
    }

    console.log("Creating list for userId:", userId);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/favorite-lists/create",
        { name: listName, userId: userId }, // Include userId in the request body
        { withCredentials: true }
      );

      const newList = response.data;
      setFavoriteLists((prevLists) => [...prevLists, newList]);
      setSelectedList(newList.id); // Auto-select the newly created list
      setListName("");
      setError(null);

      if (onListSelected) {
        onListSelected(newList.id); // Notify parent
      }
      if (onListCreated) {
        onListCreated(newList); // (Optional) Also notify parent a list was created
      }
    } catch (err) {
      console.error("Error creating favorite list:", err);
      setError("Failed to create list. Please try again.");
    }
  };

  const handleSelectChange = (e) => {
    const listId = e.target.value;
    setSelectedList(listId);

    if (onListSelected) {
      onListSelected(listId);
    }
  };

  return (
    <div>
      <FormControl style={{ minWidth: 200 }}>
        <Select
          labelId="favorite-list-label"
          value={selectedList}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>-- Select a Favorite List --</em>
          </MenuItem>
          {favoriteLists.map((list) => (
            <MenuItem key={list.id} value={list.id}>
              {list.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <form onSubmit={handleCreateList} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="New list name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Create List
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateFavoriteList;
