import { EWsStatus, IStock } from '../../ui';
import { webSocketDataMapper } from '../../utils';

export type WsUpdateCallback = (data: Map<string, IStock>) => void;
export type StatusUpdateCallback = (status: EWsStatus) => void;
export type LoadWatchedStocksCallback = () => void;

let ws: WebSocket | null = null;
let updateCallback: WsUpdateCallback | null = null;
let statusCallback: StatusUpdateCallback | null = null;
let loadWatchedStocksCallback: LoadWatchedStocksCallback | null = null;
let isConnecting: boolean = false;

export const initializeWs = (
  onUpdate: WsUpdateCallback,
  onStatusChange: StatusUpdateCallback,
  onLoadWatchedStocks: LoadWatchedStocksCallback,
): void => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    updateCallback = onUpdate;
    statusCallback = onStatusChange;
    loadWatchedStocksCallback = onLoadWatchedStocks;
    return;
  }

  if (isConnecting) {
    return;
  }

  if (
    ws &&
    (ws.readyState === WebSocket.CLOSING || ws.readyState === WebSocket.CLOSED)
  ) {
    closeWs();
  }

  isConnecting = true;

  const wsUrl =
    'wss://ws.finnhub.io?token=d4g7gchr01qm5b349gt0d4g7gchr01qm5b349gtg';

  ws = new WebSocket(wsUrl);

  updateCallback = onUpdate;
  statusCallback = onStatusChange;
  loadWatchedStocksCallback = onLoadWatchedStocks;

  ws.onopen = () => {
    isConnecting = false;
    statusCallback && statusCallback(EWsStatus.CONNECTED);

    if (loadWatchedStocksCallback) {
      loadWatchedStocksCallback();
    }
  };

  ws.onclose = () => {
    isConnecting = false;
    statusCallback && statusCallback(EWsStatus.DISCONNECTED);
  };

  ws.onerror = () => {
    isConnecting = false;
    statusCallback && statusCallback(EWsStatus.ERROR);
  };

  ws.onmessage = (event) => {
    const parsedEvent = JSON.parse(event.data);
    if (parsedEvent.type === 'trade' && parsedEvent.data) {
      const data = webSocketDataMapper(parsedEvent);
      updateCallback && updateCallback(data);
    }
  };
};

export const handleSubscriptionEvent = (
  type: 'subscribe' | 'unsubscribe',
  symbol: string,
): void => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ type, symbol });
    ws.send(message);
  }
};

export const closeWs = () => {
  if (ws && ws.readyState !== WebSocket.CLOSED) {
    if (
      ws.readyState === WebSocket.OPEN ||
      ws.readyState === WebSocket.CONNECTING
    ) {
      ws.close(1000, 'App cleanup/unmount');
    }
  }

  ws = null;
  updateCallback = null;
  statusCallback = null;
  loadWatchedStocksCallback = null;
  isConnecting = false;
};
