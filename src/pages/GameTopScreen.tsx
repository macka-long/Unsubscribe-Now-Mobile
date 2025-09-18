import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMoneyStore } from "../store/moneyStore";
import useAutoMoney from "../hooks/useAutoMoney";
import AdBanner from "../components/AdBanner";
import AdReward from "../components/AdReward";
import { useRewardStore } from "../store/rewardStore";

const formatDate = (timestamp: number | null) => {
  if (timestamp == null) return "";
  const totalSeconds = Math.floor(timestamp / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const GameTopScreen: React.FC = () => {
  const history = useHistory();
  useAutoMoney();

  const addOfflineEarnings = useMoneyStore((s) => s.addOfflineEarnings);
  useEffect(() => {
    addOfflineEarnings(); // 差分加算
  }, []);

  const [showRewardAd, setShowRewardAd] = useState(false);
  const isElapsedRewardInterval = useRewardStore(
    (s) => s.isElapsedRewardInterval
  );

  const remainTime = useRewardStore((s) => s.remainTime);

  const [isEnableRewardAnchor, setIsEnableRewardAnchor] = useState(true);

  useEffect(() => {
    // 初期評価
    setIsEnableRewardAnchor(isElapsedRewardInterval());
    // 1秒ごとに再評価
    const interval = setInterval(() => {
      setIsEnableRewardAnchor(isElapsedRewardInterval());
    }, 1000);

    return () => clearInterval(interval);
  }, [isElapsedRewardInterval]);

  const onClickReward = () => {
    if (isEnableRewardAnchor) {
      setShowRewardAd(true);
    }
  };

  const addMoney = useMoneyStore((state) => state.addMoney);
  const updateTimestampRewarded = useRewardStore(
    (s) => s.updateTimestampRewarded
  );
  const handleReward = () => {
    addMoney(50000);
    setShowRewardAd(false);
    updateTimestampRewarded();
  };

  const money = useMoneyStore((state) => state.money);
  const resetMoney = useMoneyStore((state) => state.resetMoney);
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <h1
          style={{
            letterSpacing: "0.3em",
            fontSize: "2rem",
            fontWeight: "bold",
            fontFamily: "MyFont",
          }}
        >
          退会せよ！！
        </h1>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle
              style={{ letterSpacing: "0.3em", fontFamily: "MyFont" }}
            >
              所持金情報
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p
              style={{
                fontSize: "1.5rem",
                letterSpacing: "0.3em",
                textAlign: "right",
                fontFamily: "MyFont",
              }}
            >
              {money.toLocaleString()}円
            </p>
            <ul>
              <li>5分経過で5,000円貯まります</li>
              <li>最大は50,000円です</li>
              <IonText
                color="primary"
                onClick={resetMoney}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                (デバッグ用)所持金リセット
              </IonText>
              <IonText
                color="primary"
                onClick={() => {
                  addMoney(3000);
                  console.log(
                    "localStorage:",
                    JSON.parse(localStorage.getItem("money-storage") || "{}")
                  );
                }}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                (デバッグ用)3000円加算
              </IonText>
            </ul>
          </IonCardContent>
        </IonCard>
        <div className="ion-margin-top">
          <h2 style={{ fontWeight: "bold", fontFamily: "MyFont" }}>ゲーム</h2>
          <div
            className="ion-margin-top"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <IonText
              color="primary"
              onClick={() => history.push("/description")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              ゲームの説明を見る
            </IonText>
            <IonText
              color="primary"
              onClick={money > 0 ? () => history.push("/stages") : undefined}
              style={{
                cursor: money > 0 ? "pointer" : "default",
                textDecoration: money > 0 ? "underline" : "none",
                opacity: money > 0 ? 1 : 0.5,
              }}
            >
              ステージを選択する
            </IonText>
          </div>
        </div>
        <div className="ion-margin-top">
          <h2 style={{ fontWeight: "bold", fontFamily: "MyFont" }}>ストア</h2>
          <IonText
            color="primary"
            onClick={onClickReward}
            style={{
              textDecoration: isEnableRewardAnchor ? "underline" : "none",
              cursor: isEnableRewardAnchor ? "pointer" : "default",
              opacity: isEnableRewardAnchor ? 1 : 0.5,
            }}
          >
            広告を見て、所持金フルチャージ(3時間に1回)
          </IonText>
          {showRewardAd && <AdReward rewardFunc={handleReward} />}
          <br></br>
          {remainTime !== 0 && (
            <IonText>回復まで{formatDate(remainTime)}</IonText>
          )}
        </div>
        <AdBanner /> {/* バナー表示 */}
      </IonContent>
    </IonPage>
  );
};

export default GameTopScreen;
