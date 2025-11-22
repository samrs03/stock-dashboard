export interface IStock {
  symbol: string;
  price: number;
  timestamp: number;
}

export interface IWatchedStock {
  symbol: string;
  price: number;
  changePercent: number;
  alertPrice: number;
  timestamp: number;
}

export enum EWsStatus {
  CONNECTED,
  DISCONNECTED,
  ERROR,
}

export interface IStockState {
  watchedStocks: Record<string, IWatchedStock>;
  wsStatus: EWsStatus;
  chartSymbols: string[];
}

export interface IStockAction {
  addStockToWatch: (symbol: string, alertPrice: number) => void;
  removeStockFromWatch: (symbol: string) => void;
  setWsStatus: (status: EWsStatus) => void;
  updateStockPrice: (data: Map<string, IStock>) => void;
  initializeStore: () => void;
}

export type TStockStore = IStockState & IStockAction;
