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
// import { useTotalLoss } from "../../../hooks/useTotalLoss";
import AdNativeWrapper from "../../../components/AdNativeWrapper";

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const totalLoss = useTotalLoss(beforeStartMoney);
    // history.replace("/result", {
    //   isSuccess: true,
    //   totalLoss: totalLoss,
    // });
  };

  const onClickQuestionnaire = () => {
    history.push("/stages/2/questionnaire");
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

        <p
          style={{
            fontSize: "1.5rem",
            lineHeight: "1.8",
            color: "red",
          }}
        >
          アンケートにご協力のお願い
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "2rem",
          }}
        >
          私たちは、みなさまの日常生活をより豊かにするために、本サイトの改善に努めています。
          この度、今後のサイトサービス向上に向けた貴重なご意見を賜りたく、「アンケート」を実施させていただきます。
        </p>

        <IonText
          color="primary"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
          onClick={onClickQuestionnaire}
        >
          アンケートに答える
        </IonText>

        <AdNativeWrapper />
        <br />
        <br />
        <br />
        <br />
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
        <br />
        <br />
        <br />
      </IonContent>
    </IonPage>
  );
};

export default Confirm;
