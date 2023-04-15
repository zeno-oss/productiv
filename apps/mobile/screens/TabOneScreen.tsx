import { View } from "react-native";

import { OCRImagePicker } from "$components";
import { HomeDrawerScreenProps } from "$types";

export function TabOneScreen({ navigation }: HomeDrawerScreenProps<"OCR">) {
  return (
    <View className="flex-1 items-center justify-center">
      <OCRImagePicker />
    </View>
  );
}
