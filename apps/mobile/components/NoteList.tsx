import { api } from "$api";
import { Note } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import Toast from "react-native-toast-message";
import { NoteCard } from "./NoteCard";
import { PrimaryButton } from "./PrimaryButton";
import { SearchBar } from "./SearchBar";
import { Text } from "./Text";

type NoteListProps = {
  notes: Note[];
};

export const NoteList = (props: NoteListProps) => {
  const { notes } = props;
  const navigation = useNavigation();
  const client = api.useContext();
  const [searchText, setSearchText] = useState("");

  const deleteNote = api.notes.deleteNote.useMutation({
    onSuccess: () => {
      client.notes.getNotes.invalidate();
      Toast.show({
        type: "error",
        text1: "Trashed 🗑",
        text2: "Note deleted!",
        position: "bottom",
      });
    },
  });

  function editNoteHandler(note: Note) {
    navigation.navigate("AddNote", {
      mode: "edit",
      note: JSON.stringify(note),
      noteId: note.id,
    });
  }

  function deleteNoteHandler(noteId: string) {
    deleteNote.mutate(noteId);
  }

  return (
    <>
      {notes.length === 0 ? (
        <View className="mt-4 h-[77%]">
          <View className="flex-1 items-center justify-center">
            <Text>No Notes...Add one?</Text>
          </View>
        </View>
      ) : (
        <View className="my-2 h-[77%]">
          <SearchBar
            searchPhrase={searchText}
            setSearchPhrase={setSearchText}
          />
          <FlatList
            data={notes}
            renderItem={({ item }) => {
              const termToSearch = searchText.toLowerCase();
              if (
                termToSearch === "" ||
                item.title.toLowerCase().includes(termToSearch) ||
                item.note.toLowerCase().includes(termToSearch) ||
                item.labels.toLowerCase().includes(termToSearch)
              ) {
                return (
                  <NoteCard
                    note={item}
                    key={item.id}
                    onDeleteNote={deleteNoteHandler}
                    onEditNote={editNoteHandler}
                  />
                );
              }
              return null;
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <PrimaryButton
        title="Add Note"
        classes="self-center my-2"
        icon={<PlusIcon color="white" />}
        onPress={() => navigation.navigate("AddNote", { mode: "add" })}
      />
    </>
  );
};
