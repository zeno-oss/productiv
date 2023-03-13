import { Delete, Edit } from "$themes";
import { TASKS_PALETTE } from "$variables";
import { Note } from "@prisma/client";
import { Pressable, View } from "react-native";
import { Card } from "./Card";
import { Pill } from "./Pill";
import { Text } from "./Text";

type NoteCardProps = {
  note: Note;
  onDeleteNote: (noteId: string) => void;
  onEditNote: (note: Note) => void;
};

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEditNote,
  onDeleteNote,
}) => {
  const { shade, labels, title, note: noteText, id } = note;

  return (
    <Card backgroundColor={TASKS_PALETTE[shade].backgroundColor} classes="my-3">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-xl" variant="bold">
          {title}
        </Text>
        <View className="flex-row gap-x-2">
          <Pressable onPress={() => onDeleteNote(note.id)}>
            <Delete />
          </Pressable>
          <Pressable onPress={() => onEditNote(note)}>
            <Edit />
          </Pressable>
        </View>
      </View>
      <View>
        {noteText && (
          <Text className="mb-1 text-xs" variant="regular" numberOfLines={1}>
            {noteText}
          </Text>
        )}
        <View className="flex-row items-end justify-between">
          <View className="mt-4">
            <View className="mt-2 flex-row">
              {labels &&
                labels
                  .split(",")
                  .map((label) => (
                    <Pill
                      title={label}
                      borderColor={TASKS_PALETTE[shade].borderColor}
                      key={label}
                    />
                  ))}
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
