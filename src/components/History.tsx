import React from 'react';
import { useGameStore } from '../store/gameStore';

export const History: React.FC = () => {
  const history = useGameStore((state) => state.history);

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Spin History</h2>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {history.map((entry, index) => (
          <div
            key={entry.timestamp}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <span>Bet: {entry.bet}</span>
            <span className={entry.won > entry.bet ? 'text-green-500' : 'text-red-500'}>
              {entry.won > entry.bet ? '+' : ''}{entry.won - entry.bet}
            </span>
            <span>{entry.multiplier}x</span>
          </div>
        ))}
      </div>
    </div>
  );
};