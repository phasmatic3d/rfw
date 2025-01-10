'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({  
  colorSchemes: { 
    light: true, 
    dark: {
      palette: {
        text: /* used for texts*/ {
          primary: "#00FFFF"
        },
        primary: /* used for button or actions*/ {
          main: "#FF00FF"
        },
        background: { default: "#AAAAAA", paper: "#AA0000"}
      }      
    }
  },
  cssVariables: { colorSchemeSelector: 'class'},
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
