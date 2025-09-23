import { FC, LazyExoticComponent } from "react";
import {
  LazyStage1Confirm,
  LazyStage1Contents,
  LazyStage1Login,
  LazyStage1MyPage,
  LazyStage1Top,
  LazyStage2Confirm,
  LazyStage2Questionnaire,
  LazyStage2Top,
  LazyStage3Confirm,
  LazyStage3Top,
  LazyStage4MyPage,
  LazyStage4Top,
  LazyStage5Confirm,
  LazyStage5Login,
  LazyStage5Top,
  LazyStageTerms,
} from "./lazyComponents";

type StageRoute = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: LazyExoticComponent<FC<any>>;
};

type StageRouteMap = Record<string, StageRoute[]>;

export const stageRoutes: StageRouteMap = {
  "1": [
    { path: "", component: LazyStage1Top },
    { path: "contents", component: LazyStage1Contents },
    { path: "confirm", component: LazyStage1Confirm },
    { path: "terms", component: LazyStageTerms },
    { path: "login", component: LazyStage1Login },
    { path: "mypage", component: LazyStage1MyPage },
  ],
  "2": [
    { path: "", component: LazyStage2Top },
    { path: "confirm", component: LazyStage2Confirm },
    { path: "questionnaire", component: LazyStage2Questionnaire },
  ],
  "3": [
    { path: "", component: LazyStage3Top },
    { path: "confirm", component: LazyStage3Confirm },
  ],
  "4": [
    { path: "", component: LazyStage4Top },
    { path: "mypage", component: LazyStage4MyPage },
  ],
  "5": [
    { path: "", component: LazyStage5Top },
    { path: "confirm", component: LazyStage5Confirm },
    { path: "login", component: LazyStage5Login },
  ],
};
