export interface IStock {
  symbol: string;
  price: number;
  timestamp: number;
}

export interface IWatchedStock extends IStock {
  changePercent: number;
  alertPrice: number;
  name: string;
  initialPrice: number;
}

export enum EWsStatus {
  CONNECTED,
  DISCONNECTED,
  ERROR,
}

export interface IStockState {
  watchedStocks: Record<string, IWatchedStock>;
  wsStatus: EWsStatus;
}

export interface IStockAction {
  addStockToWatch: (symbol: string, alertPrice: number, name: string) => void;
  setWsStatus: (status: EWsStatus) => void;
  updateStockPrice: (data: Map<string, IStock>) => void;
  loadCachedData: () => void;
}

export type TStockStore = IStockState & IStockAction;
