import React from 'react';
import { PenLine, Search, Trophy } from 'lucide-react';

interface NavigationProps {
  currentView: 'fill' | 'guess' | 'ranking';
  onViewChange: (view: 'fill' | 'guess' | 'ranking') => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-md mx-auto flex justify-around">
        <button
          onClick={() => onViewChange('fill')}
          className={`flex flex-col items-center ${
            currentView === 'fill' ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <PenLine className="h-6 w-6" />
          <span className="text-sm">Fill</span>
        </button>
        <button
          onClick={() => onViewChange('guess')}
          className={`flex flex-col items-center ${
            currentView === 'guess' ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-sm">Guess</span>
        </button>
        <button
          onClick={() => onViewChange('ranking')}
          className={`flex flex-col items-center ${
            currentView === 'ranking' ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <Trophy className="h-6 w-6" />
          <span className="text-sm">Ranking</span>
        </button>
      </div>
    </nav>
  );
}