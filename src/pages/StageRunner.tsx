import { IonPage, IonContent } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import { Stage } from '../types/stage';
import { useMoneyStore } from '../store/moneyStore';
import CurrentMoneyDisplay from '../components/CurrentMoneyDisplay';
import { pageComponentMap } from './stagePages/pageComponentMap';
import { useStageStore } from '../store/stageStore';
import useAutoDecreaseMoney from '../hooks/useDecreaseMoney';

const StageRunner: React.FC = () => {
  const history = useHistory();

  const currentStage = useStageStore((s) => s.currentStage);
  const currentIndex = useStageStore((s) => s.currentIndex);
  const goNext = useStageStore((s) => s.goNext);

  if (currentStage) {
    useAutoDecreaseMoney(currentStage.ratePerSecond);
  } else {
    return <div>ステージ未ロード</div>;
  }

  console.log("a");

  // 所持金が0になったら失敗画面へ
  useEffect(() => {
    const unsubscribe = useMoneyStore.subscribe(
      (s) => {
        if (s.money <= 0) {
          history.replace('/result', { success: false });
        }
      }
    );
    return () => unsubscribe();
  }, [history]);

  const stepId = currentStage.stepSequence[currentIndex];
  const StepComponent = pageComponentMap[stepId];

  const goToResult = () => {
    history.replace('/result', { success: true });
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999,
          pointerEvents: 'none' // ← これでUI邪魔しない
        }}>
          <CurrentMoneyDisplay />
        </div>
        {StepComponent ? (
          <StepComponent onNext={goNext} onComplete={goToResult} />
        ) : (
          <div>不明なステップ: {stepId}</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default StageRunner;
