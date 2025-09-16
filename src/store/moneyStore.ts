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
        // console.log(
        //   "localStorage:",
        //   JSON.parse(localStorage.getItem("money-storage") || "{}")
        // );
        // console.log("初期所持金 : ", money);
        if (!lastUpdated) return;

        const now = Date.now();
        // console.log("現在 : ", now);
        // console.log("最終更新 : ", lastUpdated);
        const elapsed = Math.floor((now - lastUpdated) / 1000); // 秒
        const elapsedMinutes = Math.floor(elapsed / 60);
        // console.log("経過分", elapsedMinutes);

        const earned = Math.floor(elapsedMinutes / 5) * 5000;
        // console.log("経過分の稼ぎ : ", earned);

        if (earned > 0) {
          const newMoney = Math.min(money + earned, maxMoney);
          // console.log(newMoney);
          set({ money: newMoney });
          set({ lastUpdated: Date.now() });
        }
      },
    }),
    {
      name: "money-storage", // localStorageに保存されるキー
    }
  )
);
