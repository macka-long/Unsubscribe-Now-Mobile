import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MoneyState {
  money: number;
  minMoney: number;
  maxMoney: number;
  addMoney: (amount: number) => void;
  decreaseMoney: (amount: number) => void;
  resetMoney: () => void;
  lastUpdated: number | null;
  updateTimestamp: () => void;
  addOfflineEarnings: () => void;
  applyEarnings: () => void;
}

export const useMoneyStore = create<MoneyState>()(
  persist(
    (set, get) => ({
      money: 0,
      minMoney: 0,
      maxMoney: 50000,
      addMoney: (amount) =>
        set((state) => {
          const updated = Math.min(state.money + amount, state.maxMoney);
          return { money: updated };
        }),
      decreaseMoney: (amount) =>
        set((state) => {
          const updated = Math.max(state.money - amount, 0);
          return { money: updated };
        }),
      resetMoney: () => set({ money: 0 }),
      lastUpdated: null,
      updateTimestamp: () => {
        set({ lastUpdated: Date.now() });
      },
      addOfflineEarnings: () => {
        const { lastUpdated, money, maxMoney } = get();
        if (!lastUpdated) return;

        const now = Date.now();
        const elapsed = Math.floor((now - lastUpdated) / 1000); // 秒
        const elapsedMinutes = Math.floor(elapsed / 60);

        const earned = Math.floor(elapsedMinutes / 5) * 5000;

        if (earned > 0) {
          const newMoney = Math.min(money + earned, maxMoney);
          const updatedTime =
            lastUpdated + (elapsedMinutes - (elapsedMinutes % 5)) * 60 * 1000;

          set({ money: newMoney });
          set({ lastUpdated: updatedTime });
        }
      },
      applyEarnings: () => {
        const { addMoney, lastUpdated } = get();
        const lastUpdatedTime = lastUpdated ? lastUpdated : 0;
        const now = Date.now();
        const elapsed = now - lastUpdatedTime;
        const elapsedMinutes = Math.floor(elapsed / 60000);

        if (elapsedMinutes >= 5) {
          const earnedCycles = Math.floor(elapsedMinutes / 5); // 5分単位
          const earned = earnedCycles * 5000;

          // lastUpdatedをサイクル分だけ進める（余りは保持）
          const updatedTime = lastUpdatedTime + earnedCycles * 5 * 60 * 1000;

          addMoney(earned);
          set({ lastUpdated: updatedTime });
          console.log("加算:", earned, "残余:", elapsedMinutes % 5, "分");
        }
      },
    }),
    {
      name: "money-storage", // localStorageに保存されるキー
    }
  )
);
