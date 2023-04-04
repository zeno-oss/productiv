import { Tldraw, TldrawApp } from "@tldraw/tldraw";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DrawingPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="relative h-full w-full overflow-hidden">
          <Tldraw
            showMultiplayerMenu={false}
            showMenu={true}
            onChange={async (app: TldrawApp, reason) => {
              const to_ignore = ["set_status:idle", "session:complete:Fi"];
              if (reason && to_ignore.includes(reason)) {
                console.log(app, reason);
                const json = app.getContent();
                // console.log({ jsonData: json?.shapes });
                app.resetDocument();
                console.log({ data: JSON.stringify(json) });
                // wait for 2 seconds
                await new Promise((resolve) => setTimeout(resolve, 2000));

                if (json) {
                  app.insertContent(json);
                }
              }
              return;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DrawingPage;
