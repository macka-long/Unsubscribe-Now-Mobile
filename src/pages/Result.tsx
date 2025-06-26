import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import CurrentMoneyDisplay from '../components/CurrentMoneyDisplay';
import StageResultPanel from '../components/StageResultPanel';
import { useMoneyStore } from '../store/moneyStore';
import { useHistory, useLocation } from 'react-router';

interface ResultLocationState {
    isSuccess: boolean;
    totalLoss: number;
}

const Result: React.FC = () => {
    const history = useHistory();

    const location = useLocation<ResultLocationState>();

    const isSuccess = location.state?.isSuccess ?? false;
    const totalLoss = location.state?.totalLoss ?? 0;

    return (
        <IonPage>
            <IonContent className="ion-padding" style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>サイト名</h1>
                <p style={{ marginBottom: '2rem', fontSize: '1rem' }}>
                    本サイトをご利用していただきありがとうございました。<br />
                    またのご利用をお待ちしております。
                </p>

                <StageResultPanel
                    isSuccess={isSuccess}
                    totalLoss={totalLoss}
                    onBackToStage={() => {
                        history.push("/stages");
                    }}
                    onBackToTop={() => {
                        history.push("/home");
                    }}
                />
            </IonContent>
        </IonPage>
    );
};

export default Result;
