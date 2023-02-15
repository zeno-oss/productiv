import AsyncStorage from "@react-native-async-storage/async-storage";
import { isMobile } from "utils";

import { atomWithStorage, createJSONStorage } from "jotai/utils";

export function persistedAtom<T>(key: string, initialValue: T) {
  if (isMobile()) {
    return atomWithStorage<T>(
      key,
      initialValue,
      createJSONStorage<T>(() => AsyncStorage),
    );
  }
  return atomWithStorage<T>(key, initialValue);
}
