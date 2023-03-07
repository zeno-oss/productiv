const NavbarItem = ({ text, active }: { text: string; active: boolean }) => {
  console.log({ active, text });
  return (
    <button
      className={`flex w-full items-center gap-6 px-4 py-2 ${
        active ? "bg-slate-200" : "hover:bg-slate-100"
      } rounded-lg `}
      type="button"
    >
      <div className="h-6 w-6 rounded-lg bg-slate-400"></div>
      <div className={`flex-1 text-left ${active ? "font-medium" : ""}`}>
        {text}
      </div>
    </button>
  );
};

export default NavbarItem;
