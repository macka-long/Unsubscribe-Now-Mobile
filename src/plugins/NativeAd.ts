import { registerPlugin } from "@capacitor/core";

export interface NativeAdData {
  headline: string;
  body?: string;
  advertiser?: string;
  callToAction?: string;
}

export interface NativeAdPluginType {
  loadNativeAd(options: { adUnitId: string }): Promise<void>;
  addListener(
    eventName: 'nativeAdLoaded',
    listenerFunc: (data: NativeAdData) => void
  ): Promise<any>;
}


const NativeAdPlugin = registerPlugin<NativeAdPluginType>('NativeAdPlugin');

export default NativeAdPlugin;
