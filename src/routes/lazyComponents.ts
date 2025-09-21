// routes/lazyComponents.ts
import { lazy } from "react";

export const LazyStageTerms = lazy(() => import("../pages/Terms"));

export const LazyStage1Top = lazy(() => import("../pages/stages/1/Top"));
export const LazyStage1Contents = lazy(
  () => import("../pages/stages/1/Contents")
);
export const LazyStage1Confirm = lazy(
  () => import("../pages/stages/1/Confirm")
);
export const LazyStage1Login = lazy(() => import("../pages/stages/1/Login"));
export const LazyStage2Top = lazy(() => import("../pages/stages/2/Top"));
export const LazyStage2Confirm = lazy(
  () => import("../pages/stages/2/Confirm")
);
export const LazyStage2Questionnaire = lazy(
  () => import("../pages/stages/2/Questionnaire")
);
