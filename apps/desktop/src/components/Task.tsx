import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Task } from "@prisma/client";
import { useState } from "react";
import {
  HiCheck,
  HiOutlinePlus,
  HiOutlineRefresh,
  HiPencil,
  HiTrash,
  HiX,
} from "react-icons/hi";
import { PALETTE, TASKS_PALETTE } from "variables";
import { api } from "../utils/trpc";
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";
import ViewChildrenInModal from "./ViewChildrenInModal";
const Task: React.FC = () => {
  const [openedView, { open: openView, close: closeView }] =
    useDisclosure(false);
  let dummyTask: Task = {
    id: "cle4rx1j40000rpisr8i0tw2j",
    title: "",
    description: "",
    shade: "BANANA",
    createdAt: new Date(),
    updatedAt: new Date(),
    endTime: new Date(),
    startTime: new Date(),
    userId: "0",
    labels: "",
    status: "IN_PROGRESS",
  };
  const [viewModalData, setViewModalData] = useState<Task>(dummyTask);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<Task>(dummyTask);

  const [opened, { open, close }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  let typeOfTasks: "TODAY" | "UPCOMING" | "DONE" | "ALL" =
    searchQuery === ""
      ? tabIndex === 0
        ? "TODAY"
        : tabIndex === 1
        ? "UPCOMING"
        : "DONE"
      : "ALL";
  const {
    data: tasks,
    refetch: refetchTasks,
    isLoading,
    isFetching,
  } = api.task.getTasks.useQuery(typeOfTasks);
  const { mutateAsync: markTaskAsCompleted } =
    api.task.completeTask.useMutation();
  const { mutateAsync: deleteTask } = api.task.deleteTask.useMutation();
  const { mutateAsync: editTask } = api.task.editTask.useMutation();
  return (
    <div className="flex max-h-screen w-full flex-col">
      <div className="flex h-24 items-center justify-center gap-4 border-b border-black p-4">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a task or label..."
          className="w-full max-w-2xl rounded-full border border-black p-4 py-2 font-bold placeholder:font-semibold"
          type="search"
        />
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
          onClick={async () => {
            let resp = await refetchTasks();
            if (resp) {
              notifications.show({
                title: "Tasks Refreshed",
                message: "Tasks have been refreshed successfully",
                color: "teal",
                autoClose: true,
              });
            }
          }}
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
      {searchQuery === "" && (
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
              You have {tasks && tasks.length} Task
              {tasks && tasks.length > 1 && "s"}.
            </h1>
          )}
          {tabIndex === 2 && (
            <h1 className="px-8 py-4 font-bold">
              Completed {tasks && tasks.length} Task
              {tasks && tasks.length > 1 && "s"}.
            </h1>
          )}
          <div className=" max-h-[50vh] overflow-y-scroll p-8 pt-4 lg:max-h-[60vh]">
            <div className="grid grid-cols-1 gap-4 transition-transform lg:grid-cols-2 xl:grid-cols-4">
              {isLoading && (
                <div className="flex w-full items-center justify-center">
                  <Loader />
                </div>
              )}
              {tasks &&
                tasks.map((task) => (
                  <TaskCard
                    task={task}
                    key={task.id}
                    refetchTasks={refetchTasks}
                    setData={setViewModalData}
                    open={openView}
                    setIsEditing={setIsEditing}
                    setEditData={setEditData}
                  />
                ))}

              {tasks && tasks.length < 1 && (
                <div className="whitespace-nowrap text-xl font-semibold italic text-gray-500">
                  Nothing tasks in {tabIndex === 0 && <span>Today & Past</span>}
                  {tabIndex === 1 && <span>Upcoming</span>}
                  {tabIndex === 2 && <span>Done</span>} section
                  <span className="not-italic">🥳</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {searchQuery !== "" && (
        <div className="flex flex-1 flex-col items-center p-8">
          <hr />
          <div className="max-h-[50vh] overflow-y-scroll p-8 pt-4 lg:max-h-[60vh]">
            <div className="grid grid-cols-1 gap-4 transition-transform lg:grid-cols-2 xl:grid-cols-4">
              {isLoading && <Loader />}
              {tasks &&
                tasks.filter(
                  (task) =>
                    task.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    task.description
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    task.labels
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                ) &&
                tasks
                  .filter(
                    (task) =>
                      task.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      task.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      task.labels
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((task) => (
                    <TaskCard
                      task={task}
                      key={task.id}
                      refetchTasks={refetchTasks}
                      setData={setViewModalData}
                      open={openView}
                      setIsEditing={setIsEditing}
                      setEditData={setEditData}
                    />
                  ))}
              {tasks &&
                tasks.filter(
                  (task) =>
                    task.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    task.description
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    task.labels
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                ).length < 1 && (
                  <div className="flex flex-1 gap-2 whitespace-nowrap">
                    No tasks matching {searchQuery}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
      <CreateTaskModal
        opened={opened}
        open={open}
        close={close}
        refetch={refetchTasks}
        isEditing={isEditing}
        editData={editData}
        setIsEditing={setIsEditing}
      />
      <ViewChildrenInModal
        opened={openedView}
        open={openView}
        close={closeView}
        refetch={refetchTasks}
        modalColors={{
          backgroundColor:
            PALETTE[TASKS_PALETTE[viewModalData?.shade].backgroundColor],
          borderColor: PALETTE[TASKS_PALETTE[viewModalData?.shade].borderColor],
        }}
      >
        <div className="flex min-h-[50vh] flex-col gap-4">
          <h1
            className="flex gap-2 border-b-2 pb-2 text-3xl font-bold"
            style={{
              borderColor:
                PALETTE[TASKS_PALETTE[viewModalData?.shade].borderColor],
            }}
          >
            <div className="flex-1">{viewModalData?.title}</div>
            <div
              onClick={async (e) => {
                e.stopPropagation();
                if (viewModalData.status === "DONE") {
                  await editTask({ ...viewModalData, status: "TODO" });
                  await refetchTasks();
                  closeView();
                  return;
                }
                await markTaskAsCompleted(viewModalData.id);
                await refetchTasks();
                closeView();
              }}
              className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-green-100 px-4 text-sm opacity-50 transition-all hover:opacity-100 "
            >
              {viewModalData.status === "DONE" && (
                <>
                  <HiX />
                  Mark as Undone
                </>
              )}
              {viewModalData.status !== "DONE" && (
                <>
                  <HiCheck />
                  Mark as Done
                </>
              )}
            </div>
          </h1>
          <p className="flex-[2]">{viewModalData?.description}</p>
          <div className="flex  flex-col">
            <div className="flex gap-2">
              <b>Start Time:</b>
              <div>{viewModalData?.startTime.toLocaleString("en-GB")}</div>
            </div>
            <div className="flex gap-2">
              <b>End Time:</b>
              <div>{viewModalData?.endTime.toLocaleString("en-GB")}</div>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="flex items-center justify-center gap-2 ">
              {viewModalData?.labels &&
                viewModalData.labels.split(",").map((label) => (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery(label);
                      closeView();
                    }}
                    style={{
                      borderColor:
                        PALETTE[
                          TASKS_PALETTE[viewModalData?.shade].borderColor
                        ],
                    }}
                    className="cursor-pointer rounded-full border-2 px-2 text-sm "
                    key={label}
                  >
                    {label}
                  </span>
                ))}
            </div>
            <div className="flex gap-2">
              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                  closeView();
                  setEditData(viewModalData);
                }}
                className="flex w-fit cursor-pointer items-center justify-center gap-1 rounded-full bg-blue-100 py-2 px-3 text-xs font-bold opacity-50 transition-all hover:opacity-100 "
              >
                <HiPencil /> Edit
              </div>

              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  await deleteTask(viewModalData.id);
                  refetchTasks();
                  closeView();
                }}
                className="flex w-fit cursor-pointer items-center justify-center gap-1 rounded-full bg-red-100 py-2 px-3 text-xs font-bold opacity-50 transition-all hover:opacity-100 "
              >
                <HiTrash />
                Delete
              </div>
            </div>
          </div>
        </div>
      </ViewChildrenInModal>
    </div>
  );
};

export default Task;
