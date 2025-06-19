import { IonText } from '@ionic/react';
import React from 'react';

type StageResultProps = {
  isSuccess: boolean;
  totalLoss: number;
  // currentMoney: number;
  onBackToStage: () => void;
  onBackToTop: () => void;
};

const StageResultPanel: React.FC<StageResultProps> = ({ isSuccess, totalLoss, onBackToStage, onBackToTop }) => {
  return (
    <div style={{ border: '1px solid #000', padding: '1rem', textAlign: 'center'}}>
      <div
        style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: isSuccess ? 'limegreen' : 'red',
          fontFamily: 'MyFont'
        }}
      >
        {isSuccess ? (
          <>
            退会完了！！<br />
            ステージクリア
          </>
        ) : (
          <>
            無一文！！<br />
            ステージ失敗
          </>
        )}
      </div>


      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'MyFont' }}>
        合計被害金額
      </div>
      <div style={{ fontSize: '2rem', color: 'red', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'MyFont' }}>
        {totalLoss.toLocaleString()}円
      </div>
{/* 
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'MyFont' }}>
        現在所持金
      </div>
      <div style={{ fontSize: '2rem', color: 'black', fontWeight: 'bold', marginBottom: '1.5rem', fontFamily: 'MyFont' }}>
        {currentMoney.toLocaleString()}円
      </div> */}

      <div>
        <IonText
          color="primary"
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={onBackToStage}
        >
          ステージ選択に戻る
        </IonText>
      </div>
      <div>
        <IonText
          color="primary"
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={onBackToTop}
        >ゲームトップに戻る
        </IonText>
      </div>
    </div>
  );
};

export default StageResultPanel;
