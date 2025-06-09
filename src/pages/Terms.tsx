import {
  IonPage,
  IonContent,
  IonText
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';

interface LocationState {
  ratePerSecond: number;
  siteName?: string;
}

const TermsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const rate = location.state?.ratePerSecond ?? 0;
  const siteName = location.state?.siteName ?? 'サイト名';

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{siteName}</h2>
        <h3 style={{ color: 'green', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>
          利用規約
        </h3>

        <ul style={{ lineHeight: '1.8' }}>
          <li>本サイトは、会員限定にコンテンツを配信するサイトになります。</li>
          <li>本サイトで配信するコンテンツは、準備中になります。</li>
          <li>
            本サイトの会員は、本サイトの利用料として、
            秒額{rate.toLocaleString()}円の支払いが必要になります。
          </li>
          <li>利用料は、退会するまで請求されます。</li>
          <li>本サイトの会員は本サイトが定める退会手続きを行うことで、退会をすることが可能です。</li>
        </ul>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <IonText
            color="primary"
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => history.goBack()}
          >
            戻る
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TermsPage;
