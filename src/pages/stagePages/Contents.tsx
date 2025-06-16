import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Stage } from '../../types/stage';
import { PageComponentProps } from '../../types/PageComponentProps';
import CurrentMoneyDisplay from '../../components/CurrentMoneyDisplay';
import CustomBackButton from '../../components/CustomBackButton';
import AdNativeWrapper from '../../components/AdNativeWrapper';

interface LocationState {
  siteName?: string;
}

const Contents: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const siteName = location.state?.siteName ?? 'サイト名';

  const handleBack = () => {
    history.goBack();
  };


  return (
    <IonPage>
      <div style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 9999,
        pointerEvents: 'none' // ← これでUI邪魔しない
      }}>
        <CurrentMoneyDisplay />
      </div>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <CustomBackButton handleBack={ handleBack }/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <h2 style={{ marginBottom: '2rem' }}>{siteName}</h2>
        <h3 style={{ color: 'green', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>
          コンテンツ一覧
        </h3>
        <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
          申し訳ありません。<br />
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
