import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonButtons,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useGameStore } from "../../../store/gameStore";
import {
  loadInterstitial,
  showInterstitial,
} from "../../../components/AdInterstitial";
import CustomBackButton from "../../../components/CustomBackButton";
import CurrentMoneyDisplay from "../../../components/CurrentMoneyDisplay";
import { useUserStore } from "../../../store/userStore";

const LoginPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    console.log("インタースティシャル広告ロード from ステージ５ログイン");
    loadInterstitial();
  }, []);
  const goBack = () => {
    showInterstitial();
    history.goBack();
  };

  const [inputLoginId, setInputLoginId] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const registerdLoginId = useUserStore((s) => s.loginId);
  const registerdPassword = useUserStore((s) => s.password);
  const setIsClear = useGameStore((s) => s.setIsClear);

  const handleLogin = () => {
    if (inputLoginId != registerdLoginId) {
      alert("ログインIDが間違っています");
      return;
    }

    if (inputPassword != registerdPassword) {
      alert("パスワードが間違っています");
      return;
    }

    setIsClear(true);
  };

  return (
    <IonPage>
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          pointerEvents: "none", // ← これでUI邪魔しない
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
      <IonContent
        className="ion-padding"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <h1 style={{ fontSize: '2rem', marginTop: '4rem', fontWeight: 'bold' }}>サイト名</h1> */}
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          ユーザー認証
        </h3>

        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          退会には、ユーザー認証が必要です。新規登録で登録した情報を入力して、「退会」ボタンを押してください。
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <IonInput
            placeholder="ログインID"
            value={inputLoginId}
            onIonChange={(e) => setInputLoginId(e.detail.value!)}
            style={{ border: "1px solid #000", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <IonInput
            type="password"
            placeholder="パスワード"
            value={inputPassword}
            onIonChange={(e) => setInputPassword(e.detail.value!)}
            style={{ border: "1px solid #000", padding: "0.5rem" }}
          />
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <IonButton
            onClick={handleLogin}
            style={{ backgroundColor: "#f9a825", color: "black" }}
          >
            退会
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
