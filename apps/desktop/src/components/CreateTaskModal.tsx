import { Modal, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { ZTask } from "server/types";
import { api } from "../utils/trpc";
import { TaskColor } from "types";
import { TASKS_PALETTE } from "variables";
import { z } from "zod";
import ColorCircle from "./ColorCircle";
function CreateTaskModal({
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
  const form = useForm<z.infer<typeof ZTask>>();
  const [shade, setShade] = useState<TaskColor>("BANANA");
  const { mutateAsync: createTask } = api.task.addTask.useMutation();
  return (
    <Modal opened={opened} onClose={close} size="xl">
      <h1 className="text-xl font-semibold">Create your task</h1>
      <hr />
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            let a = values.startTime.getTime();
            let b = values.endTime.getTime();
            if (a > b) {
              notifications.show({
                title: "Error",
                message: "Start time cannot be greater than end time",
                autoClose: true,
                color: "yellow",
              });
              return;
            }
          } catch (e) {
            notifications.show({
              title: "Error",
              message: "Start time and end time cannot be empty",
              autoClose: true,
              color: "red",
            });
            return;
          }
          const resp = await createTask({
            title: values.title,
            description: values.description,
            labels: values.labels || "",
            startTime: values.startTime,
            endTime: values.endTime,
            shade,
            status: "TODO",
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
}

export default CreateTaskModal;
