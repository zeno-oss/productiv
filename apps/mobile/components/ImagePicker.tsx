import { api } from "$api";
import { GOOGLE_API_KEY } from "$env";
import { userAtom } from "$store";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid/non-secure";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import {
  ArrowTopRightOnSquareIcon,
  PlusIcon,
} from "react-native-heroicons/solid";
import Toast from "react-native-toast-message";
import { storage } from "../firebase";
import { PrimaryButton } from "./PrimaryButton";
import { Text } from "./Text";

export function OCRImagePicker() {
  const [image, setImage] = useState<null | string>(null);
  const [uploading, setUploading] = useState(false);
  const [ocrText, setOCRText] = useState("");
  const user = useAtomValue(userAtom);
  const navigation = useNavigation();

  const client = api.useContext();

  const addNote = api.notes.addNote.useMutation({
    onSuccess: () => {
      client.notes.getNotes.invalidate();
      Toast.show({
        type: "success",
        text1: `Note added!🎉`,
        text2: "Keep the flow going.",
        position: "bottom",
      });
      navigation.navigate("Home", {
        screen: "NotesManager",
      });
    },
  });

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri ?? null);
    }
  }

  async function extractText() {
    setUploading(true);
    const blob: File = await new Promise((resolve, reject) => {
      if (image == null) {
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const storageRef = ref(storage, nanoid());

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, blob);
    console.log("Uploaded a blob or file!", snapshot);
    blob.close();
    const url = await getDownloadURL(snapshot.ref).then((url) => url);
    setImage(url);

    await submitToGoogle(url);
    setUploading(false);
  }

  async function submitToGoogle(imageUrl: string) {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 1 }],
            image: {
              source: {
                imageUri: imageUrl,
              },
            },
          },
        ],
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          GOOGLE_API_KEY,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        },
      );
      let responseJson = await response.json();
      console.log(responseJson.responses[0].fullTextAnnotation.text);
      setOCRText(responseJson.responses[0].fullTextAnnotation.text);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {image ? (
        <View className="mt-2 h-[85%]">
          <Text className="mb-1 text-xl" variant="bold">
            Image preview
          </Text>
          <View className="self-center">
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 350,
                  height: 175,
                  borderWidth: 2,
                  borderColor: "black",
                }}
              />
            )}
          </View>
          <Text className="mb-1 mt-4 text-xl" variant="bold">
            Extracted text
          </Text>
          <Text>Click the button below to begin.</Text>
          <ScrollView className="h-32">
            <Text>{ocrText}</Text>
          </ScrollView>
        </View>
      ) : (
        <View className="mt-4 h-[85%]">
          <View className="flex-1 items-center justify-center">
            <Text>Select an image to get started.</Text>
          </View>
        </View>
      )}
      {image === null && (
        <PrimaryButton
          title="Select image"
          classes="self-center my-2"
          icon={<PlusIcon color="white" />}
          onPress={pickImage}
        />
      )}
      {image !== null && ocrText === "" && !uploading && (
        <PrimaryButton
          title="Extract text"
          classes="self-center my-2"
          icon={<ArrowTopRightOnSquareIcon color="white" />}
          onPress={extractText}
        />
      )}
      {uploading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"small"} color="black" />
        </View>
      )}
      {image !== null && ocrText !== "" && !uploading && (
        <PrimaryButton
          title="Add Note"
          classes="self-center my-2"
          icon={<PlusIcon color="white" />}
          onPress={() => {
            addNote.mutate({
              title: "OCR Note",
              note: ocrText,
              shade: "BANANA",
              labels: "ocr",
              userId: user?.id ?? "",
              fileURLs: JSON.stringify([image]),
            });
          }}
        />
      )}
    </>
  );
}
