import { View, ViewStyle } from "react-native";

interface IProps {
  children: React.ReactNode;
  backgroundColor: string;
  style?: ViewStyle;
}

export const Card: React.FC<IProps> = ({
  children,
  backgroundColor,
  style,
}) => {
  return (
    <View
      style={[style, { backgroundColor }]}
      className="rounded-[25px] py-4 px-6"
    >
      {children}
    </View>
  );
};
