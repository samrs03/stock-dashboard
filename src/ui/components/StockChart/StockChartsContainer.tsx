import React, { memo } from 'react';
import { useStockStore } from '../..';
import { Paper, Typography } from '@mui/material';
import { SingleStockChart } from './components';
import { Box } from '@mui/material';
import { useShallow } from 'zustand/shallow';

const StockChartsContainerContent: React.FC = () => {
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
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Agrega una acción para comenzar a ver su gráfico en tiempo real.
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
        bgcolor: 'rgb(31 41 55)',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        gutterBottom
        sx={{ color: 'white' }}
      >
        Gráficos en Tiempo Real ({stocksArray.length})
      </Typography>

      <Box>
        {stocksArray.map((stock) => (
          <SingleStockChart key={stock.symbol} stock={stock} />
        ))}
      </Box>
    </Paper>
  );
};

export const StockChartsContainer = memo(StockChartsContainerContent);
