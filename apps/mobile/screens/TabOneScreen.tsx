import { View } from "react-native";

import { Text } from "$components";
import EditScreenInfo from "../components/EditScreenInfo";
import { HomeDrawerScreenProps } from "../types";

export function TabOneScreen({ navigation }: HomeDrawerScreenProps<"TabOne">) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg" variant="bold">
        Tab One
      </Text>
      <View className="my-8 h-0.5 w-4/5" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}
