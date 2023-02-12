import { hp, sharedStyles } from "$themes";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface IProps {
  text: string;
}

export const Label: React.FC<IProps> = ({ text }) => {
  return <Text style={[sharedStyles.faded, styles.label]}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    marginVertical: hp(10),
  },
});
