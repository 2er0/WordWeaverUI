import React from 'react';
import { useGameId } from './hooks/useGameId';
import { GameProvider } from './components/providers/GameProvider';
import { Game } from './components/Game';
import { NoGame } from './components/NoGame';

function App() {
  const gameId = useGameId();

  if (!gameId) {
    return <NoGame />;
  }

  return (
    <GameProvider initialGameId={gameId}>
      <Game />
    </GameProvider>
  );
}

export default App;