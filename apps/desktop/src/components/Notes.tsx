import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Color, Note } from "@prisma/client";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineRefresh } from "react-icons/hi";
import { PALETTE, TASKS_PALETTE } from "variables";
import { api } from "../utils/trpc";
import CreateDrawingModal from "./CreateDrawingModal";
import CreateNoteModal from "./CreateNoteModal";
import NoteCard from "./NoteCard";
import ViewChildrenInModal from "./ViewChildrenInModal";
const Notes: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDrawingModal, { open: openDrawing, close: closeDrawing }] =
    useDisclosure(false);
  const [openedView, { open: openView, close: closeView }] =
    useDisclosure(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const dummyNote = {
    id: "0",
    title: "",
    note: "",
    shade: "BANANA" as Color,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "0",
    labels: "",
  };
  const [editData, setEditData] = useState(dummyNote);
  const [viewModalData, setViewModalData] = useState<Note>(dummyNote);
  const {
    data: notes,
    refetch: refetchNotes,
    isLoading,
    isFetching,
  } = api.notes.getNotes.useQuery("cle4rx1j40000rpisr8i0tw2j");
  return (
    <div className="flex max-h-screen w-full flex-col">
      <div className="flex h-24 items-center justify-center gap-4 border-b border-black p-4">
        {/* <input
          type="text"
          placeholder="Start Typing to search for a task..."
          className="w-full max-w-2xl rounded-full border border-black p-4 py-2 font-bold placeholder:font-semibold"
        /> */}
        <button
          onClick={openDrawing}
          type="button"
          className="flex max-w-[10rem] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-black py-2 px-4 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          <HiOutlinePlus />
          Create a Drawing
        </button>
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
          onClick={async () => {
            let resp = await refetchNotes();
            if (resp) {
              notifications.show({
                title: "Notes Refreshed",
                message: "Notes have been refreshed successfully",
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
          Refresh Notes
        </button>
      </div>
      <div className="flex-1 items-center justify-center">
        <hr />
        {tabIndex !== 2 && (
          <h1 className="px-8 py-4 font-bold">
            You have {notes && notes.length} Note
            {notes && notes.length > 1 && "s"}.
          </h1>
        )}
        <div className=" max-h-[60vh] overflow-y-scroll p-8 pt-4">
          <div className="grid grid-cols-1 gap-4 transition-transform lg:grid-cols-2">
            {notes &&
              notes.map((note) => (
                <NoteCard
                  setEditData={setEditData}
                  setIsEditing={setIsEditing}
                  note={note}
                  key={note.id}
                  refetchNotes={refetchNotes}
                  opened={openedView}
                  open={openView}
                  close={closeView}
                  setData={setViewModalData}
                />
              ))}

            {notes && notes.length < 1 && (
              <div className="whitespace-nowrap text-xl font-semibold italic text-gray-500">
                Nothing notes in {tabIndex === 0 && <span>Today & Past</span>}
                {tabIndex === 1 && <span>Upcoming</span>}
                {tabIndex === 2 && <span>Done</span>} section{" "}
                <span className="not-italic">🥳</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <CreateNoteModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editData={editData}
        opened={opened}
        open={open}
        close={close}
        refetch={refetchNotes}
      />
      <CreateDrawingModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editData={editData}
        opened={openedDrawingModal}
        open={openDrawing}
        close={closeDrawing}
        refetch={refetchNotes}
      />
      <ViewChildrenInModal
        opened={openedView}
        open={openView}
        close={closeView}
        refetch={refetchNotes}
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
          <p className="flex-1">{viewModalData?.note}</p>
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
