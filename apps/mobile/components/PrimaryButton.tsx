import { Colors, FontSize, Fonts, hp } from "$themes";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface IProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle | TextStyle[];
  icon?: React.ReactNode;
  onPress?: () => void;
}

export const PrimaryButton: React.FC<IProps & PressableProps> = ({
  title,
  style,
  textStyle,
  icon,
  onPress,
  ...props
}) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.buttonOuterContainer,
          style,
          pressed && styles.pressedButtonContainer,
        ]}
        onPress={onPress}
        {...props}
      >
        {icon && icon}
        <Text style={[styles.text, textStyle, !!icon && { marginLeft: 12 }]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: hp(30),
    backgroundColor: Colors.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pressedButtonContainer: {
    opacity: 0.5,
  },
  text: {
    fontSize: FontSize.h2,
    fontFamily: Fonts.BOLD,
    color: Colors.white,
    textAlign: "center",
  },
});
