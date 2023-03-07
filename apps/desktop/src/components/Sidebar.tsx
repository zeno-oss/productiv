import { useLocation } from "react-router-dom";
import NavbarItem from "./NavbarItem";
const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname, location.pathname === "/task");
  return (
    <div className="flex h-full w-[30%] min-w-fit max-w-xs flex-col gap-2 border-r border-black p-4">
      <NavbarItem active={location.pathname === "/task"} text="Task Manager" />
      <NavbarItem active={location.pathname === ""} text="Appointments" />
      <NavbarItem active={location.pathname === ""} text="Habit Builder" />
      <NavbarItem active={location.pathname === ""} text="My Notes" />
    </div>
  );
};

export default Sidebar;
