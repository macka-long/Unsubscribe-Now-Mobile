import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 仮のステージ定義（後で JSON 読み込みに置き換え）
const stageData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));

const StageSelect: React.FC = () => {
  const history = useHistory();
  const [stages, setStages] = useState(stageData); // 将来的には外部から読み込み

  const handleSelect = (stageId: number) => {
    history.push(`/stage/${stageId}`);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem', fontFamily: 'MyFont'  }}>
          ステージ選択
        </h1>

        <IonGrid>
          {Array.from({ length: Math.ceil(stages.length / 5) }).map((_, rowIndex) => (
            <IonRow key={rowIndex}>
              {stages.slice(rowIndex * 5, rowIndex * 5 + 5).map((stage) => (
                <IonCol key={stage.id} size="2.4" style={{ display: 'flex', justifyContent: 'center' }}>
                  <div
                    onClick={() => handleSelect(stage.id)}
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#4d7cff',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid black',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontStyle: 'italic'
                    }}
                  >
                    {stage.id}
                  </div>
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <IonText
            color="primary"
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => history.push('/home')}
          >
            ゲームトップに戻る
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StageSelect;
