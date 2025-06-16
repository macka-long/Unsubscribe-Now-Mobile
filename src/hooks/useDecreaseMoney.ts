import { useEffect } from "react";
import { useMoneyStore } from "../store/moneyStore";

/**
 * 一定時間（1秒）ごとに所持金を各ステージに設定された秒額で自動で減算するHook。
 */
const useAutoDecreaseMoney = (ratePerSecond: number) => {
    useEffect(() => {
        const interval = setInterval(() => {
            const { money, minMoney, decreaseMoney } = useMoneyStore.getState();
            if (money > minMoney) {
                decreaseMoney(ratePerSecond);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
};

export default useAutoDecreaseMoney;