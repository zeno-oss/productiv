import colors from "$colors";
import { Fonts } from "$themes";
import { FontWeight } from "$types";
import { styled } from "nativewind";
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  TextStyle,
} from "react-native";

type TextProps = {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  variant?: FontWeight;
};

const TextComponent: React.FC<TextProps & NativeTextProps> = (props) => {
  const { children, style, variant = "regular", ...rest } = props;

  return (
    <NativeText
      {...rest}
      style={[
        { color: colors.black },
        { fontFamily: Fonts[variant.toUpperCase() as keyof typeof Fonts] },
        style,
      ]}
    >
      {children}
    </NativeText>
  );
};

export const Text = styled(TextComponent);
