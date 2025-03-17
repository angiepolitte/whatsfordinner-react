// SignIn.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      console.log('Sign-in successful:', response.data);
      localStorage.setItem('token', JSON.stringify(response.data));
      navigate('/success');
    } catch (error) {
      console.error('Sign-in failed:', error.response ? error.response.data : error.message);
    }
  };

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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}


// // SignIn.jsx
// import * as React from 'react';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import { createTheme } from '@mui/material/styles';
// import { useColorSchemeShim } from 'docs/src/modules/components/ThemeContext';
// import { getDesignTokens, inputsCustomizations } from './customTheme';
// import axios from 'axios'; // Import axios for API requests
// import { useNavigate } from 'react-router-dom';

// const providers = [
//     { id: 'credentials', name: 'Email and Password' },
//   ];
  
//   export default function ThemeSignInPage() {
//     const { mode, systemMode } = useColorSchemeShim();
//     const calculatedMode = (mode === 'system' ? systemMode : mode) ?? 'light';
//     const brandingDesignTokens = getDesignTokens(calculatedMode);
//     const THEME = createTheme({
//       ...brandingDesignTokens,
//       palette: {
//         ...brandingDesignTokens.palette,
//         mode: calculatedMode,
//       },
//       components: {
//         ...inputsCustomizations,
//       },
//     });
    
//   const navigate = useNavigate();

//   const signIn = async (provider, credentials) => {
//     if (provider.id === 'credentials') {
//       try {
//         const response = await axios.post('/api/auth/signin', credentials);
//         // Handle successful sign-in
//         console.log('Sign-in successful:', response.data);
//         localStorage.setItem('token', JSON.stringify(response.data)); // Store response data
//         navigate('/success'); // Redirect to success page
//         return { success: true };
//       } catch (error) {
//         // Handle sign-in error
//         console.error('Sign-in failed:', error.response ? error.response.data : error.message);
//         return { error: error.response ? error.response.data : 'Woopsies. Please check your credentials.' };
//       }
//     } else {
//       console.log(`Sign in with ${provider.id} not yet implemented.`);
//       return { error: 'Provider not yet implemented.' };
//     }
//   };

//   return (
//     <AppProvider theme={THEME}>
//       <SignInPage
//         signIn={signIn}
//         providers={providers}
//         slotProps={{ form: { noValidate: true } }}
//         sx={{
//           '& form > .MuiStack-root': {
//             marginTop: '2rem',
//             rowGap: '0.5rem',
//           },
//         }}
//       />
//     </AppProvider>
//   );
// }

// import * as React from 'react';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import { createTheme } from '@mui/material/styles';
// import { useColorSchemeShim } from 'docs/src/modules/components/ThemeContext';
// import { getDesignTokens, inputsCustomizations } from './customTheme';

// const providers = [
//   { id: 'github', name: 'GitHub' },
//   { id: 'google', name: 'Google' },
//   { id: 'credentials', name: 'Email and Password' },
// ];

// const signIn = async (provider) => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Sign in with ${provider.id}`);
//       resolve({ error: 'This is a mock error message.' });
//     }, 500);
//   });
//   return promise;
// };

// export default function ThemeSignInPage() {
//   const { mode, systemMode } = useColorSchemeShim();
//   const calculatedMode = (mode === 'system' ? systemMode : mode) ?? 'light';
//   const brandingDesignTokens = getDesignTokens(calculatedMode);
//   // preview-start
//   const THEME = createTheme({
//     ...brandingDesignTokens,
//     palette: {
//       ...brandingDesignTokens.palette,
//       mode: calculatedMode,
//     },
//     components: {
//       ...inputsCustomizations,
//     },
//   });
//   // preview-end

//   return (
//     // preview-start
//     <AppProvider theme={THEME}>
//       <SignInPage
//         signIn={signIn}
//         providers={providers}
//         slotProps={{ form: { noValidate: true } }}
//         sx={{
//           '& form > .MuiStack-root': {
//             marginTop: '2rem',
//             rowGap: '0.5rem',
//           },
//         }}
//       />
//     </AppProvider>
//     // preview-end
//   );
// }