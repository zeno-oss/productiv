import { StyleSheet } from "react-native";
import { Colors } from "./colors";
import { hp } from "./dimensions";
import { Fonts } from "./typography";
import { FontSize } from "./typography";

const sharedStyles = StyleSheet.create({
  h1: {
    fontSize: FontSize.h1,
    fontFamily: Fonts.BOLD,
    marginVertical: 4,
  },
  h3: {
    fontSize: FontSize.h3,
    fontFamily: Fonts.SEMIBOLD,
    marginVertical: 2,
  },
  faded: {
    color: Colors.gray,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: FontSize.regular,
    marginVertical: 2,
  },
  textInput: {
    fontSize: FontSize.h1,
    fontFamily: Fonts.BOLD,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: hp(20),
    marginVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { sharedStyles };
