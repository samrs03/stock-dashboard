import React from 'react';
import { Box, AppBar, useTheme } from '@mui/material';
import {
  StockChartsComponent,
  StockFormComponent,
  TopCardsComponent,
} from './ui';
import { useWsLifecycle } from './bff';

const App = () => {
  const theme = useTheme();

  useWsLifecycle();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <AppBar
        position="static"
        color="primary"
        elevation={3}
        sx={{
          minHeight: '96px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 24px',
        }}
      >
        <TopCardsComponent />
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          backgroundColor: theme.palette.background.paper,

          display: 'flex',
          gap: 3,
          p: 3,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            height: '100%',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Box
            sx={{
              width: '65%',
            }}
          >
            <StockFormComponent />
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            p: 2,
          }}
        >
          <StockChartsComponent />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
