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

const Contents: React.FC = () => {
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
          コンテンツ一覧
        </h3>
        <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
          申し訳ありません。
          <br />
          コンテンツはただいま準備中です。
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

export default Contents;
