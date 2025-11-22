import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { customTheme } from './ui';
import { initializeWs } from './bff';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to initialized root element');
}

initializeWs();

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline /> {/* Mínimo CSS para MUI */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
