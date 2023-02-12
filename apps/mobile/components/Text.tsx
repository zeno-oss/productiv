import { Colors, Fonts } from "$themes";
import React from "react";
import {
  Text as NativeText,
  StyleSheet,
  TextProps,
  TextStyle,
} from "react-native";

interface IProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export const Text: React.FC<IProps & TextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <NativeText {...props} style={[styles.text, style]}>
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.REGULAR,
    color: Colors.black,
  },
});
