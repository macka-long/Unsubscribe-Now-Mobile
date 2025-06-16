import { IonButtons, IonBackButton, IonHeader, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { CustomBackButtonProps } from '../types/CustomBackButtomProps';


const CustomBackButton: React.FC<CustomBackButtonProps> = ({ handleBack }) => {

  return (
    <IonButton onClick={handleBack}>
      <IonIcon icon={chevronBack} />
      戻る
    </IonButton>
  );
};

export default CustomBackButton;
