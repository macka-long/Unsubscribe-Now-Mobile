import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import { useUserStore } from "../../store/userStore";
import { useHistory } from "react-router";
import CurrentMoneyDisplay from "../../components/CurrentMoneyDisplay";

const LoginPage: React.FC = () => {
  const history = useHistory();

  const [inputLoginId, setInputLoginId] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const registerdLoginId = useUserStore((s) => s.loginId);
  const registerdPassword = useUserStore((s) => s.password);

  const handleLogin = () => {
    if (inputLoginId != registerdLoginId) {
      alert("ログインIDが間違っています");
      return;
    }

    if (inputPassword != registerdPassword) {
      alert("パスワードが間違っています");
      return;
    }

    // setResult(true);
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
          pointerEvents: "none", // ← これでUI邪魔しない
        }}
      >
        <CurrentMoneyDisplay />
      </div>
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
          ログイン
        </h3>

        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          ログインIDとパスワードを入力して、登録ボタンをクリックしてください
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
            ログイン
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
