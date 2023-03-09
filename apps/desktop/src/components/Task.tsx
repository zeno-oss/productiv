import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";
import { api } from "../utils/trpc";
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
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create a task" size="xl">
        <h1>asd</h1>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
}

const Task: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: tasks,
    refetch: refetchTasks,
    isLoading,
    isFetching,
  } = api.task.getAllTasks.useQuery();
  const [tabIndex, setTabIndex] = useState(0);
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
            style={{
              animation:
                isLoading || isFetching ? "spin 700ms ease infinite" : "none",
              animationDirection: "reverse",
            }}
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
        <div className=" max-h-[60vh] overflow-y-scroll p-8">
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
                .map((task) => <TaskCard task={task} key={task.id} />)}

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
