import Home from "../components/Home";
import TaskPage from "../pages/TaskPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    nameOfComponent: "Home", // This is optional: it's used for debugging
  },
  {
    path: "/task",
    element: <TaskPage />,
    nameOfComponent: "TaskPage", // This is optional: it's used for debugging
  },
];

export default routes;
