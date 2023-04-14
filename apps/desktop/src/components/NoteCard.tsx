import { notifications } from "@mantine/notifications";
import { Note } from "@prisma/client";
import { HiPencil, HiTrash } from "react-icons/hi";
import { PALETTE, TASKS_PALETTE } from "variables";
import { api } from "../utils/trpc";

type NoteCardProps = {
  note: Note;
  refetchNotes: () => void;
  opened: boolean;
  open: () => void;
  close: () => void;
  setData: (data: Note) => void; //set view data
  setEditData: (editData: Note) => void;
  setIsEditing: (isEditing: boolean) => void;
};

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  refetchNotes,
  open,
  close,
  setData,
  setEditData,
  setIsEditing,
}) => {
  const { mutateAsync: deleteNote } = api.notes.deleteNote.useMutation();
  const { mutateAsync: editNote } = api.notes.editNote.useMutation();

  if (!note)
    return (
      <div className="w-fit rounded-xl border border-black py-4 px-6">
        error loading this note
      </div>
    );

  return (
    <div
      key={note.id}
      style={{
        backgroundColor: PALETTE[TASKS_PALETTE[note.shade].backgroundColor],
      }}
      className={`cursor-pointer flex-row items-center justify-between rounded-xl border border-black py-4 px-6 pb-2 transition-all hover:scale-[101%] hover:shadow-sm`}
      onClick={() => {
        setData(note);
        open();

        // alert(
        //   `clicked on ${task.title} with id: ${task.id}, actual functionality coming soon`,
        // );
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className=" text-xl font-bold">{note.title}</div>
        <div className="flex gap-1">
          <button
            className="flex aspect-square h-5 w-5 items-center justify-center rounded-lg bg-black p-[2px] text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsEditing(true);
              setEditData(note);
            }}
          >
            <HiPencil className="text-lg" />
          </button>
        </div>
      </div>
      <div className="max-w-[80%] overflow-hidden overflow-ellipsis whitespace-nowrap text-xs">
        {note.note}
      </div>
      <div className="my-2 flex flex-1">
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className="flex flex-1 gap-1 overflow-auto ">
            {note.labels &&
              note.labels
                .split(",")
                .splice(0, 5)
                .map((label) => (
                  <span
                    style={{
                      borderColor:
                        PALETTE[TASKS_PALETTE[note.shade].borderColor],
                    }}
                    className="rounded-full border-2 px-2 text-xs"
                    key={label}
                  >
                    {label}{" "}
                  </span>
                ))}
            <span className="rounded-full text-sm">
              {note.labels && note.labels.split(",").length > 5 && "..."}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-end ">
          <div>
            <button
              className="flex aspect-square h-5 w-5 items-center justify-center rounded-lg text-2xl text-black"
              onClick={async (e) => {
                e.stopPropagation();
                const resp = await deleteNote(note.id);
                if (resp) {
                  notifications.show({
                    title: "Note deleted",
                    message: "Note deleted successfully",
                    color: "red",
                    autoClose: true,
                  });
                }
                refetchNotes();
              }}
            >
              <HiTrash className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
