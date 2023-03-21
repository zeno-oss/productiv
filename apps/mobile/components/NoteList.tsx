import { api } from "$api";
import { Note } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import Toast from "react-native-toast-message";
import { NoteCard } from "./NoteCard";
import { PrimaryButton } from "./PrimaryButton";
import { Text } from "./Text";

type NoteListProps = {
  notes: Note[];
};

export const NoteList = (props: NoteListProps) => {
  const { notes } = props;
  const navigation = useNavigation();
  const client = api.useContext();

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
        <ScrollView className="my-2 h-[77%]">
          {notes.map((note) => (
            <NoteCard
              note={note}
              key={note.id}
              onDeleteNote={deleteNoteHandler}
              onEditNote={editNoteHandler}
            />
          ))}
        </ScrollView>
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
