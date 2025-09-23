import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RewardStore {
  lastRewarded: number | null;
  remainTime: number | null;
  updateTimestampRewarded: () => void;
  isElapsedRewardInterval: () => boolean;
}

export const useRewardStore = create<RewardStore>()(
  persist(
    (set, get) => ({
      lastRewarded: null,
      updateTimestampRewarded: () => {
        set({ lastRewarded: Date.now() });
      },
      remainTime: null,
      isElapsedRewardInterval: () => {
        const { lastRewarded } = get();
        if (!lastRewarded) return true; // 初回ならOKにする

        const now = Date.now();
        const elapsedMs = now - lastRewarded; // ミリ秒差分

        const threeHoursMs = 60 * 1000; // 3時間 = 10800000 ms
        const remainTime = Math.max(threeHoursMs - elapsedMs, 0);
        set({ remainTime: remainTime });

        return elapsedMs >= threeHoursMs;
      },
    }),
    {
      name: "reward-record",
    }
  )
);
