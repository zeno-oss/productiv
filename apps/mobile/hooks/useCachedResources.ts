import { userAtom } from "$store";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // hydrate the user atom
  useAtomValue(userAtom);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          raleway: require("../assets/fonts/Raleway-Regular.ttf"),
          "raleway-italic": require("../assets/fonts/Raleway-Italic.ttf"),
          "raleway-semibold": require("../assets/fonts/Raleway-SemiBold.ttf"),
          "raleway-bold": require("../assets/fonts/Raleway-Bold.ttf"),
          "raleway-medium": require("../assets/fonts/Raleway-Medium.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
