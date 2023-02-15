import { TouchableOpacity, View } from "react-native";

import { Text } from "$components";
import { RootNativeStackScreenProps } from "$types";

export function NotFoundScreen({
  navigation,
}: RootNativeStackScreenProps<"NotFound">) {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="text-lg" variant="bold">
        This screen doesn't exist.
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.replace("Home", {
            screen: "TaskManager",
          })
        }
        className="mt-4 py-4"
      >
        <Text className="text-sm text-blue-500">Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}
