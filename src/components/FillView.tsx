import React, { useState } from 'react';
import { Gap } from '../types';

interface FillViewProps {
  gaps: Gap[];
  currentUser: string;
  onFillGap: (gapId: string, value: string) => void;
}

export function FillView({ gaps, currentUser, onFillGap }: FillViewProps) {
  const [input, setInput] = useState('');
  const [selectedGap, setSelectedGap] = useState<string | null>(null);

  const handleFill = () => {
    if (selectedGap && input.trim()) {
      onFillGap(selectedGap, input.trim());
      setInput('');
      setSelectedGap(null);
    }
  };

  const story = [
    "Once upon a time, there was",
    "who lived in",
    "Every day, they would",
    "Until one day",
    "And that's how",
    "became a legend."
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center mb-8">Fill in the Story</h2>
      
      <div className="prose lg:prose-xl">
        {gaps.map((gap, index) => {
          const isFilledByCurrentUser = gap.filledBy === currentUser;
          const canFill = !gap.filledBy && !isFilledByCurrentUser;
          
          return (
            <React.Fragment key={gap.id}>
              <span>{story[index]}</span>
              {' '}
              <span
                onClick={() => canFill && setSelectedGap(gap.id)}
                className={`inline-block min-w-[100px] px-3 py-1 rounded ${
                  gap.value
                    ? 'bg-indigo-100'
                    : canFill
                    ? 'bg-yellow-100 cursor-pointer hover:bg-yellow-200'
                    : 'bg-gray-100'
                }`}
              >
                {gap.value || '________'}
              </span>
              {' '}
            </React.Fragment>
          );
        })}
      </div>

      {selectedGap && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your word or phrase..."
            />
            <button
              onClick={handleFill}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Fill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}