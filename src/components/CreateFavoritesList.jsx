import { useState } from "react";

const CreateFavoriteList = ({ userId, onListCreated }) => {
  const [listName, setListName] = useState("");
  const [error, setError] = useState(null);

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!listName.trim()) return;

    try {
      const response = await fetch(
        "http://localhost:8080/api/favorite-lists/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: listName, user: { id: userId } }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create list. Please try again.");
      }

      const data = await response.json();
      onListCreated(data); // Notify parent component
      setListName(""); // Reset input field
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      console.error("Error creating favorite list:", err);
    }
  };

  return (
    <div>
      <h3>Create a New Favorite List</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleCreateList}>
        <input
          type="text"
          placeholder="Enter list name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
        <button type="submit">Create List</button>
      </form>
    </div>
  );
};

export default CreateFavoriteList;
