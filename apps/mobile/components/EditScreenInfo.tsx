import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity, View } from "react-native";

import { Text } from "./Text";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View className="mx-12 items-center">
        <Text className="text-center text-lg">
          Open up the code for this screen:
        </Text>

        <View className="my-2 rounded px-1">
          <Text>{path}</Text>
        </View>

        <Text className="text-center text-lg">
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>

      <View className="mx-5 mt-4 items-center">
        <TouchableOpacity onPress={handleHelpPress} className="py-4">
          <Text className="text-center">
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet",
  );
}
