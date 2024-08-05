import { createTheme } from '@mui/material';

const LC_Theme = createTheme({
    palette: {
      primary: { // LC Dark Green
        main: '#0a301b',
        contrastText: '#ffffff',
      },
      secondary: { // LC Green
        main: '#43b149',
        contrastText: '#ffffff',
      },
      yellow: { // LC Yellow
        main: '#e1e31a',
        contrastText: '#ffffff',
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#ffa726',
        light: '#ffb74d',
        dark: '#f57c00',
        contrastText: '#ffffff',
      },
      info: {
        main: '#29b6f6',
        light: '#4fc3f7',
        dark: '#0288d1',
        contrastText: '#ffffff',
      },
      success: {
        main: '#66bb6a',
        light: '#81c784',
        dark: '#388e3c',
        contrastText: '#ffffff',
      },
    },
  });

  export default LC_Theme;