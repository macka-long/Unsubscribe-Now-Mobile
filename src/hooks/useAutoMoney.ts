import { useEffect } from "react";
import { useMoneyStore } from "../store/moneyStore";

// function formatLastUpdatedDate(timestamp: number): string {
//   const date = new Date(timestamp);
//   const formatter = new Intl.DateTimeFormat("ja-JP", {
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false, // 24時間表記
//   });

//   // "MM/DD HH:MM" だけ欲しいので、部品を組み合わせる
//   const parts = formatter.formatToParts(date);
//   const month = parts.find((p) => p.type === "month")?.value || "";
//   const day = parts.find((p) => p.type === "day")?.value || "";
//   const hour = parts.find((p) => p.type === "hour")?.value || "";
//   const minute = parts.find((p) => p.type === "minute")?.value || "";

//   return `${month}/${day} ${hour}:${minute}`;
// }

// 共通の差分加算ロジック
// function applyEarnings() {
//   const { money, maxMoney, addMoney, lastUpdated, setLastUpdated } =
//     useMoneyStore.getState();

//   const now = Date.now();
//   const elapsed = now - lastUpdated;
//   const elapsedMinutes = Math.floor(elapsed / 60000);

//   if (elapsedMinutes >= 5) {
//     const earnedCycles = Math.floor(elapsedMinutes / 5); // 5分単位
//     const earned = earnedCycles * 5000;
//     const newMoney = Math.min(money + earned, maxMoney);

//     // lastUpdatedをサイクル分だけ進める（余りは保持）
//     const updatedTime = lastUpdated + earnedCycles * 5 * 60 * 1000;

//     addMoney(newMoney);
//     setLastUpdated(updatedTime);
//     console.log("加算:", earned, "残余:", elapsedMinutes % 5, "分");
//   }
// }

/**
 * 一定時間（5分ごと）ごとに所持金を自動で加算するHook。
 * localStorageから復元された所持金に対しても機能する。
 */
const useAutoMoney = () => {
  // const updateTimestamp = useMoneyStore((s) => s.updateTimestamp);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("useAutoMoney発火");
      // const { money, maxMoney, addMoney, lastUpdated } =
      //   useMoneyStore.getState();
      // const now = Date.now();
      // const elapsedMs = now - lastUpdated;

      // if (elapsedMs >= 5 * 60 * 1000) {
      //   // 5分以上経過
      //   if (money < maxMoney) {
      //     addMoney(5000);
      //     updateTimestamp();
      //     const updated = useMoneyStore.getState().lastUpdated;
      //     console.log("更新日時更新 : " + formatLastUpdatedDate(updated));
      //   }
      // }
      useMoneyStore.getState().applyEarnings();
    }, 1000); // １分ごとa

    return () => clearInterval(interval); // クリーンアップ
  }, []); // 一度だけ実行（マウント時）
};

export default useAutoMoney;
