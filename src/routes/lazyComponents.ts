// routes/lazyComponents.ts
import { lazy } from "react";

export const LazyStageTerms = lazy(() => import("../pages/Terms"));

// Stage1
export const LazyStage1Top = lazy(() => import("../pages/stages/1/Top"));
export const LazyStage1Contents = lazy(
  () => import("../pages/stages/1/Contents")
);
export const LazyStage1Confirm = lazy(
  () => import("../pages/stages/1/Confirm")
);
export const LazyStage1Login = lazy(() => import("../pages/stages/1/Login"));
export const LazyStage1MyPage = lazy(() => import("../pages/stages/1/MyPage"));

// Stage2
export const LazyStage2Top = lazy(() => import("../pages/stages/2/Top"));
export const LazyStage2Confirm = lazy(
  () => import("../pages/stages/2/Confirm")
);
export const LazyStage2Questionnaire = lazy(
  () => import("../pages/stages/2/Questionnaire")
);

// Stage3
export const LazyStage3Top = lazy(() => import("../pages/stages/3/Top"));
export const LazyStage3Confirm = lazy(
  () => import("../pages/stages/3/Confirm")
);
