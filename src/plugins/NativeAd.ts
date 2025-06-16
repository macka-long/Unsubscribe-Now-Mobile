import { registerPlugin } from '@capacitor/core';

export interface NativeAdData {
  headline: string;
  body?: string;
  advertiser?: string;
  callToAction?: string;
}

export interface NativeAdPluginType {
  loadNativeAd(): Promise<void>;
  addListener(
    eventName: 'nativeAdLoaded',
    listenerFunc: (data: { ad: NativeAdData }) => void
  ): Promise<any>;
}

const NativeAdPlugin = registerPlugin<NativeAdPluginType>('NativeAdPlugin');

export default NativeAdPlugin;
