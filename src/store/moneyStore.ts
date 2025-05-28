import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MoneyState {
  money: number;
  maxMoney: number;
  addMoney: (amount: number) => void;
  reduceMoney: (amount: number) => void;
  resetMoney: () => void;
}

export const useMoneyStore = create<MoneyState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'money-storage', // localStorageに保存されるキー
    }
  )
);
