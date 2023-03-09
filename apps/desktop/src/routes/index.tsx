import TaskPage from "../pages/TaskPage";

const routes = [
  // {
  //   path: "/",
  //   element: <Home />,
  //   nameOfComponent: "Home", // This is optional: it's used for debugging
  // },
  {
    path: "/",
    element: <TaskPage />,
    nameOfComponent: "TaskPage", // This is optional: it's used for debugging
    navbarText: "Task Manager",
  },
  {
    path: "/notes",
    element: <TaskPage />,
    nameOfComponent: "TaskPage", // This is optional: it's used for debugging
    navbarText: "My Notes",
  },
];

export default routes;
