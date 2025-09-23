import { useEffect, useRef } from "react";
import { useMoneyStore } from "../store/moneyStore";
import { useGameStore } from "../store/gameStore";

/**
 * 一定時間（1秒）ごとに所持金を各ステージに設定された秒額で自動で減算するHook。
 */
const useAutoDecreaseMoney = (ratePerSecond: number) => {
  const isPlaying = useGameStore((s) => s.isPlaying);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    console.log("自動減算発火");
    if (isPlaying) {
      // すでに interval がある場合は作らない
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          const { money, minMoney, decreaseMoney } = useMoneyStore.getState();
          if (money > minMoney) {
            decreaseMoney(ratePerSecond);
          }
        }, 1000);
      }
    } else {
      // isPlaying が false になったら確実に停止
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // アンマウント時の保険
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, ratePerSecond]);
};

export default useAutoDecreaseMoney;
