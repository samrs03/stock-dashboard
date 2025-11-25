import { EWsStatus, IStockState, IWatchedStock, TStockStore } from './types';
import { create } from 'zustand';
import {
  calculateChangePercent,
  getAllWatchedStocks,
  saveWatchedStock,
} from '../../utils';
import { handleSubscriptionEvent } from '../../bff';

const INITIAL_STATE: IStockState = {
  wsStatus: EWsStatus.DISCONNECTED,
  watchedStocks: {},
  chartSymbols: [],
};

export const useStockStore = create<TStockStore>((set, get) => ({
  ...INITIAL_STATE,
  setWsStatus: (wsStatus) => {
    set({ wsStatus });
  },
  updateStockPrice: (data) => {
    set((state) => {
      if (data.size < 1) {
        return state;
      }
      const watchedStocks = state.watchedStocks;

      for (const [symbol, stockData] of data) {
        const existingStock = state.watchedStocks[symbol];

        if (!existingStock || existingStock.timestamp >= stockData.timestamp) {
          continue;
        }

        const previousPrice = existingStock.initialPrice;
        const newChangePercent = calculateChangePercent(
          stockData.price,
          previousPrice,
        );

        const updatedStock: IWatchedStock = {
          ...existingStock,
          price: stockData.price,
          timestamp: stockData.timestamp,
          changePercent: newChangePercent,
          initialPrice:
            existingStock.initialPrice === 0
              ? stockData.price
              : existingStock.initialPrice,
        };
        watchedStocks[symbol] = updatedStock;
        saveWatchedStock(updatedStock);
      }
      return { watchedStocks };
    });
  },
  addStockToWatch: (symbol, alertPrice, name) => {
    console.warn('Adding stock to watched listed in ZUSTAND');

    handleSubscriptionEvent('subscribe', symbol);

    set((state) => {
      const watchedStocks = state.watchedStocks;
      saveWatchedStock({
        symbol,
        price: 0,
        changePercent: 0,
        name,
        alertPrice,
        timestamp: 0,
        initialPrice: 0,
      });
      return {
        watchedStocks: {
          ...watchedStocks,
          [symbol]: {
            symbol,
            price: 0,
            changePercent: 0,
            name,
            alertPrice,
            timestamp: 0,
            initialPrice: 0,
          },
        },
      };
    });
  },
  loadCachedData: async () => {
    const cachedStock = await getAllWatchedStocks();
    const cachedStockArray = Object.entries(cachedStock);

    if (cachedStockArray.length > 0) {
      for (const [, value] of cachedStockArray) {
        get().addStockToWatch(value.symbol, value.alertPrice, value.name);
      }
    }
  },
}));
