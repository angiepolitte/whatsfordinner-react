// customTheme.js
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#9c27b0', // Example primary color
          },
          secondary: {
            main: '#f50057', // Example secondary color
          },
          background: {
            default: '#fff',
            paper: '#f8f8f8',
          },
          text: {
            primary: '#000',
            secondary: '#555',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#ba68c8', // Example primary color
          },
          secondary: {
            main: '#ff4081', // Example secondary color
          },
          background: {
            default: '#303030',
            paper: '#424242',
          },
          text: {
            primary: '#fff',
            secondary: '#ccc',
          },
        }),
  },
});

const inputsCustomizations = {
  // Customizations for input components (optional)
};

export { getDesignTokens, inputsCustomizations };