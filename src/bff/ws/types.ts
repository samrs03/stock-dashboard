export interface IRawStockData {
  p: number;
  s: string;
  t: number;
  v: number;
}

export interface IMesasgeEvent {
  type: string;
  data: IRawStockData[];
}
