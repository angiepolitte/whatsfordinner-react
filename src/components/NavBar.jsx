import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function NavBar({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
            });
    
            if (response.ok) {
                onLogout();
                navigate('/login'); // Redirect to /login
            } else {
                console.error('Logout failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#463f3a' }}> 
            <Toolbar sx={{ minHeight: '40px' }}> {/* Reduced height */}
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    What's For Dinner?
                </Typography>
                {isLoggedIn && (
                    <Box>
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