import { RootNativeStackScreenProps, TaskColor } from "$types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { ColorCircle, Label, PrimaryButton, TextInput } from "$components";

import { api } from "$api";
import { userAtom } from "$store";
import { TASKS_PALETTE } from "$variables";
import { Note } from "@prisma/client";
import { useFocusEffect } from "@react-navigation/native";
import { useAtomValue } from "jotai";

export const AddNoteScreen = ({
  navigation,
  route,
}: RootNativeStackScreenProps<"AddNote">) => {
  const user = useAtomValue(userAtom);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState("");

  const [shade, setShade] = useState<TaskColor>("BANANA");

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [mode, setMode] = useState<"add" | "edit">("add");

  const client = api.useContext();
  const addNote = api.notes.addNote.useMutation({
    onSuccess: () => {
      client.notes.getNotes.invalidate();
      showToastAndNavigate();
    },
  });

  const editNote = api.notes.editNote.useMutation({
    onSuccess: () => {
      client.notes.getNotes.invalidate();
      showToastAndNavigate();
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.mode === "add" ? "New Note" : "Edit Note",
    });
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      const mode = route.params.mode;
      if (mode === "edit") {
        setMode("edit");
        const stringifiedNote = route.params.note;
        if (stringifiedNote) {
          const note = JSON.parse(stringifiedNote) as Note;
          if (note) {
            setTitle(note.title);
            setDescription(note.note ?? "");
            setLabels(note.labels);
            setShade(note.shade);
          }
        }
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (title !== "" && description !== "") {
      setIsSubmitDisabled(false);
    }
  }, [title, description, setIsSubmitDisabled]);

  function createNote() {
    const trimmedLabels = labels.replace(/ /g, "");

    const newNote = {
      title,
      note: description,
      labels: trimmedLabels,
      shade,
      userId: user?.id ?? "",
    };

    return newNote;
  }

  function showToastAndNavigate() {
    Toast.show({
      type: "success",
      text1: `Note ${mode === "add" ? "Added" : "Edited"}!🎉`,
      text2: "Keep the flow going.",
      position: "bottom",
    });
    navigation.navigate("Home", {
      screen: "NotesManager",
    });
  }

  function addNoteHandler() {
    const newNote = createNote();
    addNote.mutate({ ...newNote });
  }

  function editNoteHandler() {
    if (route.params.noteId) {
      const editedNote = createNote();
      editNote.mutate({ ...editedNote, id: route.params.noteId });
    }
  }

  return (
    <View className="my-6 flex-1 justify-between p-4">
      <View>
        <Label title="Title" />
        <TextInput
          maxLength={50}
          autoFocus={true}
          onChangeText={setTitle}
          value={title}
          placeholder="Enter note title"
          autoCorrect={false}
        />
        <Label title="Notes" />
        <TextInput
          maxLength={1000}
          onChangeText={setDescription}
          value={description}
          multiline={true}
          autoCorrect={false}
          classes="text-base"
          placeholder="Add your notes here"
        />

        <Label title="Labels" />
        <TextInput
          placeholder="everyday, university"
          onChangeText={setLabels}
          value={labels}
          autoCorrect={false}
          autoCapitalize="none"
          classes="text-base"
        />
        <Label title="Shade" />
        <ScrollView
          horizontal
          className="border-b-lightSilver my-1 border-b pb-5"
        >
          {Object.entries(TASKS_PALETTE).map(([color, { backgroundColor }]) => (
            <ColorCircle
              key={color}
              backgroundColor={backgroundColor}
              selected={color === shade}
              onPress={() => setShade(color as TaskColor)}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <PrimaryButton
          title={mode === "add" ? "Add Note" : "Update  Note"}
          classes={`w-full self-center mb-6 ${
            isSubmitDisabled ? "opacity-50" : ""
          }`}
          disabled={isSubmitDisabled}
          onPress={mode === "add" ? addNoteHandler : editNoteHandler}
        />
      </View>
    </View>
  );
};
