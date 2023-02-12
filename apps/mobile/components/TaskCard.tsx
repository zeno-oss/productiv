import {
  Calendar,
  Clock,
  Edit,
  MarkAsDone,
  TaskColors,
  hp,
  sharedStyles,
} from "$themes";
import { Task } from "$types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatDate, formatTime } from "../utils/dateTime";
import { Card } from "./Card";
import { Pill } from "./Pill";

interface IProps {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
}

export const TaskCard: React.FC<IProps> = ({
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
    <Card backgroundColor={TaskColors[0].backgroundColor} style={styles.card}>
      <View style={styles.taskCardHeader}>
        <View style={styles.pillsContainer}>
          {labels &&
            labels.map((label) => (
              <Pill
                title={label}
                borderColor={TaskColors[0].borderColor}
                key={label}
              />
            ))}
        </View>
        <Pressable onPress={() => onEditTask(id)}>
          <Edit />
        </Pressable>
      </View>
      <View style={styles.taskCardFooter}>
        <View>
          <Text style={sharedStyles.h1}>{title}</Text>
          <View style={styles.dateTimesContainer}>
            <View style={styles.dateTimeContainer}>
              <Calendar />
              <Text style={styles.dateTime}>{formatDate(startTime)}</Text>
            </View>
            <View style={styles.dateTimeContainer}>
              <Clock />
              <Text style={styles.dateTime}>{formatTime(endTime)}</Text>
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

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  pillsContainer: {
    flexDirection: "row",
  },
  dateTimesContainer: {
    marginTop: hp(18),
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTime: {
    marginLeft: 10,
  },
  taskCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(10),
    justifyContent: "space-between",
  },
  taskCardFooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
