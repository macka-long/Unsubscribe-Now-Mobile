import { IonText } from "@ionic/react";
import React, { useState } from "react";
import AdReward from "./AdReward";
import { useMoneyStore } from "../store/moneyStore";
import { useGameStore } from "../store/gameStore";

type StageResultProps = {
  isSuccess: boolean;
  totalLoss: number;
  onBackToStage: () => void;
  onBackToTop: () => void;
};

const StageResultPanel: React.FC<StageResultProps> = ({
  isSuccess,
  totalLoss,
  onBackToStage,
  onBackToTop,
}) => {
  const [showRewardAd, setShowRewardAd] = useState(false);
  const { hasWatchedRewardAd, setHasWatchedRewardAd } = useGameStore();

  const addMoney = useMoneyStore((s) => s.addMoney);
  const money = useMoneyStore((s) => s.money);
  const handleReward = () => {
    addMoney(totalLoss);
    setHasWatchedRewardAd(true);
    setShowRewardAd(false);
  };

  return (
    <div
      style={{ border: "1px solid #000", padding: "1rem", textAlign: "center" }}
    >
      <div
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: isSuccess ? "limegreen" : "red",
          fontFamily: "MyFont",
        }}
      >
        {isSuccess ? (
          <>
            退会完了！！
            <br />
            ステージクリア
          </>
        ) : (
          <>
            無一文！！
            <br />
            ステージ失敗
          </>
        )}
      </div>

      <div
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          fontFamily: "MyFont",
        }}
      >
        合計被害金額
      </div>
      <div
        style={{
          fontSize: "2rem",
          color: "red",
          fontWeight: "bold",
          marginBottom: "1rem",
          fontFamily: "MyFont",
        }}
      >
        {totalLoss.toLocaleString()}円
      </div>

      <div>
        <IonText
          color="primary"
          style={{
            textDecoration: !hasWatchedRewardAd ? "underline" : "none",
            cursor: !hasWatchedRewardAd ? "pointer" : "default",
            opacity: !hasWatchedRewardAd ? 1 : 0.5,
          }}
          onClick={
            !hasWatchedRewardAd ? () => setHasWatchedRewardAd(true) : undefined
          }
        >
          広告を見て、ステージ開始前の所持金までチャージする
        </IonText>
        {hasWatchedRewardAd && <AdReward rewardFunc={handleReward} />}
      </div>

      <div>
        <IonText
          color="primary"
          style={{
            cursor: money > 0 ? "pointer" : "default",
            textDecoration: money > 0 ? "underline" : "none",
            opacity: money > 0 ? 1 : 0.5,
          }}
          onClick={money > 0 ? () => onBackToStage() : undefined}
        >
          ステージ選択に戻る
        </IonText>
      </div>
      <div>
        <IonText
          color="primary"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={onBackToTop}
        >
          ゲームトップに戻る
        </IonText>
      </div>
    </div>
  );
};

export default StageResultPanel;
