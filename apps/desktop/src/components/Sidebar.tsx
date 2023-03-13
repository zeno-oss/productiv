import { Link, useLocation } from "react-router-dom";
import routes from "../routes";
import NavbarItem from "./NavbarItem";
const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname, location.pathname === "/task");
  return (
    <div className="flex h-full w-[30%] min-w-fit max-w-xs flex-col gap-2 border-r border-black p-4">
      {routes.map((route) => {
        return (
          <Link to={route.path} className="rounded-lg" key={route.navbarText}>
            <NavbarItem
              icon={route.icon}
              active={location.pathname === route.path}
              text={route.navbarText}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
