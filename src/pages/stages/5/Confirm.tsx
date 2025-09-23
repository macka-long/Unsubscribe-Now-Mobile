import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import CurrentMoneyDisplay from "../../../components/CurrentMoneyDisplay";
import CustomBackButton from "../../../components/CustomBackButton";
import { useGameStore } from "../../../store/gameStore";
import { useHistory } from "react-router";
import AdNativeWrapper from "../../../components/AdNativeWrapper";
import { useEffect } from "react";
import {
  loadInterstitial,
  showInterstitial,
} from "../../../components/AdInterstitial";
// import { useTotalLoss } from "../../../hooks/useTotalLoss";

const Confirm: React.FC = () => {
  const currentStage = useGameStore((s) => s.selectedStage);
  const siteName = currentStage?.title;
  const history = useHistory();
  useEffect(() => {
    console.log("インタースティシャル広告ロード from ステージ５退会確認");
    loadInterstitial();
  }, []);
  const goBack = () => {
    showInterstitial();

    history.goBack();
  };

  return (
    <IonPage>
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
        }}
      >
        <CurrentMoneyDisplay />
      </div>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <CustomBackButton handleBack={goBack} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 style={{ marginBottom: "2rem" }}>{siteName}</h2>

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "2rem",
          }}
        >
          退会すると、本サイトのコンテンツにはアクセスできなくなります。
          <br />
          本当に退会しますか？
        </p>
        <AdNativeWrapper />
        <br />
        <br />
        <br />
        <br />

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "2rem",
          }}
        >
          本当に退会しますか？
        </p>
        <IonText
          color="primary"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
          onClick={() => {
            history.push("/stages/5/login");
          }}
        >
          退会する
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Confirm;
