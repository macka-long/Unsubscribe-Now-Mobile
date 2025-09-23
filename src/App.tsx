// import "./App.css";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { App as CapacitorApp } from "@capacitor/app";

import GameTopScreen from "./pages/GameTopScreen";
import { useMoneyStore } from "./store/moneyStore";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import GameDescription from "./pages/GameDescription";
import StageSelect from "./pages/StageSelect";
import { Suspense, useEffect } from "react";
import { AdMob } from "@capacitor-community/admob";
import RegisterPage from "./pages/Register";
import TermsPage from "./pages/Terms";

import Result from "./pages/Result";
import { stageRoutes } from "./routes/stageRoutes";
import LoginPage from "./components/stageComponents/LoginPage";
import { useGameStore } from "./store/gameStore";
import { PluginListenerHandle } from "@capacitor/core";

setupIonicReact({
  hardwareBackButton: false,
  swipeBackEnabled: false,
});

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0始まりなので+1
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const AppInner: React.FC = () => {
  useEffect(() => {
    AdMob.initialize();
  }, []);

  const addOfflineEarnings = useMoneyStore((s) => s.addOfflineEarnings);

  useEffect(() => {
    let listener: PluginListenerHandle;

    (async () => {
      listener = await CapacitorApp.addListener(
        "appStateChange",
        ({ isActive }) => {
          const isPlaying = useGameStore.getState().isPlaying;
          if (isActive && !isPlaying) {
            const now = Date.now();
            console.log("現在 : ", now);
            const lastUpdated = useMoneyStore.getState().lastUpdated;
            console.log("最終更新 : ", lastUpdated);
            const elapsed = Math.floor((now - lastUpdated) / 1000); // 秒
            const elapsedMinutes = Math.floor(elapsed / 60);
            console.log("経過分", elapsedMinutes);
            const message =
              "最終更新日時 : " +
              formatDate(lastUpdated) +
              "\n" +
              "経過分 : " +
              elapsedMinutes;
            // alert(message);
            addOfflineEarnings(); // 差分加算
          }

          if (!isActive && isPlaying) {
            console.log(isPlaying);
            alert("ゲームを再開するときはOKを押してください");
          }
        }
      );
    })();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);

  useEffect(() => {
    const routes = Object.entries(stageRoutes).flatMap(([id, paths]) =>
      paths.map(({ path }) => `/stages/${id}${path ? `/${path}` : ""}`)
    );
    console.log("Registered Routes:", routes);
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <GameTopScreen />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/description">
            <GameDescription />
          </Route>
          <Route exact path="/stages">
            <StageSelect />
          </Route>

          {Object.entries(stageRoutes).flatMap(([stageId, routes]) =>
            routes.map(({ path, component: Component }, i) => (
              <Route
                key={`stage-${stageId}-${i}`}
                exact
                path={`/stages/${stageId}${path ? `/${path}` : ""}`}
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Component />
                  </Suspense>
                )}
              />
            ))
          )}

          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/terms">
            <TermsPage />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/result">
            <Result />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppInner />
    </IonReactRouter>
  </IonApp>
);

export default App;
