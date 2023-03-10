import { FONT_FAMILY } from "$variables";
import {
  TextInput as NativeTextInput,
  TextInputProps,
  TextStyle,
} from "react-native";

interface IProps {
  style?: TextStyle | TextStyle[];
  placeholder?: string;
}

export const TextInput: React.FC<IProps & TextInputProps> = ({
  style,
  placeholder,
  ...props
}) => {
  return (
    <NativeTextInput
      {...props}
      className="border-b-lightGray my-1 border-b pb-5 text-xl"
      style={{ fontFamily: FONT_FAMILY.BOLD }}
      placeholder={placeholder || "Type something..."}
    />
  );
};
