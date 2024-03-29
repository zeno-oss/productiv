import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNativeStackParamList = {
  Home: NavigatorScreenParams<HomeDrawerParamList>;
  Onboarding: undefined;
  Modal: undefined;
  NotFound: undefined;
  AddTask: { mode: "edit" | "add"; task?: string; taskId?: string };
  AddNote: { mode: "edit" | "add"; note?: string; noteId?: string };
};

export type RootNativeStackScreenProps<
  T extends keyof RootNativeStackParamList,
> = NativeStackScreenProps<RootNativeStackParamList, T>;

export type HomeDrawerParamList = {
  OCR: undefined;
  Appointment: undefined;
  TaskManager: undefined;
  NotesManager: undefined;
};

export type HomeDrawerScreenProps<T extends keyof HomeDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<HomeDrawerParamList, T>,
    RootNativeStackScreenProps<keyof RootNativeStackParamList>
  >;

export type TaskBottomTabsParamList = {
  Today: undefined;
  Upcoming: undefined;
  Done: undefined;
};

export type TaskBottomTabsScreenProps<T extends keyof TaskBottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TaskBottomTabsParamList, T>,
    HomeDrawerScreenProps<"TaskManager">
  >;
