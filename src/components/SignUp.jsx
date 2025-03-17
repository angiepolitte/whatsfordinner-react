// SignUp.jsx
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    verifyPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password, verifyPassword } = formData;
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        { username, password, verifyPassword },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // If your backend requires cookies
        }
      );
      console.log('Sign-up successful:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Sign-up failed:', error.response ? error.response.data : error.message);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { username, password, verifyPassword } = formData;
  //     const response = await axios.post('http://localhost:8080/api/auth/register', {
  //       username,
  //       password,
  //       verifyPassword,
  //     });
  //     console.log('Sign-up successful:', response.data);
  //     navigate('/success');
  //   } catch (error) {
  //     console.error('Sign-up failed:', error.response ? error.response.data : error.message);
  //   }
  // };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="verifyPassword"
            label="Verify Password"
            type="password"
            id="verifyPassword"
            autoComplete="new-password"
            value={formData.verifyPassword}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

// import * as React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';

// export function SignUpPage() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     username: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/register', formData); // Assuming your sign-up endpoint is /api/auth/signup
//       console.log('Sign-up successful:', response.data);
//       navigate('/success'); // Redirect to sign-in page
//     } catch (error) {
//       console.error('Sign-up failed:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={formData.username} onChange={handleChange} />
//           <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={formData.email} onChange={handleChange} />
//           <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={formData.password} onChange={handleChange} />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Sign Up
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }