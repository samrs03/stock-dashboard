import React, { memo } from 'react';
import { useStockStore } from '../..';
import { useShallow } from 'zustand/react/shallow';
import { Grid, Box, Typography } from '@mui/material';
import { StockCardComponent } from './components';

const PriceSummaryBarContainer: React.FC = () => {
  const stocksArray = useStockStore(
    useShallow((state) => Object.values(state.watchedStocks)),
  );

  if (stocksArray.length === 0) {
    return (
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          bgcolor: 'rgb(31 41 55)',
          borderRadius: 1,
        }}
      >
        <Typography color="gray">
          Add a symbol to see a summarize of prices.
        </Typography>
      </Box>
    );
  }
  ``;
  return (
    <Grid container spacing={2} wrap="nowrap" sx={{ overflowX: 'auto', p: 1 }}>
      {stocksArray.map((stock) => (
        <Grid key={stock.symbol}>
          <StockCardComponent {...stock} />
        </Grid>
      ))}
    </Grid>
  );
};

export const TopCardsComponent = memo(PriceSummaryBarContainer);
