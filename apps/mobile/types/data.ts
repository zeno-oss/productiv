export interface Task {
  startTime: Date;
  endTime: Date;
  title: string;
  description: string;
  status: TaskStatus;
  shade: TaskColor;
  labels: string[];
  userId: string;
  id: string;
}

export type TaskColor =
  | "BANANA"
  | "TURQUOISE"
  | "PICTON_BLUE"
  | "VODKA"
  | "RADICAL_RED"
  | "CORAL"
  | "DODGER_BLUE"
  | "PLUM_PURPLE";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
