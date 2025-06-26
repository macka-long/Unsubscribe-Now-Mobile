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
import { useGameStore } from '../store/GameStore';
import { useTotalLoss } from '../hooks/useTotalLoss';

const StageRunner: React.FC = () => {
  const history = useHistory();

  const currentStage = useStageStore((s) => s.currentStage);
  const currentIndex = useStageStore((s) => s.currentIndex);
  const goNext = useStageStore((s) => s.goNext);

  const startGame = useGameStore((s) => s.startGame);
  const endGame = useGameStore((s) => s.endGame);
  const beforeStartMoney = useGameStore((s) => s.beforeStartMoney);
  console.log(beforeStartMoney);

  console.log("a");

  if (currentStage) {
    startGame();
    useAutoDecreaseMoney(currentStage.ratePerSecond);
  } else {
    return <div>ステージ未ロード</div>;
  }

  // 所持金が0になったら失敗画面へ
  useEffect(() => {
    const unsubscribe = useMoneyStore.subscribe(
      (s) => {
        if (s.money <= 0) {
          endGame();
          const totalLoss = useTotalLoss(beforeStartMoney);
          history.replace('/result', {
            isSuccess: false,
            totalLoss: totalLoss,
          });
        }
      }
    );
    return () => unsubscribe();
  }, [history]);

  const stepId = currentStage.stepSequence[currentIndex];
  const StepComponent = pageComponentMap[stepId];

  const goToResult = () => {
    endGame();
    const totalLoss = useTotalLoss(beforeStartMoney);
    history.replace('/result', {
      isSuccess: true,
      totalLoss: totalLoss,
    });
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
