import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonText
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Stage } from '../types/stage';
import { useUserStore } from '../store/userStore';
import { validateLoginId, validatePassword } from '../utils/validation';

const RegisterPage: React.FC = () => {
    const history = useHistory();
    const location = useLocation<{ stage: Stage }>();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [stageTitle, setStageTitle] = useState('');
    const [stageRate, setStageRate] = useState(0);
    const { setCredentials } = useUserStore();


    useEffect(() => {
        if (location.state && location.state.stage) {
            setStageTitle(location.state.stage.title);
        }
        if (location.state && location.state.stage) {
            setStageRate(location.state.stage.ratePerSecond);
        }
    }, [location.state]);

    const handleRegister = () => {
        if (!validateLoginId(loginId)) {
            alert('ログインIDは英数字6〜16文字で入力してください');
            return;
        }

        if (!validatePassword(password)) {
            alert('パスワードは英数字両方を含む8〜16文字で入力してください');
            return;
        }
        if (loginId && password) {
            setCredentials(loginId, password);
            history.push('/stage-play');
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{stageTitle || 'サイト名'}</h2>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>新規会員登録</h3>
                <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    ログインIDとパスワードを入力して、登録ボタンをクリックしてください
                </p>

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <IonText color="primary" onClick={() => history.push('/terms', {
                        ratePerSecond: stageRate,
                        siteName: stageTitle
                    })} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    利用規約
                </IonText>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <IonInput
                    placeholder="ログインID(英数6~16文字)"
                    value={loginId}
                    onIonChange={(e) => setLoginId(e.detail.value!)}
                    style={{ border: '1px solid #000', padding: '0.5rem' }}
                />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
                <IonInput
                    type="password"
                    placeholder="パスワード(英・数両方含む8~16文字)"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    style={{ border: '1px solid #000', padding: '0.5rem' }}
                />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <IonButton onClick={handleRegister} style={{ backgroundColor: '#f9a825', color: 'black' }}>
                    登録
                </IonButton>
            </div>

            <div style={{ textAlign: 'center' }}>
                <IonText
                    color="primary"
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => history.push('/stages')}
                >
                    ステージ選択に戻る
                </IonText>
            </div>
        </IonContent>
        </IonPage >
    );
};

export default RegisterPage;
