import { Task } from "@prisma/client";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import { PALETTE, TASKS_PALETTE } from "variables";
import { api } from "../utils/trpc";
type TaskCardProps = { task: Task; refetchTasks: () => void };
const TaskCard = ({ task, refetchTasks }: TaskCardProps): JSX.Element => {
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
      className={`h-fit cursor-pointer flex-row items-center justify-between rounded-xl border border-black py-4 px-6 pb-2 transition-all hover:-translate-y-1 hover:shadow-sm`}
      onClick={() => {
        alert(
          `clicked on ${task.title} with id: ${task.id}, actual functionality coming soon`,
        );
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className=" text-xl font-bold">{task.title}</div>
        <div className="flex gap-1">
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
          <button className="flex aspect-square h-5 w-5 items-center justify-center rounded-lg bg-black p-[2px] text-white ">
            <HiPencil className="text-lg" />
          </button>
        </div>
      </div>
      <div className="max-w-[20ch] overflow-hidden overflow-ellipsis whitespace-nowrap text-xs">
        {task.description}
      </div>
      <div className="my-2 flex flex-1">
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className="flex flex-col items-start">
            <div className="flex items-center justify-center gap-2">
              <HiOutlineCalendar className="text-lg" />
              <span className="text-sm">{task.endTime.toDateString()}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <HiOutlineClock className="text-lg" />
              <span className="text-sm">
                {task.endTime.toLocaleTimeString("en-GB", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-1 gap-1 overflow-auto ">
            {task.labels &&
              task.labels
                .split(",")
                .splice(0, 3)
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
              {task.labels && task.labels.split(",").length > 3 && "..."}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-end ">
          <div
            onClick={async (e) => {
              e.stopPropagation();
              if (task.status === "DONE") {
                alert("Marking task as incomplete");
                editTask({ ...task, status: "TODO" });
                return;
              }
              await markTaskAsCompleted(task.id);
              refetchTasks();
            }}
            className=" "
          >
            <button
              className={`h-5 w-5 rounded-full border-2 border-black transition-all duration-200 focus-visible:outline-offset-2 focus-visible:outline-white ${
                task.status === "DONE" ? "border-4 bg-white" : ""
              }`}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
