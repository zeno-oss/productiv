import { View } from "react-native";

import { ImagePicker } from "$components";
import { HomeDrawerScreenProps } from "$types";

export function TabOneScreen({ navigation }: HomeDrawerScreenProps<"OCR">) {
  return (
    <View className="flex-1 items-center justify-center">
      <ImagePicker />
    </View>
  );
}
