import { create } from "zustand";
import { Stage } from "../types/stage";
import { loadInterstitial } from "../components/AdInterstitial";
import { useMoneyStore } from "./moneyStore";

type GameState = {
  selectedStage: Stage | null;
  isPlaying: boolean;
  beforeStartMoney: number;
  hasWatchedRewardAd: boolean;
  timerId: number | null;
  ratePerSecond: number;
  isClear: boolean | null;
  setSelectedStage: (value: Stage) => void;
  setBeforeStartMoney: (value: number) => void;
  setHasWatchedRewardAd: (value: boolean) => void;
  setIsClear: (value: boolean | null) => void;
  startGame: (rate: number) => void;
  endGame: () => void;
  _startAutoDecrease: () => void; // 内部用
  _stopAutoDecrease: () => void; // 内部用
};

export const useGameStore = create<GameState>((set, get) => ({
  selectedStage: null,
  isPlaying: false,
  beforeStartMoney: 0,
  hasWatchedRewardAd: false,
  timerId: null,
  ratePerSecond: 0,
  isClear: null,
  setSelectedStage: (value) => set({ selectedStage: value }),
  setBeforeStartMoney: (value) => set({ beforeStartMoney: value }),
  setHasWatchedRewardAd: (value) => set({ hasWatchedRewardAd: value }),
  setIsClear: (value) => set({ isClear: value }),
  startGame: (rate: number) => {
    loadInterstitial();
    set({ isPlaying: true, ratePerSecond: rate, isClear: null });
    get()._startAutoDecrease();
  },
  endGame: () => {
    get()._stopAutoDecrease();
    set({ isPlaying: false, ratePerSecond: 0 });
  },
  _startAutoDecrease: () => {
    // 既に起動してれば何もしない（重複防止）
    if (get().timerId) return;

    const id = window.setInterval(() => {
      const { money, minMoney, decreaseMoney } = useMoneyStore.getState();
      const rate = get().ratePerSecond;
      if (money > minMoney) {
        decreaseMoney(rate);
      }
    }, 1000);

    set({ timerId: id });
  },

  _stopAutoDecrease: () => {
    const id = get().timerId;
    if (id) {
      console.log("タイマーidの初期化");
      clearInterval(id);
      set({ timerId: null });
    }
  },
}));
