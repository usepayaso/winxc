import React from 'react';
import { Trophy, TrendingDown, TrendingUp } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Stats: React.FC = () => {
  const history = useGameStore((state) => state.history);

  const stats = history.reduce(
    (acc, entry) => {
      const profit = entry.won - entry.bet;
      return {
        totalBets: acc.totalBets + entry.bet,
        totalWins: acc.totalWins + entry.won,
        biggestWin: Math.max(acc.biggestWin, profit),
      };
    },
    { totalBets: 0, totalWins: 0, biggestWin: 0 }
  );

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
          <TrendingUp className="w-6 h-6 text-green-500 mb-1" />
          <span className="text-sm text-gray-600">Total Bets</span>
          <span className="font-bold">{stats.totalBets}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
          <TrendingDown className="w-6 h-6 text-blue-500 mb-1" />
          <span className="text-sm text-gray-600">Total Wins</span>
          <span className="font-bold">{stats.totalWins}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
          <Trophy className="w-6 h-6 text-yellow-500 mb-1" />
          <span className="text-sm text-gray-600">Biggest Win</span>
          <span className="font-bold">{stats.biggestWin}</span>
        </div>
      </div>
    </div>
  );
};