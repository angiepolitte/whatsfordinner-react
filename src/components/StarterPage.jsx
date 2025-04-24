import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

function StarterPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/user/info", {
      credentials: "include", // <<< include session cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("not-authenticated");
        return res.json();
      })
      .then((data) => {
        if (data.username) {
          setIsLoggedIn(true);
          setUsername(data.username);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUsername("");
      });
  }, []);

  // useEffect(() => {
  //   fetch("/api/user/info", { credentials: "include" })
  //     .then((res) => {
  //       const ct = res.headers.get("content-type") || "";
  //       // only parse JSON if we got JSON back
  //       if (res.ok && ct.includes("application/json")) {
  //         return res.json();
  //       }
  //       // otherwise “not logged in”
  //       throw new Error("not-json");
  //     })
  //     .then((data) => {
  //       if (data.username) {
  //         setIsLoggedIn(true);
  //         setUsername(data.username);
  //       }
  //     })
  //     .catch((err) => {
  //       // either a network error, a 401, or HTML redirect → treat as logged out
  //       console.debug("Auth check failed (ok):", err);
  //       setIsLoggedIn(false);
  //       setUsername("");
  //     });
  // }, []);

  //   useEffect(() => {
  //     // Check with the backend if the user is authenticated based on the session cookie.
  //     fetch("/api/user/info", {
  //       // Replace with an actual endpoint to get user info
  //       credentials: "include",
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           setIsLoggedIn(false);
  //           setUsername("");
  //         }
  //       })
  //       .then((data) => {
  //         if (data && data.username) {
  //           setIsLoggedIn(true);
  //           setUsername(data.username);
  //         } else {
  //           setIsLoggedIn(false);
  //           setUsername("");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error checking authentication:", error);
  //         setIsLoggedIn(false);
  //         setUsername("");
  //       });
  //   }, []);

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
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Button, Container, Typography, Box } from '@mui/material';

// function StarterPage() {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [username, setUsername] = useState('');

//     useEffect(() => {
//         // Check for user session in localStorage (or cookies)
//         const token = localStorage.getItem('authToken'); // Adjust based on your auth logic
//         const storedUsername = localStorage.getItem('username'); // Assuming username is stored in localStorage

//         if (token && storedUsername) {
//             setIsLoggedIn(true);
//             setUsername(storedUsername);
//         }
//     }, []);

//     const handleRedirect = () => {
//         navigate('/restaurant-search'); // Redirect to restaurant search page
//     };

//     if (isLoggedIn) {
//         return (
//             <Container maxWidth="sm" style={{ marginTop: '50px' }}>
//                 <Box
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     justifyContent="center"
//                     minHeight="300px"
//                     bgcolor="#8d818c"
//                     padding="20px"
//                     borderRadius="8px"
//                     boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
//                 >
//                     <Typography variant="h4" gutterBottom style={{ color: '#e9ebf8' }}>
//                         Welcome back, {username}!
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         style={{ marginTop: '20px', backgroundColor: '#e9ebf8', color: 'black' }}
//                         onClick={handleRedirect}
//                     >
//                         Go to Restaurant Search
//                     </Button>
//                 </Box>
//             </Container>
//         );
//     }

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
//                     What's For Dinner?
//                 </Typography>
//                 <Box display="flex" justifyContent="center">
//                     <Button
//                         component={Link}
//                         to="/login"
//                         variant="contained"
//                         style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
//                     >
//                         Log in to search locations
//                     </Button>
//                     <Button
//                         component={Link}
//                         to="/registration"
//                         variant="contained"
//                         style={{ margin: '10px', backgroundColor: '#e9ebf8', color: 'black' }}
//                     >
//                         Register a new user to search locations
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// }

// export default StarterPage;
