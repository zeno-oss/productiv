import { showSearchBarAtom } from "$store";
import { useSetAtom } from "jotai";
import { TextInput, View } from "react-native";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";

type SearchBarProps = {
  searchPhrase: string;
  setSearchPhrase: (text: string) => void;
};

export const SearchBar = ({
  searchPhrase,
  setSearchPhrase,
}: SearchBarProps) => {
  const setShowSearchBar = useSetAtom(showSearchBarAtom);
  return (
    <View className="w-full flex-row items-center justify-center">
      <View className="bg-lightSilver w-full flex-row items-center justify-evenly rounded-3xl py-[10px] px-4">
        <MagnifyingGlassIcon
          size={20}
          color="#141414"
          style={{ marginLeft: 8 }}
        />
        <TextInput
          className="ml-4 w-[90%] text-[20px]"
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setShowSearchBar(true);
          }}
        />
        <XMarkIcon
          size={20}
          color="#141414"
          style={{ paddingRight: 8, marginRight: 4 }}
          onPress={() => {
            setSearchPhrase("");
          }}
        />
      </View>
    </View>
  );
};
