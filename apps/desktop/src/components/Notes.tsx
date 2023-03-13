import { useDisclosure } from "@mantine/hooks";
import { Task } from "@prisma/client";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";
import { PALETTE, TASKS_PALETTE } from "variables";
import { api } from "../utils/trpc";
import CreateNoteModal from "./CreateNoteModal";
import NoteCard from "./NoteCard";
import ViewChildrenInModal from "./ViewChildrenInModal";
const Notes: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedView, { open: openView, close: closeView }] =
    useDisclosure(false);
  const [tabIndex, setTabIndex] = useState(0);

  const [viewModalData, setViewModalData] = useState<Task>({
    id: "0",
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
  });
  const {
    data: tasks,
    refetch: refetchTasks,
    isLoading,
    isFetching,
  } = api.notes.getNotes.useQuery();
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
          Create a Note
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
          Refresh Notes
        </button>
      </div>
      <div className="flex-1 items-center justify-center">
        <hr />
        {tabIndex !== 2 && (
          <h1 className="px-8 py-4 font-bold">
            You have {tasks && tasks.length} Note
            {tasks && tasks.length > 1 && "s"}.
          </h1>
        )}
        <div className=" max-h-[60vh] overflow-y-scroll p-8 pt-4">
          <div className="grid grid-cols-1 gap-4 transition-transform lg:grid-cols-2">
            {tasks &&
              tasks.map((task) => (
                <NoteCard
                  task={task}
                  key={task.id}
                  refetchTasks={refetchTasks}
                  opened={openedView}
                  open={openView}
                  close={closeView}
                  setData={setViewModalData}
                />
              ))}

            {tasks && tasks.length < 1 && (
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
      <CreateNoteModal
        opened={opened}
        open={open}
        close={close}
        refetch={refetchTasks}
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
            className="border-b-2 pb-2 text-3xl font-bold"
            style={{
              borderColor:
                PALETTE[TASKS_PALETTE[viewModalData?.shade].borderColor],
            }}
          >
            {viewModalData?.title}
          </h1>
          <p className="flex-1">{viewModalData?.description}</p>
          <div className="flex gap-2">
            {viewModalData?.labels &&
              viewModalData.labels.split(",").map((label) => (
                <span
                  style={{
                    borderColor:
                      PALETTE[TASKS_PALETTE[viewModalData?.shade].borderColor],
                  }}
                  className="cursor-default rounded-full border-2 px-2 text-sm"
                  key={label}
                >
                  {label}
                </span>
              ))}
          </div>
        </div>
      </ViewChildrenInModal>
    </div>
  );
};

export default Notes;
