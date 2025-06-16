import { PageComponentProps } from '../../types/PageComponentProps';
import Confirm from './Confirm';
import Top from './Top';



export const pageComponentMap: Record<string, React.FC<PageComponentProps>> = {
  top: Top,
  confirm: Confirm,
};