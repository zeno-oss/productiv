import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ViewProps,
} from "react-native";

type ScreenProps = {
  children: React.ReactNode;
};

export const Screen: React.FC<ScreenProps & ViewProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style}
        className="flex-1"
        {...props}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
