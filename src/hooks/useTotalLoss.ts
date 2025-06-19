import { useMoneyStore } from '../store/moneyStore';

export function useTotalLoss( beforeStartMoney: number) {
  const currentMoney = () => useMoneyStore.getState().money;
  return beforeStartMoney - currentMoney();
}
