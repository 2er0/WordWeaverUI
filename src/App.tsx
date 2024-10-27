import React from 'react';
import { useGameStore } from './store';
import { UserSelect } from './components/UserSelect';
import { Navigation } from './components/Navigation';
import { FillView } from './components/FillView';
import { GuessView } from './components/GuessView';
import { RankingView } from './components/RankingView';

function App() {
  const { view } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <UserSelect />
      
      {view === 'fill' && <FillView />}
      {view === 'guess' && <GuessView />}
      {view === 'ranking' && <RankingView />}
      
      <Navigation />
    </div>
  );
}

export default App;