export interface Task {
  title: string;
  description: string | null;
  startTime: Date;
  endTime: Date;
  status: TaskStatus;
  shade: TaskColor;
  labels: string;
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
