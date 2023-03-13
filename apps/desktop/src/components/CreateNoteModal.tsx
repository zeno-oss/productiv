import { Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { ZNote } from "server/types";
import { TaskColor } from "types";
import { TASKS_PALETTE } from "variables";
import { z } from "zod";
import { api } from "../utils/trpc";
import ColorCircle from "./ColorCircle";
function CreateNoteModal({
  opened,
  open,
  close,
  refetch,
}: {
  opened: boolean;
  open: () => void;
  close: () => void;
  refetch: () => void;
}) {
  const form = useForm<z.infer<typeof ZNote>>();
  const [shade, setShade] = useState<TaskColor>("BANANA");
  const { mutateAsync: createNote } = api.notes.addNote.useMutation();
  return (
    <Modal opened={opened} onClose={close} size="xl">
      <h1 className="text-xl font-semibold">Create a note</h1>
      <hr className="my-4" />
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const resp = await createNote({
              title: values.title,
              note: values.note,
              labels: values.labels || "",
              shade,
              userId: "dummy",
            });
            if (resp && resp.createdAt) {
              refetch();
              notifications.show({
                title: "Task Created Successfully",
                message: "Your task has been created successfully",
                autoClose: true,
              });
              close();
            }
            console.log({ values, shade });
          } catch (e) {
            console.log(e);
            notifications.show({
              title: "Error",
              message: "An error occurred while creating your note",
              autoClose: true,
            });
          }
        })}
        className="flex flex-col gap-2"
      >
        <TextInput
          withAsterisk
          required
          label="Title"
          placeholder="e.g. 13th March Journal"
          {...form.getInputProps("title")}
          name="title"
        />
        <Textarea
          maxRows={5}
          minRows={2}
          autosize
          withAsterisk
          required
          label="Note"
          placeholder="e.g. I had a great day today. I went to the park and played with my friends."
          {...form.getInputProps("note")}
          name="note"
        />
        <TextInput
          label="Labels ( comma separated )"
          placeholder="e.g. Diary, Journal, 13th March"
          {...form.getInputProps("labels")}
          name="labels"
        />

        <div className="flex flex-col gap-2 font-medium">
          Select a shade for your task:
          <div className="flex gap-4">
            {Object.entries(TASKS_PALETTE).map(
              ([color, { backgroundColor }]) => (
                <ColorCircle
                  key={color}
                  backgroundColor={backgroundColor}
                  selected={color === shade}
                  onPress={() => setShade(color as TaskColor)}
                />
              ),
            )}
          </div>
        </div>

        {/* <div className="flex justify-between gap-4">
          <DateTimePicker
            withAsterisk
            required
            label="Start Time"
            className="flex-1"
            name="startTime"
            {...form.getInputProps("startTime")}
          />
          <DateTimePicker
            withAsterisk
            required
            label="End Time"
            className="flex-1"
            name="endTime"
            {...form.getInputProps("endTime")}
          />
        </div> */}
        <button className="mt-4 flex w-fit items-center justify-center gap-4 rounded-full border bg-black p-4 py-2 text-white">
          <HiCheck /> Submit
        </button>
      </form>
    </Modal>
  );
}

export default CreateNoteModal;
