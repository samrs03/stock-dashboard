import React, { memo } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { IWatchedStock } from '../../../store';

const StockCardContainer: React.FC<IWatchedStock> = ({
  symbol,
  name,
  price,
  changePercent,
}) => {
  const isPositive = changePercent >= 0;
  const color = isPositive ? '#10b981' : '#ef4444';

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        minWidth: 150,
        bgcolor: 'rgb(31 41 55)',
        color: 'white',
        border: `2px solid ${color}`,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          cursor: 'pointer',
        },
      }}
    >
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ fontWeight: 'bold' }}
      >
        {symbol.split(':')[1] || symbol}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ color: 'gray' }}
      >
        {name}
      </Typography>

      <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
        ${price.toFixed(2)}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
        <Typography variant="body2" sx={{ color: color, fontWeight: 'bold' }}>
          {isPositive ? '▲' : '▼'} {changePercent.toFixed(2)}%
        </Typography>
      </Box>
    </Paper>
  );
};

export const StockCardComponent = memo(StockCardContainer);
