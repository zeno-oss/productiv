const NavbarItem = ({ text, active }: { text: string; active: boolean }) => {
  // console.log({ active, text });
  return (
    <div
      className={`flex w-full items-center gap-6 px-4 py-2 ${
        active ? "bg-slate-200" : "hover:bg-slate-100"
      } rounded-lg `}
    >
      <div className="h-6 w-6 rounded-lg bg-slate-400"></div>
      <div className={`flex-1 p-2 text-left ${active ? "font-medium" : ""}`}>
        {text}
      </div>
    </div>
  );
};

export default NavbarItem;
