import { IS_EXPO_GO } from "$constants";
import { ANDROID_OAUTH_ID, EXPO_OAUTH_ID, IOS_OAUTH_ID } from "$env";
import { OAuthUserData } from "$types";
import { GOOGLE_FETCH_USER_DATA_URL } from "$variables";
import { Platform } from "react-native";

export const getClientId = () => {
  if (IS_EXPO_GO) {
    return EXPO_OAUTH_ID;
  }
  if (Platform.OS === "ios") {
    return IOS_OAUTH_ID;
  }
  return ANDROID_OAUTH_ID;
};

export const fetchGoogleUserData = async (accessToken: string) => {
  let data = await fetch(GOOGLE_FETCH_USER_DATA_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return (await data.json()) as OAuthUserData;
};
