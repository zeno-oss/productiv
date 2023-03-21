import React from "react";
import { View } from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { Text } from "./Text";

type TaskHeaderProps = {
  name: string;
  taskCount: number;
  onRefresh: () => void;
  isDoneScreen?: boolean;
};

export const TaskHeader = (props: TaskHeaderProps) => {
  const { name, taskCount, onRefresh, isDoneScreen = false } = props;
  return (
    <>
      <Text className="my-0.5 text-sm" variant="semibold">
        Hello {name}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="my-1 text-xl" variant="bold">
          {isDoneScreen ? "Completed" : "You have"} {taskCount} Task(s).
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
