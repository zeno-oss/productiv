import { api } from "$api";
import { OnboardingFlatlist, OnboardingFooter, Text } from "$components";
import { IS_EXPO_GO } from "$constants";
import { ANDROID_OAUTH_ID, EXPO_OAUTH_ID, IOS_OAUTH_ID } from "$env";
import { userAtom } from "$store";
import { OnboardingSlideData, RootNativeStackScreenProps } from "$types";
import { useFocusEffect } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import { useSetAtom } from "jotai";
import { useCallback, useRef, useState } from "react";
import { Alert, Dimensions, FlatList, View } from "react-native";
import { fetchGoogleUserData } from "../utils/functions";

const onboardingData: ReadonlyArray<OnboardingSlideData> = [
  {
    title: "Hello",
    subtitle: "Welcome to productiv.",
    Icon: <Text className="text-[100px]">🥳</Text>,
  },
  {
    title: "Track Your Day",
    subtitle: "Keep a track of your tasks.",
    Icon: <Text className="text-[100px]">⌛</Text>,
  },
  {
    title: "Write Notes",
    subtitle: "Keep your notes: Digital or otherwise!",
    Icon: <Text className="text-[100px]">📝</Text>,
  },
  {
    title: "Schedule Appointments",
    subtitle: "Let others contact you with ease.",
    Icon: <Text className="text-[100px]">📆</Text>,
  },
  {
    title: "Raise Your Productivity",
    subtitle: "Get more done with less effort.",
    Icon: <Text className="text-[100px]">🤩</Text>,
  },
];

export const OnboardingScreen = ({
  navigation,
}: RootNativeStackScreenProps<"Onboarding">) => {
  const flatListRef: React.RefObject<FlatList<OnboardingSlideData>> =
    useRef(null);
  const width = Dimensions.get("window").width;
  const setUser = useSetAtom(userAtom);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const createUser = api.auth.createUser.useMutation({
    onSuccess: (user) => {
      setUser(user);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    },
  });

  const goToSlideHandler = (newSlideNumber = activeSlideIndex + 1) => {
    if (newSlideNumber < onboardingData.length) {
      flatListRef.current?.scrollToOffset({
        offset: newSlideNumber * width,
      });
      setActiveSlideIndex(newSlideNumber);
    }
  };

  const [_, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_OAUTH_ID,
    iosClientId: IOS_OAUTH_ID,
    expoClientId: EXPO_OAUTH_ID,
  });

  const startButtonHandler = () => {
    promptAsync({ useProxy: IS_EXPO_GO, showInRecents: true });
  };

  useFocusEffect(
    useCallback(() => {
      const persistAuth = async () => {
        if (!response) {
          return;
        }
        if (response.type === "success") {
          const userData = await fetchGoogleUserData(
            response.authentication?.accessToken!,
          );
          console.log(userData);
          createUser.mutate({
            email: userData.email,
            name: userData.name,
            locale: userData.locale,
            profileImage: userData.picture,
          });
        } else {
          Alert.alert("Error", "Google sign in failed! Please try again.");
        }
      };
      persistAuth();
    }, [response]),
  );

  return (
    <View className="flex-1 items-center justify-center">
      <OnboardingFlatlist
        data={onboardingData}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={(index: number) => setActiveSlideIndex(index)}
        flatListRef={flatListRef}
      />
      <OnboardingFooter
        onGoToSlide={goToSlideHandler}
        activeSlideIndex={activeSlideIndex}
        numberOfSlides={onboardingData.length}
        onStart={startButtonHandler}
      />
    </View>
  );
};
