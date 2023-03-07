import { Task } from "@prisma/client";
import { HiOutlineCalendar, HiOutlineClock, HiPencil } from "react-icons/hi";
import { PALETTE, TASKS_PALETTE } from "variables";
type Shade = keyof typeof PALETTE;
type TaskCardProps = { task: Task };
const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
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
      className="w-[300px] cursor-pointer rounded-xl border border-black py-4 px-6 transition-all hover:-translate-y-1 hover:shadow-sm"
      onClick={() => {
        alert(
          `clicked on ${task.title} with id: ${task.id}, actual functionality coming soon`,
        );
      }}
    >
      <div className="mb-2 flex-row items-center justify-between">
        <div className="flex flex-1 justify-between gap-4">
          <div className="flex flex-1 gap-1 overflow-auto">
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
            {!task.labels && <span className="text-xs italic">No Labels</span>}
            <span className="rounded-full text-sm">
              {task.labels && task.labels.split(",").length > 3 && "..."}
            </span>
          </div>
          <div className="flex aspect-square h-5 w-5 items-center justify-center rounded-lg bg-black p-[2px] text-white ">
            <HiPencil className="text-lg" />
          </div>
        </div>

        <div className="my-2 text-xl font-bold">{task.title}</div>
        <div className="flex justify-between">
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
          <div className="flex flex-1 items-end justify-end ">
            <div onClick={() => {}} className=" ">
              <div className="h-5 w-5 rounded-full border-2 border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
