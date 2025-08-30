import { create } from "zustand";
import { Stage } from "../types/stage";

type GameState = {
  selectedStage: Stage | null;
  isPlaying: boolean;
  beforeStartMoney: number;
  hasWatchedRewardAd: boolean;
  setSelectedStage: (value: Stage) => void;
  setBeforeStartMoney: (value: number) => void;
  setHasWatchedRewardAd: (value: boolean) => void;
  startGame: () => void;
  endGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  selectedStage: null,
  isPlaying: false,
  beforeStartMoney: 0,
  hasWatchedRewardAd: false,
  setSelectedStage: (value) => set({ selectedStage: value }),
  setBeforeStartMoney: (value) => set({ beforeStartMoney: value }),
  setHasWatchedRewardAd: (value) => set({ hasWatchedRewardAd: value }),
  startGame: () => {
    set({ isPlaying: true, hasWatchedRewardAd: false });
  },
  endGame: () => set({ isPlaying: false }),
}));
