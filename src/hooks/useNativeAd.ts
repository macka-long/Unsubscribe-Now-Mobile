import { useEffect, useState } from "react";
import NativeAdPlugin, { NativeAdData } from "../plugins/NativeAd";

export const useNativeAd = () => {
  const [ad, setAd] = useState<NativeAdData | null>(null);

  useEffect(() => {
    const load = async () => {
      await NativeAdPlugin.loadNativeAd({
        adUnitId: "ca-app-pub-3940256099942544/3986624511", // ← テスト用IDなど
      });
    };

    const listen = NativeAdPlugin.addListener("nativeAdLoaded", (ad) => {
      setAd(ad); // ad.headline などがそのまま使える
    });

    load();

    return () => {
      listen.then((remove) => remove.remove());
    };
  }, []);

  return ad;
};
