import {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMoneyStore } from '../store/moneyStore';
import useAutoMoney from '../hooks/useAutoMoney';
import AdBanner from '../components/AdBanner';

const GameTopScreen: React.FC = () => {
    const history = useHistory();
    useAutoMoney();

    const addOfflineEarnings = useMoneyStore((s) => s.addOfflineEarnings);
    const updateTimestamp = useMoneyStore((s) => s.updateTimestamp);
    useEffect(() => {
        addOfflineEarnings();   // 差分加算
        updateTimestamp();      // タイムスタンプ更新
    }, []);

    const money = useMoneyStore((state) => state.money);
    const resetMoney = useMoneyStore((state) => state.resetMoney);
    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <h1 style={{  letterSpacing: '0.3em',fontSize: '2rem', fontWeight: 'bold', fontFamily: 'MyFont' }}>
                    退会せよ！！
                </h1>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle style={{  letterSpacing: '0.3em',fontFamily: 'MyFont' }}>所持金情報</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p style={{ fontSize: '1.5rem', letterSpacing: '0.3em', textAlign: 'right', fontFamily: 'MyFont' }}>
                            {money.toLocaleString()}円
                        </p>
                        <ul>
                            <li>5分経過で5,000円貯まります</li>
                            <li>最大は50,000円です</li>
                            <IonText color="primary" onClick={resetMoney} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            (デバッグ用)所持金リセット
                            </IonText>
                        </ul>
                    </IonCardContent>
                </IonCard>

                <div className="ion-margin-top">
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'MyFont' }}>ゲーム</h2>
                    <div className="ion-margin-top" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <IonText color="primary" onClick={() => history.push('/description')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            ゲームの説明を見る
                        </IonText>
                        <IonText color="primary" onClick={() => history.push('/stages')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            ステージを選択する
                        </IonText>
                    </div>
                </div>

                <div className="ion-margin-top">
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'MyFont' }}>ストア</h2>
                    <IonText color="primary" onClick={() => history.push('/store')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        所持金を追加する
                    </IonText>
                </div>
                <AdBanner /> {/* バナー表示 */}
            </IonContent>
        </IonPage>
    );
};

export default GameTopScreen;

