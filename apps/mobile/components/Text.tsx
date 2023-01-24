import { Text as RNText, TextProps as RNTextProps } from "react-native";

type TextProps = {
  children: React.ReactNode;
};

export const Text = (props: TextProps & RNTextProps) => {
  const { children, ...rest } = props;
  return (
    <RNText className="text-gray-50" {...rest}>
      {children}
    </RNText>
  );
};
