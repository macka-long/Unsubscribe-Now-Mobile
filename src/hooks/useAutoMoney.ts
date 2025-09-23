import { useEffect } from "react";
import { useMoneyStore } from "../store/moneyStore";

/**
 * 一定時間（10秒）ごとに所持金を自動で加算するHook。
 * localStorageから復元された所持金に対しても機能する。
 */
const useAutoMoney = () => {
  const updateTimestamp = useMoneyStore((s) => s.updateTimestamp);
  useEffect(() => {
    const interval = setInterval(() => {
      const { money, maxMoney, addMoney } = useMoneyStore.getState();
      if (money < maxMoney) {
        addMoney(5000);
      }
      updateTimestamp();
    }, 300000); // 5分ごと

    return () => clearInterval(interval); // クリーンアップ
  }, []); // 一度だけ実行（マウント時）
};

export default useAutoMoney;
