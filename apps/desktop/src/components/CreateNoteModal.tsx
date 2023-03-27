import { Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Note } from "@prisma/client";
import { useEffect, useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";
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
  editData,
  isEditing,
  setIsEditing,
}: {
  opened: boolean;
  open: () => void;
  close: () => void;
  refetch: () => void;
  editData?: Note;
  isEditing: boolean;
  setIsEditing: any;
}) {
  useEffect(() => {
    if (isEditing && editData) {
      setShade(editData.shade);
      form.setValues({
        note: editData.note,
        labels: editData.labels,
        shade: editData.shade,
        title: editData.title,
        userId: "cle4rx1j40000rpisr8i0tw2j",
      });
      open();
    }
    return () => {
      close();
    };
  }, [isEditing, editData]);
  const form = useForm<z.infer<typeof ZNote>>();
  const [shade, setShade] = useState<TaskColor>("BANANA");
  const { mutateAsync: createNote } = api.notes.addNote.useMutation();
  const { mutateAsync: editNote } = api.notes.editNote.useMutation();
  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        setIsEditing(false);
      }}
      centered
      size="xl"
      withCloseButton={false}
    >
      <div className="flex w-full justify-between">
        {isEditing ? (
          <h1 className="text-xl font-semibold">Edit note</h1>
        ) : (
          <h1 className="text-xl font-semibold">Create your note</h1>
        )}
        <button className="text-xl font-semibold" type="button" onClick={close}>
          <HiX />
        </button>
      </div>
      <hr className="my-4" />
      <form
        onSubmit={form.onSubmit(async (values) => {
          let resp;

          try {
            if (editData)
              if (!isEditing) {
                resp = await createNote({
                  title: values.title,
                  note: values.note,
                  labels: values.labels || "",
                  shade,
                  userId: "cle4rx1j40000rpisr8i0tw2j",
                });
              } else {
                resp = await editNote({
                  id: editData.id,
                  title: values.title,
                  note: values.note,
                  labels: values.labels || "",
                  shade,
                  userId: "cle4rx1j40000rpisr8i0tw2j",
                });
              }
            if (resp && resp.createdAt) {
              refetch();
              let notifcationData = isEditing
                ? {
                    title: "Task Edited Successfully",
                    message: "Your task has been modified successfully",
                    autoClose: true,
                    color: "green",
                  }
                : {
                    title: "Task Created Successfully",
                    message: "Your task has been created successfully",
                    autoClose: true,
                  };
              notifications.show(notifcationData);
              form.reset();

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
