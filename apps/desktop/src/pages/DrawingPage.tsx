import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Tldraw } from "@tldraw/tldraw";

interface ComponentProps {
  //Your component props
}

const DrawingPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="relative h-full w-full overflow-hidden">
          <Tldraw />
        </div>
      </div>
    </div>
  );
};

export default DrawingPage;
