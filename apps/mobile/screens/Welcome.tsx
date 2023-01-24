import { View } from "react-native";

import { Button, Screen, Text } from "$components";
import { useNavigation } from "@react-navigation/native";

export const Welcome = () => {
  const navigation = useNavigation();

  const goBackHandler = () => navigation.goBack();

  return (
    <Screen>
      <View className="flex h-[100vh] flex-col items-center justify-center">
        <Text className=" text-lemon-400 text-2xl font-bold">
          This is the welcome page 🎉
        </Text>
        <View className="mt-4">
          <View className="mt-4 flex flex-col items-center">
            <Button onPress={goBackHandler} title="Go Back To Home" />
          </View>
        </View>
      </View>
    </Screen>
  );
};
