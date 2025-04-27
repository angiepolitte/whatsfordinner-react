import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

function SuccessPage() {
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
          Success!
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: "#e9ebf8" }}>
          You have successfully signed up or signed in.
        </Typography>
        <Button
          component={Link}
          to="/restaurant-search"
          variant="contained"
          style={{
            marginTop: "20px",
            backgroundColor: "#e9ebf8",
            color: "black",
          }}
        >
          Now go search for a restaurant!
        </Button>
      </Box>
    </Container>
  );
}

export default SuccessPage;
