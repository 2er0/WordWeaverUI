import React, { useState } from 'react';
import { useGameStore } from '../store';
import { User } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';

export function GuessView() {
  const { gaps, users, makeGuess, guesses, currentUser } = useGameStore();
  const [selectedUsers, setSelectedUsers] = useState<Record<string, string>>({});

  const hasGuessedGap = (gapId: string) => {
    return guesses.some(
      (guess) => guess.userId === currentUser?.id && guess.gapId === gapId
    );
  };

  const storyParts = [
    "Once upon a time, there was",
    "who lived in",
    "Every day, they would",
    "Until one day",
    "And that's how",
    "became a legend."
  ];

  const handleSubmitGuess = (gapId: string) => {
    const selectedUserId = selectedUsers[gapId];
    if (selectedUserId) {
      makeGuess(gapId, selectedUserId);
      setSelectedUsers(prev => {
        const next = { ...prev };
        delete next[gapId];
        return next;
      });
    }
  };

  const renderGapContent = (gap: Gap, index: number) => {
    if (!gap.value) return null;

    const userGuess = guesses.find(
      (g) => g.userId === currentUser?.id && g.gapId === gap.id
    );
    
    const guessedUser = users.find(u => u.id === userGuess?.guessedUserId);
    
    return (
      <div key={gap.id} className="mb-8 last:mb-0">
        <div className="prose lg:prose-xl mb-4">
          <p className="text-gray-600">
            {storyParts[index]}{' '}
            <span className="bg-indigo-50 px-3 py-1 rounded font-medium">
              {gap.value}
            </span>
            {index < storyParts.length - 1 ? ' ' : ''}
          </p>
        </div>

        {!hasGuessedGap(gap.id) ? (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Who wrote this part?</p>
            <div className="grid gap-2">
              {users
                .filter((u) => u.id !== currentUser?.id)
                .map((user: User) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUsers(prev => ({ ...prev, [gap.id]: user.id }))}
                    className={`flex items-center justify-center p-3 text-sm rounded-lg transition-colors ${
                      selectedUsers[gap.id] === user.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-indigo-50 hover:bg-indigo-100'
                    }`}
                  >
                    <span className="font-medium">{user.name}</span>
                  </button>
                ))}
            </div>
            {selectedUsers[gap.id] && (
              <button
                onClick={() => handleSubmitGuess(gap.id)}
                className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Guess
              </button>
            )}
          </div>
        ) : (
          <div className={`flex items-center gap-3 p-4 rounded-lg ${
            userGuess?.correct ? 'bg-green-50' : 'bg-red-50'
          }`}>
            {userGuess?.correct ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-green-700">
                  Correct! Written by {guessedUser?.name}
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">
                  Wrong guess! Try another part
                </span>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Guess Who Wrote What</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {gaps
          .filter(gap => gap.value)
          .map((gap, index) => renderGapContent(gap, index))}
        
        {gaps.filter(gap => gap.value).length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No story parts have been written yet. Check back after players have contributed!
          </p>
        )}
      </div>
    </div>
  );
}