import { Modal, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { formatDateTime } from "utils";
import { api } from "../utils/api";

const Appointment: NextPage = (props) => {
  console.log(props);
  //   const hello = api.task.hello.useQuery({ text: "from tRPC" });
  const router = useRouter();
  const { id } = router.query;

  const userDetails = api.auth.getUserFromId.useQuery(id as string);
  const { data: freeSlots, refetch } = api.task.getFreeTimeSlots.useQuery({
    userId: id as string,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({
    startTime: new Date(),
    endTime: new Date(),
    minTime: new Date(),
    maxTime: new Date(),
    name: "Anonymous",
  });
  const { mutateAsync: createTask } = api.task.addTask.useMutation();
  return (
    <>
      <Head>
        <title>Productiv</title>
        <meta name="description" content="Productiv appointment scheduling" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 p-4 ">
          Available time slots of {userDetails?.data?.name || id} for today
        </div>
        <div>
          {freeSlots?.map((slot, index) => (
            <div
              className="m-2 flex cursor-pointer gap-2 rounded-lg bg-yellow-200 p-2"
              onClick={() => {
                console.log(slot);
                open();
                setSelectedTimeSlot({
                  ...slot,
                  minTime: slot.startTime,
                  maxTime: slot.endTime,
                  name: "",
                });
              }}
            >
              <div className="font-bold italic"> {index + 1}.</div>
              <div className="flex gap-2">
                <div className="font-semibold">Start:</div>
                <div>{formatDateTime(slot.startTime)}</div>
              </div>
              <div className="flex gap-2">
                <div className="font-semibold">End:</div>
                <div>{formatDateTime(slot.endTime)}</div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          opened={opened}
          onClose={close}
          title="Customize the time"
          size="xl"
          centered
        >
          <div className="flex flex-col items-center justify-center">
            <TextInput
              placeholder="Your name"
              label="Full name"
              withAsterisk
              onChange={(value) =>
                setSelectedTimeSlot({
                  ...selectedTimeSlot,
                  name: value.target.value,
                })
              }
              className="w-full max-w-[400px]"
            />
            <DateTimePicker
              dropdownType="modal"
              minDate={selectedTimeSlot.minTime}
              maxDate={selectedTimeSlot.maxTime}
              value={selectedTimeSlot.startTime}
              label="Pick Start Time"
              placeholder="Pick Start Time"
              maw={400}
              mx="auto"
              className="w-full flex-1"
              onChange={(value) =>
                setSelectedTimeSlot({
                  ...selectedTimeSlot,
                  startTime: value as Date,
                })
              }
            />
            <DateTimePicker
              minDate={selectedTimeSlot.minTime}
              maxDate={selectedTimeSlot.maxTime}
              value={selectedTimeSlot.endTime}
              dropdownType="modal"
              label="Pick End Time"
              placeholder="Pick End Time"
              maw={400}
              mx="auto"
              className="w-full flex-1"
              onChange={(value) =>
                setSelectedTimeSlot({
                  ...selectedTimeSlot,
                  endTime: value as Date,
                })
              }
            />
            <button
              className="mt-4 w-full max-w-[400px] rounded-md border border-black px-4 py-2  hover:shadow-md"
              onClick={() => {
                createTask({
                  title: "Appointment with " + selectedTimeSlot.name,
                  description: "Appointment with " + selectedTimeSlot.name,
                  labels: "",
                  startTime: selectedTimeSlot.startTime,
                  endTime: selectedTimeSlot.endTime,
                  shade: "PLUM_PURPLE",
                  status: "TODO",
                  userId: "cle4rx1j40000rpisr8i0tw2j",
                })
                  .then(async () => {
                    await refetch();
                    close();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Done
            </button>
          </div>
        </Modal>
      </main>
    </>
  );
};

export default Appointment;
