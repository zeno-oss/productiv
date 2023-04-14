import { api } from "$api";
import * as ExpoImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { Text } from "./Text";

export function ImagePicker() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setTimeElapsed(timeElapsed + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
    }
  }, [timeElapsed, isLoading]);

  const ocrText = api.notes.getOCRText.useQuery();

  useEffect(() => {
    if (image) {
      getOCRText();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getOCRText = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (ocrText.data) {
        setRecognizedText(ocrText.data);
      }
      setIsLoading(false);
    }, 10000);
  };

  let ocrComponent = null;

  if (isLoading) {
    if (timeElapsed < 2) {
      ocrComponent = (
        <Text className="text-2xl font-bold">Uploading image</Text>
      );
    } else if (timeElapsed < 6) {
      ocrComponent = (
        <Text className="text-2xl font-bold">Processing image</Text>
      );
    } else if (timeElapsed < 8) {
      ocrComponent = <Text className="text-2xl font-bold">Getting text</Text>;
    } else if (timeElapsed < 10) {
      ocrComponent = <Text className="text-2xl font-bold">Almost there</Text>;
    }
  }

  if (timeElapsed >= 10 || recognizedText !== "") {
    ocrComponent = (
      <>
        <Text className="text-xl font-bold">Processed OCR Output:</Text>
        <Text className="text-lg font-semibold">{recognizedText}</Text>
      </>
    );
  }

  return (
    <View className="flex-1 items-center gap-y-8 py-12">
      {!image && (
        <PrimaryButton title="Pick an image to do OCR" onPress={pickImage} />
      )}
      {image && (
        <>
          <Text className="text-lg font-bold">Picked image:</Text>
          <Image
            source={{ uri: image }}
            style={{
              width: 350,
              height: 175,
              borderWidth: 2,
              borderColor: "red",
            }}
          />
        </>
      )}
      {ocrComponent}
    </View>
  );
}
