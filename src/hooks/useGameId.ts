import { useEffect, useState } from 'react';

export function useGameId(): string | null {
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    // Get game ID from URL path
    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments[1]; // Assuming URL structure is /:gameId/*
    
    if (id) {
      setGameId(id);
    }
  }, []);

  return gameId;
}