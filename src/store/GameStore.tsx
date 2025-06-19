import { create } from 'zustand';

type GameState = {
  isPlaying: boolean;
  beforeStartMoney: number;
  setBeforeStartMoney: (value: number) => void;
  startGame: () => void;
  endGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  beforeStartMoney: 0,
  setBeforeStartMoney: (value) => set({ beforeStartMoney: value }),
  startGame: () => set({ isPlaying: true }),
  endGame: () => set({ isPlaying: false }),
}));