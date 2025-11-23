import React, { useRef, useEffect, memo } from 'react';
import { Typography, Box } from '@mui/material';
import Chart from 'chart.js/auto';
import { IWatchedStock } from '../../../store';

const StockChartContainer: React.FC<IWatchedStock> = ({
  name,
  symbol,
  price,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: `${name} Precio`,
            data: [],
            borderColor: '#4f46e5',
            tension: 0.1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [symbol, name]);

  useEffect(() => {
    if (chartInstanceRef.current && price > 0) {
      const chart = chartInstanceRef.current;
      const now = new Date();
      const timeLabel = now.toLocaleTimeString();

      chart.data.labels!.push(timeLabel);
      chart.data.datasets[0].data.push(price);

      const maxPoints = 20;
      if (chart.data.labels!.length > maxPoints) {
        chart.data.labels!.shift();
        chart.data.datasets[0].data.shift();
      }

      chart.update('none');
    }
  }, [price]);

  return (
    <Box
      sx={{
        height: '200px',
        p: 1,
        border: '1px solid #374151',
        borderRadius: 1,
        mb: 2,
      }}
    >
      <Typography variant="subtitle1" sx={{ color: 'white' }}>
        {name} ({symbol}) - ${price.toFixed(2)}
      </Typography>
      <Box sx={{ height: 'calc(100% - 24px)' }}>
        <canvas ref={canvasRef} />
      </Box>
    </Box>
  );
};

export const StockChartComponent = memo(StockChartContainer);
