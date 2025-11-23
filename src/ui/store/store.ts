import { EWsStatus, IStockState, TStockStore } from './types';
import { create } from 'zustand';
import { calculateChangePercent } from '../../utils';
import { handleSubscriptionEvent, initializeWs } from '../../bff';

const INITIAL_STATE: IStockState = {
  wsStatus: EWsStatus.DISCONNECTED,
  watchedStocks: {},
  chartSymbols: [],
};

export const useStockStore = create<TStockStore>((set, get) => ({
  ...INITIAL_STATE,
  initializeStore: () => {
    const updateStockMethod = get().updateStockPrice;
    const updateStatusMethod = get().setWsStatus;

    initializeWs(updateStockMethod, updateStatusMethod);
    console.warn('Connection to WS initialized by Zustand');
  },
  setWsStatus: (wsStatus) => {
    set({ wsStatus });
  },

  updateStockPrice: (data) => {
    console.warn('Starting update of stock in store');

    set((state) => {
      if (data.size < 1) {
        return state;
      }
      const watchedStocks = state.watchedStocks;

      for (const [symbol, stockData] of data) {
        const existingStock = state.watchedStocks[symbol];
        if (!existingStock || existingStock.timestamp >= stockData.timestamp) {
          console.warn(`Symbol ${symbol} received but not subscribed to`);
          continue;
        }

        const previousPrice = existingStock.initialPrice;

        const newChangePercent = calculateChangePercent(
          stockData.price,
          previousPrice,
        );

        if (existingStock.timestamp < stockData.timestamp) {
          watchedStocks[symbol] = {
            ...existingStock,
            price: stockData.price,
            timestamp: stockData.timestamp,
            changePercent: newChangePercent,
            initialPrice:
              existingStock.initialPrice === 0
                ? stockData.price
                : existingStock.initialPrice,
          };
        }
      }
      return { watchedStocks };
    });
  },
  addStockToWatch: (symbol, alertPrice, name) => {
    console.warn('Adding stock to watched listed in ZUSTAND');

    handleSubscriptionEvent('subscribe', symbol);

    set((state) => {
      const watchedStocks = state.watchedStocks;
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
  removeStockFromWatch: (symbol) => {
    console.warn('Deleting stock from the watched list in ZUSTAND');

    handleSubscriptionEvent('unsubscribe', symbol);

    set((state) => {
      const newWatchedStocks = { ...state.watchedStocks };
      delete newWatchedStocks[symbol];

      return {
        watchedStocks: newWatchedStocks,
      };
    });
  },
}));
