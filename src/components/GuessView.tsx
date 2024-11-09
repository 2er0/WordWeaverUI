import React, { useState } from 'react';
import { Gap, User, Guess } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface GuessViewProps {
  gaps: Gap[];
  users: User[];
  guesses: Guess[];
  currentUser: string;
  onMakeGuess: (gapId: string, guessedUserId: string) => void;
}

export function GuessView({ gaps, users, guesses, currentUser, onMakeGuess }: GuessViewProps) {
  const [selectedUsers, setSelectedUsers] = useState<Record<string, string>>({});

  const hasGuessedGap = (gapId: string) => {
    return guesses.some(
      (guess) => guess.userId === currentUser && guess.gapId === gapId
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
      onMakeGuess(gapId, selectedUserId);
      setSelectedUsers(prev => {
        const next = { ...prev };
        delete next[gapId];
        return next;
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Guess Who Wrote What</h2>
      
      <div className="space-y-6">
        {gaps.filter(gap => gap.value).map((gap, index) => {
          const userGuess = guesses.find(
            (g) => g.userId === currentUser && g.gapId === gap.id
          );
          
          const guessedUser = users.find(u => u.id === userGuess?.guessedUserId);
          
          return (
            <div key={gap.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="prose lg:prose-xl mb-4">
                <p className="text-gray-600">
                  {storyParts[index]}{' '}
                  <span className="bg-indigo-50 px-3 py-1 rounded font-medium">
                    {gap.value}
                  </span>
                </p>
              </div>

              {!hasGuessedGap(gap.id) ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Who wrote this part?</p>
                  <div className="grid gap-2">
                    {users
                      .filter((u) => u.id !== currentUser)
                      .map((user) => (
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
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
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
        })}
      </div>
    </div>
  );
}