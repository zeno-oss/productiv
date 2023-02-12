import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";

import { Text } from "$components";
import EditScreenInfo from "../components/EditScreenInfo";

export function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg" variant="bold">
        Modal
      </Text>
      <View className="my-8 h-0.5 w-4/5" />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
