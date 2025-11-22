import { EWsStatus, IStock } from '../../ui';
import { webSocketDataMapper } from '../../utils';

// volver a revisar variables de ambiente

export type WsUpdateCallback = (data: Map<string, IStock>) => void;
export type StatusUpdateCallback = (status: EWsStatus) => void;

let ws: WebSocket | null = null;
let updateCallback: WsUpdateCallback | null = null;
let statusCallback: StatusUpdateCallback | null = null;

export const initializeWs = (
  onUpdate: WsUpdateCallback,
  onStatusChange: StatusUpdateCallback,
): void => {
  if (ws) return;

  const wsUrl =
    'wss://ws.finnhub.io?token=d4g7gchr01qm5b349gt0d4g7gchr01qm5b349gtg';

  ws = new WebSocket(wsUrl);

  updateCallback = onUpdate;
  statusCallback = onStatusChange;

  ws.onopen = () => {
    statusCallback && statusCallback(EWsStatus.CONNECTED);
  };

  ws.onclose = () => {
    statusCallback && statusCallback(EWsStatus.DISCONNECTED);
  };

  ws.onerror = () => {
    statusCallback && statusCallback(EWsStatus.ERROR);
  };

  ws.onmessage = (event) => {
    if (event.type === 'trade' && event.data) {
      const parsedEvent = JSON.parse(event.data);
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
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
    ws = null;
  }
};
