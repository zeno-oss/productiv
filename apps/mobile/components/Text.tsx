import colors from "$colors";
import { Fonts } from "$themes";
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  StyleSheet,
  TextStyle,
} from "react-native";

type TextProps = {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  variant?: "regular" | "bold" | "semibold" | "italic" | "medium";
};

export const Text: React.FC<TextProps & NativeTextProps> = (props) => {
  const { children, style, variant = "regular", ...rest } = props;

  return (
    <NativeText
      {...rest}
      style={[
        styles.text,
        { fontFamily: Fonts[variant.toUpperCase() as keyof typeof Fonts] },
        style,
      ]}
    >
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
  },
});
