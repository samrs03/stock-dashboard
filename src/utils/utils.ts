import { IMesasgeEvent } from '../bff';
import { IStock } from '../ui';
import { IWatchedStock } from '../ui';

export const calculateChangePercent = (
  currentPrice: number,
  previousPrice: number,
): number => {
  if (previousPrice === 0 || isNaN(previousPrice) || previousPrice === null) {
    return 0;
  }

  const change = ((currentPrice - previousPrice) / previousPrice) * 100;

  return parseFloat(change.toFixed(2));
};

export const webSocketDataMapper = (
  event: IMesasgeEvent,
): Map<string, IStock> => {
  const stockInformation = new Map<string, IStock>();

  event.data.forEach((rawStock) => {
    const { s: symbol, p: price, t: timestamp } = rawStock;

    if (stockInformation.has(symbol)) {
      const currentTimestamp = stockInformation.get(symbol)?.timestamp;
      currentTimestamp &&
        currentTimestamp < timestamp &&
        stockInformation.set(symbol, {
          symbol,
          price,
          timestamp,
        });
    } else {
      stockInformation.set(symbol, {
        symbol,
        price,
        timestamp,
      });
    }
  });

  return stockInformation;
};

export const saveWatchedStock = (
  stock: Record<string, IWatchedStock>,
): void => {
  localStorage.setItem('stock_data', JSON.stringify(stock));
  console.warn(`Cache: Persisted data for ${stock.symbol}`);
};

export const getAllWatchedStocks = (): Record<string, IWatchedStock> => {
  const serializedState = localStorage.getItem('stock_data');

  const watchedStocks = JSON.parse(serializedState!);
  return watchedStocks;
};
