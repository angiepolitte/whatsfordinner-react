import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import axios from "axios"; // Import axios

function NavBar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout"
      );

      if (response.status === 200) {
        onLogout();
        navigate("/");
      } else {
        console.error("Logout failed:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#463f3a" }}>
      <Toolbar
        sx={{
          minHeight: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Can't Decide on What's For Dinner?</Typography>
        {isLoggedIn && (
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button color="inherit" onClick={() => navigate("/favorites")}>
              View Favorites
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/restaurant-search")}
            >
              Search Locations
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
