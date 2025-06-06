import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MoneyState {
  money: number;
  maxMoney: number;
  addMoney: (amount: number) => void;
  reduceMoney: (amount: number) => void;
  resetMoney: () => void;
  lastUpdated: number | null;
  updateTimestamp: () => void;
  addOfflineEarnings: () => void;
}

export const useMoneyStore = create<MoneyState>()(
  persist(
    (set, get) => ({
      money: 0,
      maxMoney: 50000,
      addMoney: (amount) =>
        set((state) => {
          const updated = Math.min(state.money + amount, state.maxMoney);
          return { money: updated };
        }),
      reduceMoney: (amount) =>
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
        const { lastUpdated, money, maxMoney, addMoney } = get();
        if (!lastUpdated) return;

        const now = Date.now();
        const elapsed = Math.floor((now - lastUpdated) / 1000); // 秒

        const earned = Math.floor(elapsed / 10) * 5000;

        if (earned > 0) {
          const newMoney = Math.min(money + earned, maxMoney);
          set({ money: newMoney });
        }
      },
    }),
    {
      name: 'money-storage', // localStorageに保存されるキー
    }
  )
);
