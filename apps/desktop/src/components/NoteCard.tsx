import { Task } from "@prisma/client";
import { HiPencil, HiTrash } from "react-icons/hi";
import { PALETTE, TASKS_PALETTE } from "variables";
import { api } from "../utils/trpc";

type NoteCardProps = {
  task: Task;
  refetchTasks: () => void;
  opened: boolean;
  open: () => void;
  close: () => void;
  setData: (data: Task) => void;
};

const NoteCard: React.FC<NoteCardProps> = ({
  task,
  refetchTasks,
  open,
  close,
  setData,
}) => {
  const { mutateAsync: markTaskAsCompleted } =
    api.task.completeTask.useMutation();
  const { mutateAsync: deleteTask } = api.task.deleteTask.useMutation();
  const { mutateAsync: editTask } = api.task.editTask.useMutation();

  if (!task)
    return (
      <div className="w-fit rounded-xl border border-black py-4 px-6">
        error loading this task
      </div>
    );

  return (
    <div
      key={task.id}
      style={{
        backgroundColor: PALETTE[TASKS_PALETTE[task.shade].backgroundColor],
      }}
      className={`cursor-pointer flex-row items-center justify-between rounded-xl border border-black py-4 px-6 pb-2 transition-all hover:scale-[101%] hover:shadow-sm`}
      onClick={() => {
        setData(task);
        open();

        // alert(
        //   `clicked on ${task.title} with id: ${task.id}, actual functionality coming soon`,
        // );
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className=" text-xl font-bold">{task.title}</div>
        <div className="flex gap-1">
          <button className="flex aspect-square h-5 w-5 items-center justify-center rounded-lg bg-black p-[2px] text-white ">
            <HiPencil className="text-lg" />
          </button>
        </div>
      </div>
      <div className="max-w-[80%] overflow-hidden overflow-ellipsis whitespace-nowrap text-xs">
        {task.description}
      </div>
      <div className="my-2 flex flex-1">
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className="flex flex-1 gap-1 overflow-auto ">
            {task.labels &&
              task.labels
                .split(",")
                .splice(0, 5)
                .map((label) => (
                  <span
                    style={{
                      borderColor:
                        PALETTE[TASKS_PALETTE[task.shade].borderColor],
                    }}
                    className="rounded-full border-2 px-2 text-xs"
                    key={label}
                  >
                    {label}{" "}
                  </span>
                ))}
            <span className="rounded-full text-sm">
              {task.labels && task.labels.split(",").length > 5 && "..."}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-end ">
          <div>
            <button
              className="flex aspect-square h-5 w-5 items-center justify-center rounded-lg text-2xl text-black"
              onClick={async (e) => {
                e.stopPropagation();
                await deleteTask(task.id);
                refetchTasks();
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
