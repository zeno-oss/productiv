import type { DrawerScreenProps } from "@react-navigation/drawer";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNativeStackParamList = {
  Home: NavigatorScreenParams<HomeDrawerParamList>;
  Modal: undefined;
  NotFound: undefined;
  AddTask: { mode: "edit" | "add"; taskId?: string };
};

export type RootNativeStackScreenProps<
  T extends keyof RootNativeStackParamList,
> = NativeStackScreenProps<RootNativeStackParamList, T>;

export type HomeDrawerParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TaskManager: undefined;
};

export type HomeDrawerScreenProps<T extends keyof HomeDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<HomeDrawerParamList, T>,
    RootNativeStackScreenProps<keyof RootNativeStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNativeStackParamList {}
  }
}
