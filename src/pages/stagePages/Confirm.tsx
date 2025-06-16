import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { PageComponentProps } from '../../types/PageComponentProps';
import CurrentMoneyDisplay from '../../components/CurrentMoneyDisplay';
import { useStageStore } from '../../store/stageStore';
import CustomBackButton from '../../components/CustomBackButton';
import { useHistory } from 'react-router';

const Confirm: React.FC<PageComponentProps> = ({ onComplete }) => {
  const stage = useStageStore((s) => s.currentStage);
  const goBack = useStageStore((s) => s.goBack);
  const siteName = stage?.title;

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
            <CustomBackButton handleBack={ goBack }/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 style={{ marginBottom: '2rem' }}>{siteName}</h2>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
          退会すると、本サイトのコンテンツにはアクセスできなくなります。<br />
          本当に退会しますか？
        </p>

        <IonText
          color="primary"
          style={{ textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }}
          onClick={() => onComplete && onComplete()}
        >
          退会する
        </IonText>

      </IonContent>
    </IonPage>
  );
};

export default Confirm;

