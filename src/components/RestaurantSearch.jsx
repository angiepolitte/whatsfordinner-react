import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function RestaurantSearch() {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `http://localhost:8080/api/restaurants?query=${encodeURIComponent(zipCode)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        navigate('/restaurant-results', { state: { restaurants: data.results } });
      } else {
        setError(data.status);
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
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
        <Typography variant="h4" gutterBottom style={{ color: '#e9ebf8' }}>
          What's For Dinner?!
        </Typography>
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: '10px',
            margin: '8px 0',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: "#FFFFFF",
            color: '#8d818c',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          style={{ marginTop: '20px', backgroundColor: '#e9ebf8', color: 'black' }} // Blue button
        >
          {loading ? 'Searching...' : 'Search Restaurants'}
        </Button>
        {error && (
          <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
            Error: {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default RestaurantSearch;