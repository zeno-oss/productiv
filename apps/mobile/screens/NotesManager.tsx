import { api } from "$api";
import { NoteHeader, NoteList, Text } from "$components";
import { userAtom } from "$store";
import { useAtomValue } from "jotai";
import React from "react";
import { View } from "react-native";

export const NotesManager = () => {
  const user = useAtomValue(userAtom);

  const notes = api.notes.getNotes.useQuery(user?.id ?? "");

  if (!notes.data || !user)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View className="my-3">
      <NoteHeader
        name={user.name}
        notesCount={notes.data.length}
        onRefresh={notes.refetch}
      />
      <NoteList notes={notes.data} />
    </View>
  );
};
