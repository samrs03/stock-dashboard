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
      /// asegurarse que solo watched stocks son parseads, quiza una verificacion
      for (const [symbol, stockData] of data) {
        const existingStock = state.watchedStocks[symbol];
        if (!existingStock) {
          console.warn(`Symbol ${symbol} received but not subscribed to`);
          continue;
        }

        if (existingStock.timestamp < stockData.timestamp) {
          watchedStocks[symbol] = {
            ...existingStock,
            price: stockData.price,
            timestamp: stockData.timestamp,
          };
        }

        // when ui is ready lets bakc to this an calculate {appropiate percent change, for now it will be defualt to 0
      }
      return { watchedStocks };

      // data.forEach (()=>)
      //   const existingStock = state.watchedStocks[symbol];

      //   if (!existingStock) {
      //     return state;
      //   }

      //   const previousPrice =
      //     existingStock.price !== 0 ? existingStock.price : price;

      //   const newChangePercent = calculateChangePercent(price, previousPrice);

      //   if (price >= existingStock.alertPrice && existingStock.alertPrice > 0) {
      //     console.warn('Alert the stock reached the alert price ');
      //   }

      //   return {
      //     watchedStocks: {
      //       ...state.watchedStocks,
      //       [symbol]: {
      //         ...existingStock,
      //         price: price,
      //         changePercent: newChangePercent,
      //       },
      //     },
      //   };
      // });
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
            //revisar si se puede poner el actual
            timestamp: 0,
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
