import { Calendar, Clock, Edit, MarkAsDone } from "$themes";
import { Task } from "$types";
import { formatDate, formatTime } from "$utils";
import { TASKS_PALETTE } from "$variables";
import { Pressable, View } from "react-native";
import { Card } from "./Card";
import { Pill } from "./Pill";
import { Text } from "./Text";

type TaskCardProps = {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEditTask,
  onDeleteTask,
}) => {
  const {
    shade,
    labels,
    endTime,
    title,
    startTime,
    id,
    description,
    status,
    userId,
  } = task;

  return (
    <Card backgroundColor={TASKS_PALETTE[shade].backgroundColor} classes="my-3">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row">
          {labels &&
            labels
              .split(",")
              .map((label) => (
                <Pill
                  title={label}
                  borderColor={TASKS_PALETTE[shade].borderColor}
                  key={label}
                />
              ))}
        </View>
        <Pressable onPress={() => onEditTask(task)}>
          <Edit />
        </Pressable>
      </View>
      <View className="flex-row items-end justify-between">
        <View>
          <Text className="my-1 text-xl" variant="bold">
            {title}
          </Text>
          <View className="mt-4">
            <View className="flex-row items-center">
              <Calendar />
              <Text className="ml-3">{formatDate(startTime)}</Text>
            </View>
            <View className="flex-row items-center">
              <Clock />
              <Text className="ml-3">{formatTime(endTime)}</Text>
            </View>
          </View>
        </View>
        <Pressable onPress={() => onDeleteTask(id)}>
          <MarkAsDone />
        </Pressable>
      </View>
    </Card>
  );
};
