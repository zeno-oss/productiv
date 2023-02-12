import { FontWeight } from "$types";
import classnames from "classnames";
import { styled } from "nativewind";
import React from "react";
import { Pressable, PressableProps, View } from "react-native";
import { Text } from "./Text";

interface IProps {
  title: string;
  classes?: string;
  textClasses?: string;
  icon?: React.ReactNode;
  textVariant?: FontWeight;
  onPress?: () => void;
}

const StyledPressable = styled(Pressable);

export const PrimaryButton: React.FC<IProps & PressableProps> = (props) => {
  const {
    title,
    classes,
    textClasses,
    icon,
    onPress,
    textVariant = "bold",
    ...rest
  } = props;

  const pressableClassNames = classnames(
    "self-start py-3 px-6 bg-black flex-row items-center justify-center rounded-[30px] active:opacity-50",
    {
      [classes || ""]: !!classes,
    },
  );

  const textClassNames = classnames("text-center text-base text-white", {
    "ml-3": !!icon,
    [textClasses || ""]: !!textClasses,
  });

  return (
    <View>
      <StyledPressable
        onPress={onPress}
        className={pressableClassNames}
        {...rest}
      >
        {icon && icon}
        <Text className={textClassNames} variant={textVariant}>
          {title}
        </Text>
      </StyledPressable>
    </View>
  );
};
