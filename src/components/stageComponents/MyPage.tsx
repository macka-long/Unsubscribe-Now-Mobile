import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import CurrentMoneyDisplay from "../../components/CurrentMoneyDisplay";
import CustomBackButton from "../../components/CustomBackButton";
import AdNativeWrapper from "../../components/AdNativeWrapper";
import { useGameStore } from "../../store/gameStore";
import { loadInterstitial, showInterstitial } from "../AdInterstitial";
import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";

const MyPage: React.FC = () => {
  const history = useHistory();
  const currentStage = useGameStore((s) => s.selectedStage);
  const siteName = currentStage?.title;

  useEffect(() => {
    console.log("インタースティシャル広告ロード from コンテンツ");
    loadInterstitial();
  }, []);
  const handleBack = async () => {
    showInterstitial();
    history.goBack();
  };

  const loginId = useUserStore((s) => s.loginId);
  const password = useUserStore((s) => s.password);

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
            <CustomBackButton handleBack={handleBack} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 style={{ marginBottom: "2rem" }}>{siteName}</h2>
        <h3
          style={{
            color: "green",
            fontWeight: "bold",
            fontSize: "1.25rem",
            marginBottom: "1rem",
          }}
        >
          マイページ
        </h3>
        <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
          ログインID : {loginId}
        </p>
        <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
          パスワード : {password}
        </p>

        <AdNativeWrapper />
      </IonContent>

      {/* <IonButton
        style={{ backgroundColor: '#f9a825', color: '#000' }}
        onClick={() => history.goBack()}
      >
        サイトトップへ
      </IonButton> */}
    </IonPage>
  );
};

export default MyPage;
