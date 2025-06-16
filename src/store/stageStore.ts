import { create } from 'zustand';
import { Stage } from '../types/stage';

type StageStore = {
  currentStage: Stage | null;
  currentIndex: number;
  loadStage: (stage: Stage) => void;
  goNext: () => void;
  goBack: () => void;
  resetCurrentINdex: () => void;
};

export const useStageStore = create<StageStore>((set, get) => ({
  currentStage: null,
  currentIndex: 0,
  loadStage: (stage) => set({ currentStage: stage, currentIndex: 0 }),
  goNext: () => {
    const { currentStage, currentIndex } = get();
    if (!currentStage) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex < currentStage.stepSequence.length) {
      set({ currentIndex: nextIndex });
    } else {
      // ステージ終了後の遷移はStageRunner側で判断
    }
  },
  goBack: () => {
    const { currentStage, currentIndex } = get();
    if (!currentStage) return;
    const previewIndex = currentIndex - 1;
    if (previewIndex >= 0){
      set({ currentIndex: previewIndex});
    }
  },
  resetCurrentINdex: () => {
    set({ currentIndex: 0});
  }
}));