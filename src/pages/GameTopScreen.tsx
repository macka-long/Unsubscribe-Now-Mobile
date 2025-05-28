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

const GameTopScreen: React.FC = () => {
    const history = useHistory();
    useAutoMoney();

    const money = useMoneyStore((state) => state.money);
    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'MyFont' }}>
                    退会せよ！！
                </h1>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle style={{ fontFamily: 'MyFont' }}>所持金情報</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p style={{ fontSize: '1.5rem', letterSpacing: '0.1em', textAlign: 'right', fontFamily: 'MyFont' }}>
                            {money.toLocaleString()}円
                        </p>
                        <ul>
                            <li>5分経過で5,000円貯まります</li>
                            <li>最大は50,000円です</li>
                        </ul>
                    </IonCardContent>
                </IonCard>

                <div className="ion-margin-top">
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'MyFont' }}>ゲーム</h2>
                    <div className="ion-margin-top" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <IonText color="primary" onClick={() => history.push('/about')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
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
            </IonContent>
        </IonPage>
    );
};

export default GameTopScreen;
