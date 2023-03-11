import { Modal, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { HiCheck, HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";
import { ZTask } from "server/types";
import { TaskColor } from "types";
import { TASKS_PALETTE } from "variables";
import { z } from "zod";
import { api } from "../utils/trpc";
import ColorCircle from "./ColorCircle";
import TaskCard from "./TaskCard";

function CreateTaskModal({
  opened,
  open,
  close,
}: {
  opened: boolean;
  open: () => void;
  close: () => void;
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

const Task: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [tabIndex, setTabIndex] = useState(0);
  let typeOfTasks: "TODAY" | "UPCOMING" | "DONE" =
    tabIndex === 0 ? "TODAY" : tabIndex === 1 ? "UPCOMING" : "DONE";
  const {
    data: tasks,
    refetch: refetchTasks,
    isLoading,
    isFetching,
  } = api.task.getTasks.useQuery(typeOfTasks);
  return (
    <div className="flex max-h-screen w-full flex-col">
      <div className="flex h-24 items-center justify-center gap-4 border-b border-black p-4">
        {/* <input
          type="text"
          placeholder="Start Typing to search for a task..."
          className="w-full max-w-2xl rounded-full border border-black p-4 py-2 font-bold placeholder:font-semibold"
        /> */}
        <button
          onClick={open}
          type="button"
          className="flex max-w-[10rem] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-black py-2 px-4 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          <HiOutlinePlus />
          Add Task
        </button>
        <button
          type="button"
          className="flex max-w-[10rem] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-black py-2 px-4 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          onClick={() => refetchTasks()}
          disabled={isLoading || isFetching}
        >
          <HiOutlineRefresh
            style={
              isLoading || isFetching
                ? {
                    animation: "spin 700ms ease infinite",
                    animationDirection: "reverse",
                  }
                : {}
            }
            // className={` ${isLoading || isFetching ? "animate-spin" : ""}`}
          />
          Refresh Tasks
        </button>
      </div>
      <div className="flex-1 items-center justify-center">
        <div className="flex h-20 items-center justify-center gap-8 ">
          <button
            type="button"
            onClick={() => setTabIndex(0)}
            className={`flex cursor-pointer items-center justify-center rounded-full border-2 px-5 py-1 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-black ${
              tabIndex === 0 ? "bg-black text-white" : ""
            }`}
          >
            Today & Past
          </button>
          <button
            type="button"
            onClick={() => setTabIndex(1)}
            className={`flex cursor-pointer items-center justify-center rounded-full border-2 px-5 py-1 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-black ${
              tabIndex === 1 ? "bg-black text-white" : ""
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setTabIndex(2)}
            className={`flex cursor-pointer items-center justify-center rounded-full border-2 px-5 py-1 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-black ${
              tabIndex === 2 ? "bg-black text-white" : ""
            }`}
          >
            Done
          </button>
        </div>
        <hr />
        {tabIndex !== 2 && (
          <h1 className="px-8 py-4 font-bold">
            You have{" "}
            {tasks &&
              tasks?.filter((task) => {
                if (tabIndex === 0)
                  return task.endTime < new Date() && task.status !== "DONE";
                if (tabIndex === 1)
                  return task.endTime > new Date() && task.status !== "DONE";
                if (tabIndex === 2) return task.status === "DONE";
                return task;
              }).length}{" "}
            Task
            {tasks &&
              tasks?.filter((task) => {
                if (tabIndex === 0)
                  return task.endTime < new Date() && task.status !== "DONE";
                if (tabIndex === 1)
                  return task.endTime > new Date() && task.status !== "DONE";
                if (tabIndex === 2) return task.status === "DONE";
                return task;
              }).length > 1 &&
              "s"}
            .
          </h1>
        )}
        <div className=" max-h-[60vh] overflow-y-scroll p-8 pt-4">
          <div className="grid grid-cols-1 gap-4 transition-transform lg:grid-cols-2 xl:grid-cols-3">
            {tasks &&
              tasks
                ?.filter((task) => {
                  if (tabIndex === 0)
                    return task.endTime < new Date() && task.status !== "DONE";
                  if (tabIndex === 1)
                    return task.endTime > new Date() && task.status !== "DONE";
                  if (tabIndex === 2) return task.status === "DONE";
                  return task;
                })
                .map((task) => (
                  <TaskCard
                    task={task}
                    key={task.id}
                    refetchTasks={refetchTasks}
                  />
                ))}

            {tasks &&
              tasks?.filter((task) => {
                if (tabIndex === 0)
                  return task.endTime < new Date() && task.status !== "DONE";
                if (tabIndex === 1)
                  return task.endTime > new Date() && task.status !== "DONE";
                if (tabIndex === 2) return task.status === "DONE";
                return task;
              }).length < 1 && (
                <div className="whitespace-nowrap text-xl font-semibold italic text-gray-500">
                  Nothing tasks in {tabIndex === 0 && <span>Today & Past</span>}
                  {tabIndex === 1 && <span>Upcoming</span>}
                  {tabIndex === 2 && <span>Done</span>} section{" "}
                  <span className="not-italic">🥳</span>
                </div>
              )}
          </div>
        </div>
      </div>
      <CreateTaskModal opened={opened} open={open} close={close} />
    </div>
  );
};

export default Task;
