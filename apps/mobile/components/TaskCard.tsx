import { Calendar, Clock, Delete, Edit, MarkAsDone } from "$themes";
import { formatDate, formatTime } from "$utils";
import { TASKS_PALETTE } from "$variables";
import { Task } from "@prisma/client";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import { Card } from "./Card";
import { Pill } from "./Pill";
import { Text } from "./Text";

type TaskCardProps = {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
}) => {
  const { shade, labels, endTime, title, startTime, id, description } = task;

  const taskDate = useMemo(() => {
    const startDate = formatDate(startTime);
    const endDate = formatDate(endTime);
    if (startDate === endDate) {
      return startDate;
    }
    return `${startDate} ${"-"} ${endDate}`;
  }, [startTime, endTime]);

  const taskTime = useMemo(() => {
    return `${formatTime(startTime)} ${"-"} ${formatTime(endTime)}`;
  }, [startTime, endTime]);

  return (
    <Card backgroundColor={TASKS_PALETTE[shade].backgroundColor} classes="my-3">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-xl" variant="bold">
          {title}
        </Text>
        <View className="flex-row gap-x-2">
          <Pressable onPress={() => onDeleteTask(task.id)}>
            <Delete />
          </Pressable>
          <Pressable onPress={() => onEditTask(task)}>
            <Edit />
          </Pressable>
        </View>
      </View>
      <View>
        {description && (
          <Text className="mb-1 text-xs" variant="regular" numberOfLines={1}>
            {description}
          </Text>
        )}
        <View className="flex-row items-end justify-between">
          <View className="mt-4">
            <View className="flex-row items-center">
              <Calendar />
              <Text className="ml-3">{taskDate}</Text>
            </View>
            <View className="flex-row items-center">
              <Clock />
              <Text className="ml-3">{taskTime}</Text>
            </View>
            <View className="mt-2 flex-row">
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
          </View>
          {task.status !== "DONE" && (
            <Pressable onPress={() => onCompleteTask(id)}>
              <MarkAsDone />
            </Pressable>
          )}
        </View>
      </View>
    </Card>
  );
};
