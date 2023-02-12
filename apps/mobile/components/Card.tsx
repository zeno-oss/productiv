import { StyleSheet, View, ViewStyle } from "react-native";

import { hp } from "$themes";

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
    <View style={[styles.card, style, { backgroundColor }]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: hp(16),
    paddingHorizontal: hp(24),
    borderRadius: hp(25),
  },
});
