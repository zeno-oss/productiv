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

export type OnboardingSlideData = {
  readonly title: string;
  readonly subtitle: string;
  readonly Icon: React.ReactNode;
};

export type User = {
  email: string;
  name: string;
  locale: string;
  profileImage: string;
  id: string;
  tasks: Task[];
};

export type OAuthUserData = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};
