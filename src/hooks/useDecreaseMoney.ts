import { useEffect } from "react";
import { useMoneyStore } from "../store/moneyStore";
import { useGameStore } from "../store/gameStore";

/**
 * 一定時間（1秒）ごとに所持金を各ステージに設定された秒額で自動で減算するHook。
 */
const useAutoDecreaseMoney = (ratePerSecond: number) => {
  const isPlaying = useGameStore((s) => s.isPlaying);
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const { money, minMoney, decreaseMoney } = useMoneyStore.getState();
      if (money > minMoney) {
        decreaseMoney(ratePerSecond);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);
};

export default useAutoDecreaseMoney;
