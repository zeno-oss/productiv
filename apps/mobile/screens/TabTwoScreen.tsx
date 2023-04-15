import { View } from "react-native";

import { PrimaryButton, Text } from "$components";
import { HomeDrawerScreenProps } from "$types";
import * as Clipboard from "expo-clipboard";
import { ClipboardIcon } from "react-native-heroicons/outline";
import Toast from "react-native-toast-message";

export function TabTwoScreen({
  navigation,
}: HomeDrawerScreenProps<"Appointment">) {
  async function copyToClipboard() {
    await Clipboard.setStringAsync(
      "https://productiv-app.vercel.app/cle4rx1j40000rpisr8i0tw2j",
    );
    Toast.show({
      type: "success",
      text1: `Link copied!🎉`,
      text2: "Share with your friends.",
      position: "bottom",
    });
  }

  return (
    <View className="flex-1 items-center justify-center gap-y-4">
      <Text className="text-center">
        Share this link to allow appointment scheduling with you:
      </Text>
      <View className="mt-4 mb-1 rounded-lg bg-gray-300/50 ">
        <Text className=" p-2 text-center text-lg" variant="bold">
          https://productiv-app.vercel.app/cle4rx1j40000rpisr8i0tw2j
        </Text>
      </View>

      <PrimaryButton
        title="Copy Link"
        classes="self-center my-2 py-2"
        icon={<ClipboardIcon color="white" />}
        onPress={copyToClipboard}
      />
      <Text className="text-center" variant="italic">
        any appointments will be shown as a task in the task manager
      </Text>
    </View>
  );
}
