import React from "react";
import { View } from "react-native";
import { Text } from "./Text";

type PillProps = {
  title: string;
  borderColor: string;
};

export const Pill: React.FC<PillProps> = (props) => {
  const { title, borderColor } = props;
  return (
    <View>
      <View
        style={{ borderColor }}
        className="mr-3 self-start rounded-[30px] border px-3 py-0.5"
      >
        <Text className="text-xs">{title}</Text>
      </View>
    </View>
  );
};
