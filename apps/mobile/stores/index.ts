import type { Task } from "$types";
import { atom } from "jotai";

const MOCK_DATA: Task[] = [
  {
    id: "1",
    title: "Finish this project",
    description: "Finish this project by 11:59 PM",
    startTime: new Date(),
    endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    status: "TODO",
    shade: "BANANA",
    labels: ["School", "Everyday"],
    userId: "1",
  },
  {
    id: "2",
    title: "Some more stuff",
    description: "Lessgoo",
    startTime: new Date(),
    endTime: new Date(new Date().setHours(new Date().getHours() + 4)),
    status: "TODO",
    shade: "PICTON_BLUE",
    labels: ["School"],
    userId: "1",
  },
];

// Create your atoms and derivatives
export const tasksAtom = atom<Task[]>(MOCK_DATA);
