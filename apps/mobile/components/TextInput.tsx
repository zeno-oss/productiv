import { FONT_FAMILY } from "$variables";
import classnames from "classnames";
import {
  TextInput as NativeTextInput,
  TextInputProps,
  TextStyle,
} from "react-native";

interface IProps {
  style?: TextStyle | TextStyle[];
  placeholder?: string;
  classes?: string;
}

export const TextInput: React.FC<IProps & TextInputProps> = ({
  style,
  placeholder,
  classes,
  ...props
}) => {
  const classNames = classnames(
    "border-b-lightSilver my-1 border-b pb-5 text-lg h-14",
    {
      [classes ?? ""]: !!classes,
    },
  );
  return (
    <NativeTextInput
      {...props}
      className={classNames}
      style={{ fontFamily: FONT_FAMILY.BOLD }}
      placeholder={placeholder || "Type something..."}
    />
  );
};
