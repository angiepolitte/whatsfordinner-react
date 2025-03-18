import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

function StarterPage() {
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
                    What's For Dinner?
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
                    >
                        Log in to search locations
                    </Button>
                    <Button
                        component={Link}
                        to="/registration"
                        variant="contained"
                        style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
                    >
                        Register a new user to search locations
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default StarterPage;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Container, Typography, Box } from '@mui/material';

// function StarterPage() {
//     return (
//         <Container maxWidth="sm" style={{ marginTop: '50px' }}>
//             <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 minHeight="300px"
//                 bgcolor="#8d818c"
//                 padding="20px"
//                 borderRadius="8px"
//                 boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
//             >
//                 <Typography variant="h4" gutterBottom style={{ color: '#e9ebf8' }}>
//                     Welcome to What's For Dinner?!
//                 </Typography>
//                 <Button
//                     component={Link}
//                     to="/restaurant-search"
//                     variant="contained"
//                     style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
//                 >
//                     Search Restaurants
//                 </Button>
//                 <Button
//                     component={Link}
//                     to="/login" // Change to /login
//                     variant="contained"
//                     style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
//                 >
//                     Sign In
//                 </Button>
//                 <Button
//                     component={Link}
//                     to="/registration" // Change to /registration
//                     variant="contained"
//                     style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
//                 >
//                     Sign Up
//                 </Button>
//             </Box>
//         </Container>
//     );
// }

// export default StarterPage;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Container, Typography, Box } from '@mui/material';

// function StarterPage() {
//   return (
//     <Container maxWidth="sm" style={{ marginTop: '50px' }}>
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="300px"
//         bgcolor="#8d818c"
//         padding="20px"
//         borderRadius="8px"
//         boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
//       >
//         <Typography variant="h4" gutterBottom style={{ color: '#e9ebf8' }}>
//           Welcome to What's For Dinner?!
//         </Typography>
//         <Button
//           component={Link}
//           to="/restaurant-search"
//           variant="contained"
//           style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
//         >
//           Search Restaurants
//         </Button>
//         <Button
//           component={Link}
//           to="/signin"
//           variant="contained"
//           style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
//         >
//           Sign In
//         </Button>
//         <Button
//           component={Link}
//           to="/signup"
//           variant="contained"
//           style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
//         >
//           Sign Up
//         </Button>
//       </Box>
//     </Container>
//   );
// }

// export default StarterPage;