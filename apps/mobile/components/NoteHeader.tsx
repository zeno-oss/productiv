import React from "react";
import { View } from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { Text } from "./Text";

type NoteHeaderProps = {
  name: string;
  notesCount: number;
  onRefresh: () => void;
};

export const NoteHeader = (props: NoteHeaderProps) => {
  const { name, notesCount, onRefresh } = props;
  return (
    <>
      <Text className="my-0.5 text-sm" variant="semibold">
        Hello {name}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="my-1 text-xl" variant="bold">
          You have {notesCount} Notes(s).
        </Text>
        <PrimaryButton
          title="Refresh"
          classes="bg-white"
          textClasses="text-black text-sm"
          textVariant="regular"
          onPress={onRefresh}
        />
      </View>
    </>
  );
};
