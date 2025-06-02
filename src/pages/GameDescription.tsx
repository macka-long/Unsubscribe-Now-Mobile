import {
    IonPage,
    IonContent,
    IonText,
    IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import CurrentMoneyDisplay from '../components/CurrentMoneyDisplay';

const GameDescription: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent className="ion-padding" color="light">
                <div style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                    <ul>
                        <li>ステージを選択して、ゲームスタート。</li>
                        <li>ゲームスタートすると、新規登録画面に遷移します。任意のユーザーID、パスワードを入力し、登録ボタンを押してください。</li>
                        <li>正常に新規登録が完了すると、退会完了まで被害金額が1秒ごとに増加します。被害金額はメーターで表示されます。</li>
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CurrentMoneyDisplay />
                    </div>
                    
                    <ul>
                        <li>退会完了 or 被害金額が所持金を上回ると、ゲーム終了。</li>
                        <li>ゲーム終了後、所持金からゲーム終了時点の被害金額が引かれます。</li>
                    </ul>

                    <p style={{ marginTop: '1rem' }}>
                        一刻も早く、退会し、被害金額をなるべく少なくしましょう。
                    </p>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <IonText
                            color="primary"
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => history.push('/home')}
                        >
                            ゲームトップに戻る
                        </IonText>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default GameDescription;
