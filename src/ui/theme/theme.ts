import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a2027',
      paper: '#242933',
    },
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#f97316',
    },
    success: {
      main: '#10b981',
    },
    error: {
      main: '#ef4444',
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#f3f4f6',
    },
    body1: {
      color: '#f3f4f6',
    },
    caption: {
      fontFamily: '"Roboto Mono", monospace',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #374151',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        /* Limpiamos estilos de HTML y BODY para 100vh/100vw */
        html, body {
          margin: 0;
          padding: 0;
          height: 100%; /* Asegura que el body use todo el alto del html */
          width: 100%; /* Asegura que el body use todo el ancho del html */
          
        }
        
        /* ¡ESTO ES CRUCIAL! Asegura que el div principal de React ocupe todo el espacio. */
        #root, .App { 
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        /* Si estás usando el <ThemeProvider> directamente en el body */
        body > div:first-of-type {
            height: 100%;
            width: 100%;
        }
      `,
    },
  },
});
