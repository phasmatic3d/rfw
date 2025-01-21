'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({  
  colorSchemes: { 
    light: true, 
    dark: {
      palette: {
        text: /* used for texts*/ {
          primary: "#FFF",
          // secondary:
          // disabled:
        },
        primary: /* used for button or actions*/ {
          main: "#FFF",
          // light:
          // dark: 
        },
        //secondary: { /* used for secondary buttons, highlights or accents */
          //main: "#FFF",
          // light:
          // dark:
        //},
        // error: {...}
        // warning: {...}
        // info: {...}
        // success: {...}
        // grey: {50: .., 100...900:, A100, A200, A400, A700},
        // divider: rgba()
        background: { default: "#333333", paper: "#333333"},
        action: { /* used for button states, item lists or tables */
          // active
          // hover
          // hoverOpacity
          // selected
          // selectedOpacity
          // disabled
          // disabledBackground
          // disabledOpacity
          // focus
          // focusOpacity
          // activatedOpacity
        }
      }      
    }
  },
  cssVariables: { colorSchemeSelector: 'class'},
  typography: {
    fontFamily: 'var(--font-open-sans)',
  },
});

export default theme;
