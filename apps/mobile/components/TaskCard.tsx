import { MarkAsDone } from "$themes";
import { formatDate, formatTime } from "$utils";
import { TASKS_PALETTE } from "$variables";
import { Task } from "@prisma/client";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from "react-native-heroicons/outline";
import { PencilSquareIcon, TrashIcon } from "react-native-heroicons/solid";
import { Card } from "./Card";
import { Pill } from "./Pill";
import { Text } from "./Text";

type TaskCardProps = {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onChangeTaskStatus: (task: Task, status: "TODO" | "DONE") => void;
  onEditTask: (task: Task) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEditTask,
  onDeleteTask,
  onChangeTaskStatus,
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
            <TrashIcon color="#141414" height={20} width={20} />
          </Pressable>
          <Pressable onPress={() => onEditTask(task)}>
            <PencilSquareIcon color="#141414" height={20} width={20} />
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
              <CalendarIcon color="#141414" height={16} width={16} />
              <Text className="ml-3">{taskDate}</Text>
            </View>
            <View className="flex-row items-center">
              <ClockIcon color="#141414" height={16} width={16} />
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
          {task.status !== "DONE" ? (
            <Pressable onPress={() => onChangeTaskStatus(task, "DONE")}>
              <MarkAsDone />
            </Pressable>
          ) : (
            <Pressable onPress={() => onChangeTaskStatus(task, "TODO")}>
              <CheckCircleIcon color="#141414" />
            </Pressable>
          )}
        </View>
      </View>
    </Card>
  );
};
