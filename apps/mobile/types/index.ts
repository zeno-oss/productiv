import { RootNativeStackParamList } from "$types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNativeStackParamList {}
  }
}
