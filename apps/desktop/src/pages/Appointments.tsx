import { notifications } from "@mantine/notifications";
import { HiClipboard } from "react-icons/hi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Appointments: React.FC = () => {
  const url = "https://www.google.com";
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
          Share this link to allow appointment scheduling with you:
          <div
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-200 p-2 font-semibold"
            onClick={() => {
              navigator.clipboard.writeText(url);
              notifications.show({
                title: "Link Copied",
                message: "You can now paste the link anywhere you want.",
                autoClose: true,
                color: "green",
              });
            }}
          >
            {url}
            <HiClipboard />
          </div>
          <div className="my-3 italic">
            any appointments will be shown as a task in the task manager
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
