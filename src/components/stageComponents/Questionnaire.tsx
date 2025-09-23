import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useGameStore } from "../../store/gameStore";
import { loadInterstitial, showInterstitial } from "../AdInterstitial";
import CurrentMoneyDisplay from "../CurrentMoneyDisplay";
import CustomBackButton from "../CustomBackButton";
import { useEffect, useState } from "react";

const Questionnaire: React.FC = () => {
  const history = useHistory();
  const currentStage = useGameStore((s) => s.selectedStage);
  const siteName = currentStage?.title;
  const [reason, setReason] = useState<string>("使いづらい");
  const [otherText, setOtherText] = useState<string>("");

  useEffect(() => {
    console.log("インタースティシャル広告ロード from アンケート");
    loadInterstitial();
  }, []);

  const handleBack = async () => {
    showInterstitial();
    history.goBack();
  };

  const handleSubmit = () => {
    history.replace("/stages/1/login");
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
        <IonCard>
          <IonCardContent>
            <p>以下アンケートにご協力ください</p>
            <p>本サイトを退会する理由を教えてください。</p>

            <IonList>
              <IonRadioGroup
                value={reason}
                onIonChange={(e) => setReason(e.detail.value)}
              >
                <IonItem>
                  <IonLabel>料金が高すぎる</IonLabel>
                  <IonRadio slot="start" value="料金が高すぎる" />
                </IonItem>

                <IonItem>
                  <IonLabel>使いづらい</IonLabel>
                  <IonRadio slot="start" value="使いづらい" />
                </IonItem>

                <IonItem>
                  <IonLabel>それ以外（下に記入）</IonLabel>
                  <IonRadio slot="start" value="それ以外" />
                </IonItem>
              </IonRadioGroup>
            </IonList>

            <IonTextarea
              placeholder="ご意見を入力してください"
              value={otherText}
              onIonInput={(e) => setOtherText(e.detail.value!)}
            />

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={handleSubmit}
            >
              送信
            </IonButton>
          </IonCardContent>
        </IonCard>
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

export default Questionnaire;
