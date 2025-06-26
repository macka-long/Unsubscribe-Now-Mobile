import { create } from "zustand";

type GameState = {
  isPlaying: boolean;
  beforeStartMoney: number;
  hasWatchedRewardAd: boolean;
  setBeforeStartMoney: (value: number) => void;
  setHasWatchedRewardAd: (value: boolean) => void;
  startGame: () => void;
  endGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  beforeStartMoney: 0,
  hasWatchedRewardAd: false,
  setBeforeStartMoney: (value) => set({ beforeStartMoney: value }),
  setHasWatchedRewardAd: (value) => set({ hasWatchedRewardAd: value }),
  startGame: () => set({ isPlaying: true, hasWatchedRewardAd: false }),
  endGame: () => set({ isPlaying: false }),
}));
