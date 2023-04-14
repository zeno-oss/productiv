import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Note } from "@prisma/client";
import { Tldraw, TldrawApp } from "@tldraw/tldraw";
import { HiLogout } from "react-icons/hi";
import { ZNote } from "server/types";
import { Transition } from "@mantine/core";
import { z } from "zod";
const CreateDrawingModal: React.FC<{
  opened: boolean;
  open: () => void;
  close: () => void;
  refetch: () => void;
  editData?: Note;
  isEditing: boolean;
  setIsEditing: any;
}> = ({ opened, open, close, refetch, editData, isEditing, setIsEditing }) => {
  // useEffect(() => {
  //   if (isEditing && editData) {
  //     setShade(editData.shade);
  //     form.setValues({
  //       note: editData.note,
  //       labels: editData.labels,
  //       shade: editData.shade,
  //       title: editData.title,
  //       userId: "cle4rx1j40000rpisr8i0tw2j",
  //     });
  //     open();
  //   }
  //   return () => {
  //     close();
  //   };
  // }, [isEditing, editData]);
  const form = useForm<z.infer<typeof ZNote>>();
  // const [shade, setShade] = useState<TaskColor>("BANANA");
  // const { mutateAsync: createNote } = api.notes.addNote.useMutation();
  // const { mutateAsync: editNote } = api.notes.editNote.useMutation();
  return (
    <Transition
      mounted={opened}
      transition="pop"
      duration={300}
      timingFunction="ease-in"
    >
      {(styles) => (
        <div
          style={styles}
          className={`absolute inset-0 h-screen w-screen transition-all`}
        >
          <div className="absolute right-2 bottom-4 z-[300] flex h-fit w-fit flex-col items-center rounded-lg bg-white p-4 py-3 text-sm font-semibold text-black shadow-lg">
            Your changes will be auto saved
          </div>
          <div className="absolute left-0 top-0 z-[300] flex h-fit w-fit items-center rounded-b-lg bg-white  p-4 py-2 text-black shadow-md lg:left-[50%] lg:-translate-x-[50%] ">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <TextInput
                withAsterisk
                required
                placeholder="Title*"
                {...form.getInputProps("title")}
                name="title"
                className="flex items-center justify-center gap-3 "
                classNames={{
                  input: "text-sm w-[15rem] placeholder:text-red-400",
                }}
              />
              <TextInput
                placeholder="Labels ( comma separated )"
                {...form.getInputProps("labels")}
                name="labels"
                className="flex items-center justify-center gap-3"
                classNames={{
                  input: "text-sm w-[15rem]",
                }}
              />
              <button
                className="flex items-center justify-center gap-3 whitespace-nowrap text-lg"
                type="button"
                onClick={close}
              >
                <span className="text-xs font-normal md:hidden">
                  Save & Exit
                </span>
                <HiLogout />
              </button>
            </div>
          </div>
          {/* <div className="relative h-full w-full overflow-hidden"> */}
          <Tldraw
            id="embedded"
            darkMode={false}
            showMultiplayerMenu={false}
            showMenu={false}
            showPages={false}
            onMount={(app) => {
              // if (isEditing && editData) {
              //   app.insertContent(JSON.parse(editData.note));
              // }
              app.setMenuOpen(true);
              app.setSetting("dockPosition", "left");
            }}
            onChange={async (app: TldrawApp, reason) => {
              console.log(app, reason);

              if (reason === "settings:isDarkMode") app.toggleDarkMode();
              // const to_ignore = ["set_status:idle", "session:complete:Fi"];
              // if (reason && to_ignore.includes(reason)) {
              //   console.log(app, reason);
              //   const json = app.getContent();
              //   // console.log({ jsonData: json?.shapes });
              //   app.resetDocument();
              //   console.log({ data: JSON.stringify(json) });
              //   // wait for 2 seconds
              //   await new Promise((resolve) => setTimeout(resolve, 2000));

              //   if (json) {
              //     app.insertContent(json);
              //   }
              // }
              // return;
            }}
          />
          {/* </div> */}
          {/* <hr className="my-4" /> */}
          {/* <div className=" flex h-full w-full flex-1 items-center justify-center  bg-red-400"> */}
          {/* a */}

          {/* <form
            onSubmit={form.onSubmit(async (values) => {
              let resp;

              try {
                if (editData)
                  if (!isEditing) {
                    resp = await createNote({
                      title: values.title,
                      note: values.note,
                      labels: values.labels || "",
                      shade,
                      userId: "cle4rx1j40000rpisr8i0tw2j",
                    });
                  } else {
                    resp = await editNote({
                      id: editData.id,
                      title: values.title,
                      note: values.note,
                      labels: values.labels || "",
                      shade,
                      userId: "cle4rx1j40000rpisr8i0tw2j",
                    });
                  }
                if (resp && resp.createdAt) {
                  refetch();
                  let notifcationData = isEditing
                    ? {
                        title: "Task Edited Successfully",
                        message: "Your task has been modified successfully",
                        autoClose: true,
                        color: "green",
                      }
                    : {
                        title: "Task Created Successfully",
                        message: "Your task has been created successfully",
                        autoClose: true,
                      };
                  notifications.show(notifcationData);
                  form.reset();

                  close();
                }
                console.log({ values, shade });
              } catch (e) {
                console.log(e);
                notifications.show({
                  title: "Error",
                  message: "An error occurred while creating your note",
                  autoClose: true,
                });
              }
            })}
            className="flex w-full flex-col gap-2 p-0"
          >
      
          </form> */}
          {/* </div> */}
        </div>
      )}
    </Transition>
  );
};

export default CreateDrawingModal;
