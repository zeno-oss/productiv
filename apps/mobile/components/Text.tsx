import { FontWeight } from "$types";
import { FONT_FAMILY, PALETTE } from "$variables";
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
        { color: PALETTE.black },
        {
          fontFamily:
            FONT_FAMILY[variant.toUpperCase() as keyof typeof FONT_FAMILY],
        },
        style,
      ]}
    >
      {children}
    </NativeText>
  );
};

export const Text = styled(TextComponent);
