import { Box, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { StockForm } from './ui';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'rgb(17 24 39)',
        p: 4,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Container maxWidth="xl">
        {/* <Grid container spacing={3}>
          <Grid item xs={12}>
            <PriceSummaryBar />
          </Grid>
        </Grid> */}
        <Grid container spacing={3} sx={{ height: '75vh' }}>
          <Grid component={StockForm} />
          {/* <Grid item xs={12} md={8}>
            <ChartDisplay />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
