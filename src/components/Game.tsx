'use client';

import { useGame } from './providers/GameProvider';
import { UserSelect } from './UserSelect';
import { Navigation } from './Navigation';
import { FillView } from './FillView';
import { GuessView } from './GuessView';
import { RankingView } from './RankingView';
import { useState } from 'react';

export function Game() {
  const { currentUser } = useGame();
  const [view, setView] = useState<'fill' | 'guess' | 'ranking'>('fill');

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <UserSelect />
      
      {view === 'fill' && <FillView />}
      {view === 'guess' && <GuessView />}
      {view === 'ranking' && <RankingView />}
      
      <Navigation view={view} setView={setView} />
    </div>
  );
}