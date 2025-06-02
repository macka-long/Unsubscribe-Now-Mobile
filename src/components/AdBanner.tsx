import { useEffect } from 'react';
import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';

const AdBanner: React.FC = () => {
  useEffect(() => {
    const show = async () => {
      await AdMob.showBanner({
        adId: 'ca-app-pub-3940256099942544/9214589741', // ← テストバナーID
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
      });
    };

    show();

    return () => {
      AdMob.removeBanner();
    };
  }, []);

  return null; // UIはAdMobのネイティブ側で表示されるのでJSX不要
};

export default AdBanner;
