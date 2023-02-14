import { PALETTE } from "$variables";
import { View, ViewStyle } from "react-native";

type CardProps = {
  children: React.ReactNode;
  backgroundColor: keyof typeof PALETTE;
  style?: ViewStyle;
  classes?: string;
};

export const Card: React.FC<CardProps> = (props) => {
  const { children, backgroundColor, style, classes } = props;
  return (
    <View
      style={[style, { backgroundColor: PALETTE[backgroundColor] }]}
      className={`rounded-[25px] py-4 px-6 ${classes || ""}`}
    >
      {children}
    </View>
  );
};
