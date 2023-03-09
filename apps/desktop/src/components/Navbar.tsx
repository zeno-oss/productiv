import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <div className="flex items-center gap-4 border-b border-black p-4 text-2xl">
      <HiOutlineMenuAlt2 />
      <Link to={"/"}>
        <div className="select-none font-bold">Productiv</div>
      </Link>
    </div>
  );
};

export default Navbar;
