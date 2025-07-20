import { FC, LazyExoticComponent } from "react";
import {
  LazyStage1Confirm,
  LazyStage1Contents,
  LazyStage1Login,
  LazyStage1Top,
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
  ],
};
