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
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
  };
};
