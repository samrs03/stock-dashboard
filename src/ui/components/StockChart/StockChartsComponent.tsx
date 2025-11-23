import React, { memo } from 'react';
import { useStockStore } from '../..';
import { Paper, Typography, useTheme } from '@mui/material';
import { StockChartComponent } from './components';
import { Box } from '@mui/material';
import { useShallow } from 'zustand/shallow';

const StockChartsContainer: React.FC = () => {
  const theme = useTheme();
  const stocksArray = useStockStore(
    useShallow((state) => Object.values(state.watchedStocks)),
  );

  if (stocksArray.length === 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Add a symbol to start its graph
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        bgcolor: theme.palette.background.paper,
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        gutterBottom
        sx={{ color: 'white' }}
      >
        Real Time Graphs ({stocksArray.length})
      </Typography>

      <Box>
        {stocksArray.map((stock) => (
          <StockChartComponent key={stock.symbol} {...stock} />
        ))}
      </Box>
    </Paper>
  );
};

export const StockChartsComponent = memo(StockChartsContainer);
