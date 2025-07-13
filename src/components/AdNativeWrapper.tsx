import { useNativeAd } from "../hooks/useNativeAd";
import AdNative from "./AdNative";



const AdNativeWrapper: React.FC = () => {
  const ad = useNativeAd();
  if (!ad) {
    console.log("NativeAdがnull")
    return null
  }

  return (
    <div style={{ margin: '1rem' }}>
      <AdNative {...ad} />
    </div>
  );
};

export default AdNativeWrapper;