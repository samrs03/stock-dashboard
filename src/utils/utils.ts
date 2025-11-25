import { IMesasgeEvent } from '../bff';
import { IStock } from '../ui';
import localforage from 'localforage';
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

const stockCache = localforage.createInstance({
  name: 'StockDataCache',
  storeName: 'watched_stock_data',
  description: 'Stores complete IWatchedStock objects for quick PWA restart.',
});

export const saveWatchedStock = async (stock: IWatchedStock): Promise<void> => {
  try {
    await stockCache.setItem(stock.symbol, stock);
    console.warn(`Cache: Persisted data for ${stock.symbol}`);
  } catch (error) {
    throw error;
  }
};

export const getAllWatchedStocks = async (): Promise<
  Record<string, IWatchedStock>
> => {
  try {
    const keys = await stockCache.keys();
    const allStocks: Record<string, IWatchedStock> = {};

    for (const key of keys) {
      const stock = await stockCache.getItem<IWatchedStock>(key);

      if (stock) {
        allStocks[key] = stock;
      }
    }
    if (Object.keys(allStocks).length > 0) {
      console.warn(
        `Data cache length retrieved from local storage ${Object.keys(allStocks).length}`,
      );
    }
    return allStocks;
  } catch (error) {
    throw error;
  }
};
