import { RootNativeStackScreenProps, Task, TaskColor } from "$types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import {
  ColorCircle,
  Label,
  PrimaryButton,
  Text,
  TextInput,
} from "$components";

import { Colors } from "$themes";
import { api } from "$trpc";
import { useFocusEffect } from "@react-navigation/native";
import { TASK_COLORS } from "variables/colors";
import { formatDateTime } from "../utils/dateTime";

export const AddTaskScreen = ({
  navigation,
  route,
}: RootNativeStackScreenProps<"AddTask">) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskLabels, setTaskLabels] = useState("");
  const [date, setDate] = useState(new Date());
  const [taskColor, setTaskColor] = useState<TaskColor>("BANANA");

  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const [isVisible, setVisible] = useState(false);

  const [taskMode, setTaskMode] = useState<"add" | "edit">("add");
  const [taskId, setTaskId] = useState<string>(Math.random().toString());
  const client = api.useContext();

  const addTask = api.task.addTask.useMutation({
    onSuccess: () => {
      client.task.getTasks.invalidate();
      showToastAndNavigate();
    },
  });

  const editTask = api.task.editTask.useMutation({
    onSuccess: () => {
      client.task.getTasks.invalidate();
      showToastAndNavigate();
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.mode === "add" ? "New Task" : "Edit Task",
    });
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      const mode = route.params.mode;
      if (mode === "edit") {
        setTaskMode("edit");
        const stringifiedTask = route.params.task;
        if (stringifiedTask) {
          const task = JSON.parse(stringifiedTask) as Task;
          if (task) {
            setTaskId(task.id);
            setTaskTitle(task.title);
            setTaskLabels(task.labels);
            setDate(new Date(task.startTime));
            setTaskColor(task.shade);
          }
        }
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (taskTitle !== "" && date) {
      setIsAddDisabled(false);
    }
  }, [taskTitle, setIsAddDisabled]);

  const createTask = () => {
    const labels = taskLabels.replace(/ /g, "");
    const newTask = {
      title: taskTitle,
      startTime: date,
      // add 1 hour to end time
      endTime: new Date(date.getTime() + 60 * 60 * 1000),
      shade: taskColor,
      labels,
      status: "TODO",
      description: null,
      userId: "1",
    };

    return newTask;
  };

  const showToastAndNavigate = () => {
    Toast.show({
      type: "success",
      text1: `Task ${taskMode === "add" ? "Added" : "Edited"}!🎉`,
      text2: "Keep the flow going.",
      position: "bottom",
    });
    navigation.navigate("Home", {
      screen: "TaskManager",
    });
  };

  const addTaskHandler = () => {
    const newTask = createTask();
    addTask.mutate({ ...newTask });
  };

  const editTaskHandler = () => {
    const editedTask = createTask();
    editTask.mutate({ ...editedTask, id: taskId });
  };

  return (
    <View className="my-6 flex-1 justify-between">
      <View>
        <Label title="Title" />
        <TextInput
          maxLength={50}
          autoFocus={true}
          onChangeText={(text) => setTaskTitle(text)}
          value={taskTitle}
          autoCorrect={false}
        />

        <Label title="Deadline" />
        <Pressable
          onPress={() => setVisible(true)}
          style={{ borderBottomColor: Colors.lightGray, borderBottomWidth: 1 }}
        >
          <Text className="my-1 pb-5 text-xl" variant="bold">
            {formatDateTime(date)}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isVisible}
          mode="datetime"
          onHide={() => setVisible(false)}
          onConfirm={(date) => {
            setVisible(false);
            setDate(date);
          }}
          onCancel={() => setVisible(false)}
          date={date}
        />
        <Label title="Labels" />
        <TextInput
          placeholder="Everyday, University"
          onChangeText={(text) => setTaskLabels(text)}
          value={taskLabels}
        />
        <Label title="Color Task" />
        <ScrollView
          horizontal
          className="border-b-lightGray my-1 border-b pb-5"
        >
          {Object.entries(TASK_COLORS).map(([color, { backgroundColor }]) => (
            <ColorCircle
              key={color}
              backgroundColor={backgroundColor}
              selected={color === taskColor}
              onPress={() => setTaskColor(color as TaskColor)}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <PrimaryButton
          title={taskMode === "add" ? "Add Task" : "Update Task"}
          classes={`w-full self-center mb-6 ${
            isAddDisabled ? "opacity-50" : ""
          }`}
          disabled={isAddDisabled}
          onPress={taskMode === "add" ? addTaskHandler : editTaskHandler}
        />
      </View>
    </View>
  );
};
