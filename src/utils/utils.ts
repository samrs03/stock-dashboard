import { IMesasgeEvent } from '../bff';
import { IStock } from '../ui';

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
