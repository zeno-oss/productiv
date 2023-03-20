import { Modal, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Task } from "@prisma/client";
import { useEffect, useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import { ZTask } from "server/types";
import { TaskColor } from "types";
import { TASKS_PALETTE } from "variables";
import { z } from "zod";
import { api } from "../utils/trpc";
import ColorCircle from "./ColorCircle";
const CreateTaskModal: React.FC<{
  opened: boolean;
  open: () => void;
  close: () => void;
  refetch: () => void;
  isEditing?: boolean;
  setIsEditing: any;
  editData?: Task;
}> = ({ opened, open, close, refetch, isEditing, editData, setIsEditing }) => {
  useEffect(() => {
    if (isEditing && editData) {
      setShade(editData.shade);
      form.setValues({
        description: editData.description,
        endTime: editData.endTime,
        labels: editData.labels,
        shade: editData.shade,
        startTime: editData.startTime,
        status: editData.status,
        title: editData.title,
        userId: "cle4rx1j40000rpisr8i0tw2j",
      });
      open();
    }
    return () => {
      close();
    };
  }, [isEditing, editData]);

  const form = useForm<z.infer<typeof ZTask>>();

  const [shade, setShade] = useState<TaskColor>("BANANA");
  const { mutateAsync: createTask } = api.task.addTask.useMutation();
  const { mutateAsync: editTask } = api.task.editTask.useMutation();
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setIsEditing(false);
        close();
      }}
      size="xl"
      withCloseButton={false}
      centered
    >
      <div className="flex w-full justify-between">
        {isEditing ? (
          <h1 className="text-xl font-semibold">Edit task</h1>
        ) : (
          <h1 className="text-xl font-semibold">Create your task</h1>
        )}
        <button className="text-xl font-semibold" type="button" onClick={close}>
          <HiX />
        </button>
      </div>
      <hr className="my-4" />
      <form
        onSubmit={form.onSubmit(async (values) => {
          let resp;
          if (editData)
            if (!isEditing)
              resp = await createTask({
                title: values.title,
                description: values.description,
                labels: values.labels || "",
                startTime: values.startTime,
                endTime: values.endTime,
                shade,
                status: "TODO",
                userId: "cle4rx1j40000rpisr8i0tw2j",
              });
            else
              resp = await editTask({
                title: values.title,
                description: values.description,
                labels: values.labels || "",
                startTime: values.startTime,
                endTime: values.endTime,
                shade,
                status: "TODO",
                userId: "cle4rx1j40000rpisr8i0tw2j",
                id: editData.id,
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
        })}
        className="flex flex-col gap-2"
      >
        <TextInput
          withAsterisk
          required
          label="Task"
          placeholder="e.g. Study for the test"
          {...form.getInputProps("title")}
          name="title"
        />
        <TextInput
          withAsterisk
          required
          label="Description"
          placeholder="e.g. Study for the test"
          {...form.getInputProps("description")}
          name="description"
        />
        <TextInput
          label="Labels ( comma separated )"
          placeholder="e.g. Book, Study, Test, University"
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

        <div className="flex justify-between gap-4">
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
        </div>
        <button className="mt-4 flex w-fit items-center justify-center gap-4 rounded-full border bg-black p-4 py-2 text-white">
          <HiCheck /> Submit
        </button>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
