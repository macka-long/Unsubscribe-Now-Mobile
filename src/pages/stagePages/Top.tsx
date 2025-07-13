import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { PageComponentProps } from "../../types/PageComponentProps";
import { useStageStore } from "../../store/stageStore";
import AdNativeWrapper from "../../components/AdNativeWrapper";
import SiteMenu from "../../components/SiteMenu";

const Top: React.FC<PageComponentProps> = ({ onNext }) => {
  const history = useHistory();
  const stage = useStageStore((s) => s.currentStage);
  const siteName = stage?.title;

  return (
    <div className="ion-padding">
      <h2 style={{ marginBottom: "2rem" }}>{siteName}</h2>
      <SiteMenu
        onClickContents={() => history.push("/contents", { siteName })}
        onClickMyPage={() => {
          return null;
        }}
        onClickTerms={() =>
          history.push("/terms", {
            ratePerSecond: stage?.ratePerSecond,
            siteName: siteName,
            isStarted: true,
          })
        }
        onClickLogout={() => history.push("/login-page")}
      ></SiteMenu>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
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
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
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
          onClick={() => onNext && onNext()}
        >
          退会する
        </IonText>
      </div>
    </div>
  );
};

export default Top;
