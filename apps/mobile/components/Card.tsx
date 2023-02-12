import colors from "$colors";
import { View, ViewStyle } from "react-native";

type CardProps = {
  children: React.ReactNode;
  backgroundColor: keyof typeof colors;
  style?: ViewStyle;
  classes?: string;
};

export const Card: React.FC<CardProps> = (props) => {
  const { children, backgroundColor, style, classes } = props;
  return (
    <View
      style={[style, { backgroundColor: colors[backgroundColor] }]}
      className={`rounded-[25px] py-4 px-6 ${classes || ""}`}
    >
      {children}
    </View>
  );
};
