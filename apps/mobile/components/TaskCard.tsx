import { Calendar, Clock, Edit, MarkAsDone, sharedStyles } from "$themes";
import { Task } from "$types";
import { Pressable, Text, View } from "react-native";
import { TASK_COLORS } from "variables/colors";
import { formatDate, formatTime } from "../utils/dateTime";
import { Card } from "./Card";
import { Pill } from "./Pill";

type TaskCardProps = {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
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
    <Card backgroundColor={TASK_COLORS[shade].backgroundColor} classes="my-3">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row">
          {labels &&
            labels.map((label) => (
              <Pill
                title={label}
                borderColor={TASK_COLORS[shade].borderColor}
                key={label}
              />
            ))}
        </View>
        <Pressable onPress={() => onEditTask(id)}>
          <Edit />
        </Pressable>
      </View>
      <View className="flex-row items-end justify-between">
        <View>
          <Text style={sharedStyles.h1}>{title}</Text>
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
