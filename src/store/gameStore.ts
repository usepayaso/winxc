import { create } from 'zustand';
import { TelegramStorage } from '../services/telegramStorage';

interface GameState {
  spinning: boolean;
  coins: number;
  selectedAmount: number;
  history: {
    timestamp: number;
    bet: number;
    multiplier: number;
    won: number;
  }[];
  setSpinning: (spinning: boolean) => void;
  setCoins: (coins: number) => void;
  setSelectedAmount: (amount: number) => void;
  addToHistory: (bet: number, multiplier: number, won: number) => void;
  loadUserData: (userId: string) => Promise<void>;
  saveUserData: () => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  spinning: false,
  coins: 1000,
  selectedAmount: 100,
  history: [],
  setSpinning: (spinning) => set({ spinning }),
  setCoins: (coins) => set({ coins }),
  setSelectedAmount: (amount) => set({ selectedAmount }),
  addToHistory: (bet, multiplier, won) =>
    set((state) => ({
      history: [
        ...state.history,
        {
          timestamp: Date.now(),
          bet,
          multiplier,
          won,
        },
      ],
    })),
  loadUserData: async (userId) => {
    const data = await TelegramStorage.getUserData(userId);
    if (data) {
      set({
        coins: data.coins,
        history: data.history,
      });
    }
  },
  saveUserData: async () => {
    const state = get();
    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id?.toString();
    if (!userId) return;

    await TelegramStorage.saveUserData({
      userId,
      coins: state.coins,
      history: state.history,
    });
  },
}));