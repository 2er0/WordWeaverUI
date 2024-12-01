'use client';

import { Trophy, Award, Medal } from 'lucide-react';
import {useGame} from "@/components/providers/GameProvider.tsx";

export function RankingView() {
  const { guessScores } = useGame();
  const sortedUsers = [...guessScores]
      .sort((a, b) => b.score - a.score);
  
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Leaderboard</h2>
      
      <div className="space-y-4">
        {sortedUsers.map((user, index) => (
          <div
            key={user.token}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 flex items-center justify-center bg-indigo-50 rounded-full">
                {getRankIcon(index) || (index + 1)}
              </span>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{user.score}</span>
              <span className="text-sm text-gray-500">points</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}