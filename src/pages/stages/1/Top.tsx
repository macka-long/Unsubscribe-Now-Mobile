import { IonContent, IonPage, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";

import { useGameStore } from "../../../store/gameStore";
import { useEffect } from "react";
import { useMoneyStore } from "../../../store/moneyStore";
import { useTotalLoss } from "../../../hooks/useTotalLoss";
import SiteMenu from "../../../components/SiteMenu";
import AdNativeWrapper from "../../../components/AdNativeWrapper";
import CurrentMoneyDisplay from "../../../components/CurrentMoneyDisplay";
import useAutoDecreaseMoney from "../../../hooks/useDecreaseMoney";

const Top: React.FC = () => {
  const history = useHistory();
  const stage = useGameStore((s) => s.selectedStage);
  const siteName = stage?.title;
  const endGame = useGameStore((s) => s.endGame);
  const beforeStartMoney = useGameStore((s) => s.beforeStartMoney);
  const ratePerSecond = stage ? stage.ratePerSecond : 0;
  useAutoDecreaseMoney(ratePerSecond);

  useEffect(() => {
    const unsubscribe = useMoneyStore.subscribe((s) => {
      if (s.money <= 0) {
        endGame();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const totalLoss = useTotalLoss(beforeStartMoney);
        history.replace("/result", {
          isSuccess: false,
          totalLoss: totalLoss,
        });
      }
    });
    return () => unsubscribe();
  }, [history]);

  return (
    <IonPage>
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          // pointerEvents: "none", // ← これでUI邪魔しない
        }}
      >
        <CurrentMoneyDisplay />
      </div>
      <IonContent className="ion-padding">
        <h2 style={{ marginBottom: "2rem" }}>{siteName}</h2>

        <SiteMenu
          onClickContents={() => history.push("/stages/1/contents")}
          onClickMyPage={() => {
            return null;
          }}
          onClickTerms={() =>
            history.push("/stages/1/terms", {
              ratePerSecond: stage?.ratePerSecond,
              siteName: siteName,
              isStarted: true,
            })
          }
          onClickLogout={() => history.push("/stages/1/login")}
        ></SiteMenu>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#ddd",
                height: "100px",
                border: "1px solid #000",
              }}
            />
          ))}
        </div>

        <AdNativeWrapper />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#ddd",
                height: "100px",
                border: "1px solid #000",
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <IonText
            color="primary"
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.75rem",
              paddingBottom: "60px",
            }}
            onClick={() => {
              history.push("/stages/1/confirm");
            }}
          >
            退会する
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Top;
