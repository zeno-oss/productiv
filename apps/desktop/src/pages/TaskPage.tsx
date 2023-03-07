import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Task from "../components/Task";
const TaskPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Task />
      </div>
    </div>
  );
};

export default TaskPage;
