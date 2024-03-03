import { useEffect } from 'react';
import { toast } from 'react-toastify';

type MessageEventHandler = (event: MessageEvent) => void;
type OpenEventHandler = () => void;

export default function useWebSocket(
  url: string,
  onMessage: MessageEventHandler,
  onOpen: OpenEventHandler
): void {
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      onOpen(); // Call the onOpen callback
      toast.info('WebSocket connected');
    };
    ws.onmessage = onMessage; // Set the onMessage callback as the message event handler
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    ws.onclose = () => toast.info('WebSocket disconnected');

    return () => {
      ws.close(); // Clean up by closing the WebSocket connection
    };
    // Ensure the effect is re-run only if url, onMessage, or onOpen changes
  }, []);
}
