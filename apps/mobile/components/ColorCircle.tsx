import { PALETTE } from "$variables";
import { styled } from "nativewind";
import { Pressable } from "react-native";

type ColorCircleProps = {
  backgroundColor: keyof typeof PALETTE;
  selected: boolean;
  onPress: () => void;
};

const StyledPressable = styled(Pressable);

export const ColorCircle: React.FC<ColorCircleProps> = ({
  backgroundColor,
  selected,
  onPress,
}) => {
  return (
    <StyledPressable
      style={{ backgroundColor: PALETTE[backgroundColor] }}
      className={`mx-2 h-7 w-7 rounded-full active:opacity-60 ${
        selected ? "border-2 border-black" : ""
      }`}
      onPress={onPress}
    />
  );
};
