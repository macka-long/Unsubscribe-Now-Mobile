import "./App.css"
import { Redirect, Route, useLocation } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import GameTopScreen from './pages/GameTopScreen';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import GameDescription from './pages/GameDescription';
import StageSelect from './pages/StageSelect';
import { useEffect } from 'react';
import { AdMob } from '@capacitor-community/admob';
import RegisterPage from './pages/Register';
import TermsPage from './pages/Terms';
import StageRunner from './pages/StageRunner';
import Contents from './pages/stagePages/Contents';
import CurrentMoneyDisplay from './components/CurrentMoneyDisplay';
import LoginPage from './pages/stagePages/LoginPage';
import Result from './pages/Result';

setupIonicReact();


const AppInner: React.FC = () => {
  useEffect(() => {
    AdMob.initialize();
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
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/terms">
            <TermsPage />
          </Route>
          <Route exact path="/stage-play">
            <StageRunner />
          </Route>
          <Route exact path="/contents">
            <Contents />
          </Route>
          <Route exact path="/login-page">
            <LoginPage />
          </Route>
          <Route exact path="/result">
            <Result />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppInner />
    </IonReactRouter>
  </IonApp>
);

export default App;
