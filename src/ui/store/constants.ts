import { IWatchedStock } from './types';

export const STOCK_ELEMENTS: Pick<IWatchedStock, 'symbol' | 'name'>[] = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Clase A)' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'VZ', name: 'Verizon Communications Inc.' },
  { symbol: 'PFE', name: 'Pfizer Inc.' },
  { symbol: 'SBUX', name: 'Starbucks Corporation' },
  { symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin' },
  { symbol: 'BINANCE:ETHUSDT', name: 'Ethereum' },
  { symbol: 'BINANCE:BNBUSDT', name: 'Binance Coin' },
  { symbol: 'BINANCE:XRPUSDT', name: 'Ripple' },
  { symbol: 'BINANCE:SOLUSDT', name: 'Solana' },
  { symbol: 'BINANCE:ADAUSDT', name: 'Cardano' },
  { symbol: 'BINANCE:DOGEUSDT', name: 'Dogecoin' },
  { symbol: 'BINANCE:SHIBUSDT', name: 'Shiba Inu' },
  { symbol: 'BINANCE:DOTUSDT', name: 'Polkadot' },
  { symbol: 'BINANCE:AVAXUSDT', name: 'Avalanche' },
];
