import { AdMob, AdOptions } from "@capacitor-community/admob";

function loadInterstitial() {
  const options: AdOptions = {
    adId: "ca-app-pub-3940256099942544/4411468910",
  };
  AdMob.prepareInterstitial(options).then(
    async (value: any) => {
      console.log("Interstitial AD Loaded");
      console.log(value); // true
    },
    (error: any) => {
      console.error(error); // show error
    }
  );
}
function showInterstitial() {
  AdMob.showInterstitial().then(
    (value: any) => {
      console.log(value); // true
    },
    (error: any) => {
      console.error(error); // show error
    }
  );
}

export { loadInterstitial, showInterstitial };
