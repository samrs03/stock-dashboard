import { useEffect, useCallback } from 'react';
import { useStockStore } from '../../ui/store/store';
import { initializeWs, closeWs } from '../ws';

export const useWsLifecycle = () => {
  const handleWsUpdate = useStockStore((state) => state.updateStockPrice);
  const handleWsStatusChange = useStockStore((state) => state.setWsStatus);
  const loadData = useStockStore((state) => state.loadCachedData);

  const setupWebSocket = useCallback(() => {
    initializeWs(handleWsUpdate, handleWsStatusChange, loadData);
  }, [handleWsUpdate, handleWsStatusChange, loadData]);

  useEffect(() => {
    console.warn('WS Manager: Running Connection and Final Cleanup Effect');

    setupWebSocket();

    return () => {
      console.warn('WS Manager: Final Cleanup - Closing connection.');
      closeWs();
    };
  }, [setupWebSocket]);
};
