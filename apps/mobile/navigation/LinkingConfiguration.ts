/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootNativeStackParamList } from "$types";

const linking: LinkingOptions<RootNativeStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: {
        screens: {
          TaskManager: {
            screens: {
              TaskManagerScreen: "taskScreen",
            },
          },
          OCR: {
            screens: {
              TabOneScreen: "one",
            },
          },
          Appointment: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
