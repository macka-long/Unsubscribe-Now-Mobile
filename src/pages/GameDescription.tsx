import { IonPage, IonContent, IonText, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import CurrentMoneyDisplay from "../components/CurrentMoneyDisplay";
// import { useMoneyStore } from "../store/moneyStore";

const GameDescription: React.FC = () => {
  const history = useHistory();
  // const money = useMoneyStore((state) => state.money);

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <div style={{ fontSize: "1rem", lineHeight: "1.8" }}>
          <h2>ゲーム概要</h2>
          <p>
            悪質サイト(仮)からの退会を目指すゲームになります。本ゲームで遊ぶサイトはかなり悪質であるため、サイトごとに月額ではなく、秒額が設定されています。
          </p>
          {/* <ul>
                        <li>ステージを選択して、ゲームスタート。</li>
                        <li>ゲームスタートすると、新規登録画面に遷移します。任意のユーザーID、パスワードを入力し、登録ボタンを押してください。</li>
                        <li>正常に新規登録が完了すると、退会完了まで被害金額が1秒ごとに増加します。被害金額はメーターで表示されます。</li>
                    </ul> */}
          <p>
            各サイトには会員新規登録画面があります。必要な情報を入力して、新規登録をしてください。新規登録が完了すると、サイトのトップページが表示され、ゲームがスタートします。
          </p>
          <p>
            ゲームがスタートすると、1秒おきに「所持金」から「サイトごとに設定された秒額」が引かれます。現在の所持金を表示するメーターが画面右上に表示されます。
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CurrentMoneyDisplay />
          </div>

          <p>
            ゲーム中に発生するイベントに応じて、結果が判定され、ゲームが終了します。
          </p>
          <ul>
            <li>所持金が無くなる</li>
            <p>⇨結果 : 退会失敗</p>
            <li>真の退会リンクを見つけて、クリックする</li>
            <p>⇨結果 : 退会成功</p>
          </ul>

          <h2>ゲームの始め方</h2>
          <p>1. ゲームトップ画面で、「ステージを選択する」タップ</p>
          <p>2. ステージ選択画面で、挑戦したいステージの番号をタップ</p>
          <p>3. 新規登録画面で、必要な情報を入力し、「登録」ボタンタップ</p>

          <p style={{ marginTop: "1rem" }}>
            一刻も早く、退会し、被害金額をなるべく少なくしましょう。
          </p>
          {/* <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
          </div> */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <IonText
              color="primary"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => history.push("/home")}
            >
              ゲームトップに戻る
            </IonText>
          </div>
          <br />
          <br />
          <br />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GameDescription;
