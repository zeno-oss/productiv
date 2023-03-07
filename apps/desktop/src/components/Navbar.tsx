import { HiOutlineMenuAlt2 } from "react-icons/hi";
const Navbar: React.FC = () => {
  return (
    <div className="flex items-center gap-4 border-b border-black p-4 text-2xl">
      <HiOutlineMenuAlt2 />
      <div className="font-bold">Productiv</div>
    </div>
  );
};

export default Navbar;
