let ws: WebSocket | null = null;
// const apiKey = import.meta.env.VITE_API_KEY;
// const wsBaseUrl = import.meta.env.VITE_WS_BASE_URL;

export const initializeWs = (): void => {
  //   if (!apiKey || !wsBaseUrl) {
  //     throw new Error('Env variables not initialized');
  //   }

  //   const wsUrl = `${wsBaseUrl}?token=${apiKey}`;
  const wsUrl =
    'wss://ws.finnhub.io?token=d4g7gchr01qm5b349gt0d4g7gchr01qm5b349gtg';

  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('open');
    handleSubscriptionEvent('subscribe', 'BINANCE:BTCUSDT');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
  };

  ws.onclose = () => {
    console.log('close');
  };

  ws.onerror = () => {
    console.log('error');
  };
};

export const handleSubscriptionEvent = (
  type: 'subscribe' | 'unsuscribe',
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
    console.log('closed');
  }
};
