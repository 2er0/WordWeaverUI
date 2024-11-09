import { useEffect, useRef, useCallback } from 'react';
import { GameState } from '../lib/types';

export function useWebSocket(gameId: string, token: string, onMessage: (data: any) => void) {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    ws.current = new WebSocket(`/websocket/${gameId}/com`);

    ws.current.onopen = () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 'auth', token }));
      }
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.current.onclose = () => {
      setTimeout(connect, 1000);
    };
  }, [gameId, token, onMessage]);

  const sendMessage = useCallback((message: object) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => ws.current?.close();
  }, [connect]);

  return { sendMessage };
}