import { useEffect } from "react";
import {
  AdMob,
  AdOptions,
  AdLoadInfo,
  RewardAdPluginEvents,
  RewardAdOptions,
} from "@capacitor-community/admob";
import { PluginListenerHandle } from "@capacitor/core";

type RewardAdProps = {
  rewardFunc: () => void;
};
const AdReward: React.FC<RewardAdProps> = ({ rewardFunc }) => {
  useEffect(() => {
    let rewardListener: PluginListenerHandle;

    const prepareRewardAd = async () => {
      rewardListener = await AdMob.addListener(
        RewardAdPluginEvents.Rewarded,
        (reward) => {
          console.log("ユーザーが報酬を獲得しました", reward);
          rewardFunc();
        }
      );

      await AdMob.prepareRewardVideoAd({
        adId: "ca-app-pub-3940256099942544/5224354917",
        isTesting: true,
      });

      await AdMob.showRewardVideoAd();
    };

    prepareRewardAd();

    return () => {
      rewardListener?.remove();
    };
  }, []);

  return null; // 表示UIはネイティブなので不要
};

export default AdReward;
