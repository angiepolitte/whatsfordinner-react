import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useUser } from "../context/UserContext";

function NavBar() {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log("User is logged in:", currentUser.username);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include", // important if you use cookies/session
      });

      if (response.ok) {
        setCurrentUser(null); // clear user on logout
        navigate("/login");
      } else {
        console.error("Logout failed:", response.status, response.statusText);
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

        {currentUser && ( // <-- use currentUser instead of isLoggedIn
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
