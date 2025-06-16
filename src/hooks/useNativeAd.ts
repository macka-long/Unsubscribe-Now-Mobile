import { useEffect, useState } from 'react';
import NativeAdPlugin, { NativeAdData } from '../plugins/NativeAd';

export const useNativeAd = () => {
  const [ad, setAd] = useState<NativeAdData | null>(null);

  useEffect(() => {
    const load = async () => {
      await NativeAdPlugin.loadNativeAd();
    };

    const listen = NativeAdPlugin.addListener('nativeAdLoaded', (data) => {
      setAd(data.ad);
    });

    load();

    return () => {
      listen.then((remove) => remove.remove());
    };
  }, []);

  return ad;
};
