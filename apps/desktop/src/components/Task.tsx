import { api } from "../utils/trpc";
import TaskCard from "./TaskCard";
import { HiOutlineRefresh } from "react-icons/hi";
import { useState } from "react";
const Task: React.FC = () => {
  const tasks = api.task.getAllTasks.useQuery();
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="flex max-h-screen w-full flex-col">
      <div className="flex h-24 items-center justify-center gap-4 border-b  border-black p-4">
        <input
          type="text"
          placeholder="Start Typing to add a new Task"
          className="w-full max-w-2xl rounded-full border border-black p-4 py-1 font-bold placeholder:font-semibold "
        />
        <button
          type="button"
          className="flex max-w-[10rem] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-black py-2 px-4 text-sm text-white"
        >
          <HiOutlineRefresh />
          Refresh Tasks
        </button>
      </div>
      <div className="flex-1 items-center justify-center">
        <div className="flex h-20 items-center justify-center gap-8 ">
          <div
            onClick={() => setTabIndex(0)}
            className="flex cursor-pointer items-center justify-center rounded-full bg-black px-5 py-1 font-medium text-white"
          >
            Today
          </div>
          <div
            onClick={() => setTabIndex(1)}
            className="flex cursor-pointer items-center justify-center rounded-full px-5 py-1 font-medium"
          >
            Upcoming
          </div>
          <div
            onClick={() => setTabIndex(2)}
            className="flex cursor-pointer items-center justify-center rounded-full px-5 py-1 font-medium"
          >
            Done
          </div>
        </div>
        <hr />
        {tabIndex === 0 && <div>Today</div>}
        {tabIndex === 1 && <div>Upcoming</div>}
        {tabIndex === 2 && <div>Done</div>}
        <div className=" max-h-[60vh] overflow-y-scroll p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {tasks &&
              tasks.data &&
              tasks.data
                ?.filter((task) => {
                  console.log(new Date(task.endTime));
                  return task;
                })
                .map((task) => <TaskCard task={task} key={task.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
