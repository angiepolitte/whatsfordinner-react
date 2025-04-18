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
                navigate('/login');
            } else {
                console.error('Logout failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#463f3a' }}>
            <Toolbar sx={{ minHeight: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                    Can't Decide on What's For Dinner?
                </Typography>
                {isLoggedIn && (
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Button color="inherit" onClick={() => navigate('/favorites')}>
                            View Favorites
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


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

// function NavBar({ isLoggedIn, onLogout }) {
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         try {
//             const response = await fetch('http://localhost:8080/logout', {
//                 method: 'POST',
//             });
    
//             if (response.ok) {
//                 onLogout(); // Call the onLogout function passed from the parent
//                 navigate('/login'); // Redirect to /login after logout
//             } else {
//                 console.error('Logout failed:', response.status, response.statusText);
//             }
//         } catch (error) {
//             console.error('Error during logout:', error);
//         }
//     };

//     return (
//         <AppBar position="fixed" sx={{ backgroundColor: '#463f3a' }}>
//             <Toolbar sx={{ minHeight: '40px', display: 'contents', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="h6">
//                     Can't Decide on What's For Dinner?
//                 </Typography>
//                 {isLoggedIn && (
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                         <Button color="inherit" onClick={handleLogout}>
//                             Logout
//                         </Button>
//                     </Box>
//                 )}
//             </Toolbar>
//         </AppBar>
//     );
// }

// export default NavBar;
