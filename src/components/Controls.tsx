import React from 'react';
import { Coins } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const AMOUNTS = [100, 200, 500, 1000];

export const Controls: React.FC = () => {
  const { coins, selectedAmount, setSelectedAmount } = useGameStore();

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Coins className="w-6 h-6 text-yellow-500" />
          <span className="text-lg font-bold">{coins}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${selectedAmount === amount
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              ${coins < amount ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={coins < amount}
          >
            {amount} coins
          </button>
        ))}
      </div>
    </div>
  );
};