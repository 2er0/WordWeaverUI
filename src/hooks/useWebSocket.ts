import {useEffect, useRef, useCallback} from 'react';
import {WebSocketMessage} from "@/lib/types.ts";

export function useWebSocket(
    joinGame: boolean,
    gameId: string,
    token: string,
    onMessage: (message: WebSocketMessage) => void
) {
    const ws = useRef<WebSocket | null>(null);

    const connect = useCallback(() => {
        ws.current = new WebSocket(`/websocket/${gameId}/com`);

        ws.current.onopen = () => {
            if (ws.current?.readyState === WebSocket.OPEN && token) {
                ws.current.send(JSON.stringify({obj: 'auth', token: token}));
            }
        };

        ws.current.onmessage = (event) => {
            try {
                const message: WebSocketMessage = JSON.parse(event.data);
                onMessage(message);
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };

        ws.current.onclose = () => {
            setTimeout(connect, 1000);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.current?.close();
        };
    }, [gameId, token, onMessage]);

    const sendMessage = useCallback((message: WebSocketMessage) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        }
    }, []);

    useEffect(() => {
        if (joinGame && gameId && token) {
            connect();
        }
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [connect, gameId, token, joinGame]);

    return {sendMessage};
}