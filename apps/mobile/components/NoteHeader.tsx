import { showSearchBarAtom } from "$store";
import { useSetAtom } from "jotai";
import { Keyboard, View } from "react-native";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { Text } from "./Text";

type NoteHeaderProps = {
  name: string;
  notesCount: number;
  onRefresh: () => void;
};

export const NoteHeader = (props: NoteHeaderProps) => {
  const { name, notesCount, onRefresh } = props;
  const setShowSearchBar = useSetAtom(showSearchBarAtom);
  return (
    <>
      <Text className="my-0.5 text-sm" variant="semibold">
        Hello {name}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="my-1 text-xl" variant="bold">
          You have {notesCount} Notes(s).
        </Text>
        <View className="mx-2 flex-row items-center gap-x-4">
          <ArrowPathIcon
            color="#141414"
            height={22}
            width={22}
            onPress={onRefresh}
          />

          <MagnifyingGlassIcon
            color="#141414"
            height={22}
            width={22}
            onPress={() =>
              setShowSearchBar((prev) => {
                if (prev) {
                  Keyboard.dismiss();
                }
                return !prev;
              })
            }
          />
        </View>
      </View>
    </>
  );
};
