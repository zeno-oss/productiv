import { HiCheck, HiClipboardList } from "react-icons/hi";
import NotesPage from "../pages/NotesPage";
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
    icon: <HiCheck />,
  },
  {
    path: "/notes",
    element: <NotesPage />,
    nameOfComponent: "NotesPage", // This is optional: it's used for debugging
    navbarText: "My Notes",
    icon: <HiClipboardList />,
  },
];

export default routes;
