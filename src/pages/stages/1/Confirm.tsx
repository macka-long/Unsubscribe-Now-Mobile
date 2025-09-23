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
// import { useTotalLoss } from "../../../hooks/useTotalLoss";

const Confirm: React.FC = () => {
  const currentStage = useGameStore((s) => s.selectedStage);
  const siteName = currentStage?.title;
  const history = useHistory();
  // const endGame = useGameStore((s) => s.endGame);
  // const beforeStartMoney = useGameStore((s) => s.beforeStartMoney);
  const setIsClear = useGameStore((s) => s.setIsClear);

  const goBack = () => {
    history.goBack();
  };

  const onUnsubscribe = () => {
    setIsClear(true);
    // endGame();
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // const totalLoss = useTotalLoss(beforeStartMoney);
    // history.replace("/result", {
    //   isSuccess: true,
    //   totalLoss: totalLoss,
    // });
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
          onClick={onUnsubscribe}
        >
          退会する
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Confirm;
