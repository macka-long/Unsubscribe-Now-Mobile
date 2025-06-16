import { Stage } from "./stage";

export interface PageComponentProps {
  onNext?: () => void;
  onComplete?: () => void;
}