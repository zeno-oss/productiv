import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Notes from "../components/Notes";
const NotesPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Notes />
      </div>
    </div>
  );
};

export default NotesPage;
