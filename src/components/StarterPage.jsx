import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

function StarterPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/check", {
        withCredentials: true, // Include session cookie
      })
      .then((res) => {
        // The response will be a string like "Logged in as username"
        const username = res.data.split(" ")[2]; // Extracting the username
        if (username) {
          setIsLoggedIn(true);
          setUsername(username);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUsername("");
      });
  }, []);

  const handleRedirect = () => {
    navigate("/restaurant-search"); // Redirect to restaurant search page
  };

  if (isLoggedIn) {
    return (
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="300px"
          bgcolor="#8d818c"
          padding="20px"
          borderRadius="8px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        >
          <Typography variant="h4" gutterBottom style={{ color: "#e9ebf8" }}>
            Welcome back, {username}!
          </Typography>
          <Button
            variant="contained"
            style={{
              marginTop: "20px",
              backgroundColor: "#e9ebf8",
              color: "black",
            }}
            onClick={handleRedirect}
          >
            Go to Restaurant Search
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="300px"
        bgcolor="#8d818c"
        padding="20px"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <Typography variant="h4" gutterBottom style={{ color: "#e9ebf8" }}>
          What's For Dinner?
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            component={Link}
            to="/login"
            variant="contained"
            style={{
              margin: "10px",
              backgroundColor: "#e9ebf8",
              color: "black",
            }}
          >
            Log in to search locations
          </Button>
          <Button
            component={Link}
            to="/registration"
            variant="contained"
            style={{
              margin: "10px",
              backgroundColor: "#e9ebf8",
              color: "black",
            }}
          >
            Register a new user to search locations
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default StarterPage;
