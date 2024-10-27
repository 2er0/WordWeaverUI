import React from 'react';
import { useGameStore } from '../store';
import { PenLine, Search, Trophy } from 'lucide-react';

export function Navigation() {
  const { view, setView, users, guesses, currentUser, gaps } = useGameStore();

  const filledGapsCount = gaps.filter(gap => gap.value).length;
  const totalPossibleGuesses = (users.length - 1) * filledGapsCount;
  const currentUserGuesses = guesses.filter(g => g.userId === currentUser?.id).length;
  const allUsersGuessed = currentUserGuesses === filledGapsCount;
  const canViewRanking = allUsersGuessed;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-md mx-auto flex justify-around">
        <button
          onClick={() => setView('fill')}
          className={`flex flex-col items-center ${
            view === 'fill' ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <PenLine className="h-6 w-6" />
          <span className="text-sm">Fill</span>
        </button>
        <button
          onClick={() => setView('guess')}
          className={`flex flex-col items-center ${
            view === 'guess' ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-sm">Guess</span>
        </button>
        <button
          onClick={() => canViewRanking && setView('ranking')}
          className={`flex flex-col items-center ${
            !canViewRanking 
              ? 'text-gray-300 cursor-not-allowed' 
              : view === 'ranking'
                ? 'text-indigo-600'
                : 'text-gray-500'
          }`}
        >
          <Trophy className="h-6 w-6" />
          <span className="text-sm">Ranking</span>
        </button>
      </div>
    </nav>
  );
}