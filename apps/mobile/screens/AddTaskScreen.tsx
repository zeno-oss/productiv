import { RootNativeStackScreenProps, TaskColor } from "$types";
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

import { api } from "$api";
import { userAtom } from "$store";
import { formatDateTime } from "$utils";
import { PALETTE, TASKS_PALETTE } from "$variables";
import { Task } from "@prisma/client";
import { useFocusEffect } from "@react-navigation/native";
import { useAtomValue } from "jotai";

export const AddTaskScreen = ({
  navigation,
  route,
}: RootNativeStackScreenProps<"AddTask">) => {
  const user = useAtomValue(userAtom);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLabels, setTaskLabels] = useState("");
  const [taskStartTime, setTaskStartTime] = useState(new Date());

  const [taskEndTime, setTaskEndTime] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000),
  );
  const [isEndTimeSetByUser, setIsEndTimeSetByUser] = useState(false);

  const [taskColor, setTaskColor] = useState<TaskColor>("BANANA");

  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const [isTaskStartVisible, setIsTaskStartVisible] = useState(false);
  const [isTaskEndVisible, setIsTaskEndVisible] = useState(false);

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
            setTaskStartTime(new Date(task.startTime));
            setTaskEndTime(new Date(task.endTime));
            setTaskColor(task.shade);
          }
        }
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (taskTitle !== "") {
      setIsAddDisabled(false);
    }
  }, [taskTitle, setIsAddDisabled]);

  const createTask = () => {
    const labels = taskLabels.replace(/ /g, "");
    const newTask = {
      title: taskTitle,
      startTime: taskStartTime,
      endTime: taskEndTime,
      shade: taskColor,
      labels,
      status: "TODO",
      description: null,
      userId: user?.id ?? "",
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
    <View className="my-6 flex-1 justify-between p-4">
      <View>
        <Label title="Title" />
        <TextInput
          maxLength={50}
          autoFocus={true}
          onChangeText={(text) => setTaskTitle(text)}
          value={taskTitle}
          autoCorrect={false}
        />
        <Label title="Description" />
        <TextInput
          maxLength={500}
          onChangeText={(text) => setTaskDescription(text)}
          value={taskDescription}
          multiline={true}
          autoCorrect={false}
          placeholder="Describe your task here"
        />

        <Label title="Starts At" />
        <Pressable
          onPress={() => setIsTaskStartVisible(true)}
          style={{ borderBottomColor: PALETTE.lightGray, borderBottomWidth: 1 }}
        >
          <Text className="my-1 pb-5 text-xl" variant="bold">
            {formatDateTime(taskStartTime)}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isTaskStartVisible}
          mode="datetime"
          onHide={() => setIsTaskStartVisible(false)}
          onConfirm={(date) => {
            setIsTaskStartVisible(false);
            setTaskStartTime(date);
            if (!isEndTimeSetByUser) {
              setTaskEndTime(new Date(date.getTime() + 60 * 60 * 1000));
            }
          }}
          onCancel={() => setIsTaskStartVisible(false)}
          date={taskStartTime}
        />
        <Label title="Ends At" />
        <Pressable
          onPress={() => setIsTaskEndVisible(true)}
          style={{ borderBottomColor: PALETTE.lightGray, borderBottomWidth: 1 }}
        >
          <Text className="my-1 pb-5 text-xl" variant="bold">
            {formatDateTime(taskEndTime)}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isTaskEndVisible}
          mode="datetime"
          onHide={() => setIsTaskEndVisible(false)}
          onConfirm={(date) => {
            setIsTaskEndVisible(false);
            setIsEndTimeSetByUser(true);
            setTaskEndTime(date);
          }}
          onCancel={() => setIsTaskEndVisible(false)}
          date={taskEndTime}
        />
        <Label title="Labels" />
        <TextInput
          placeholder="Everyday, University"
          onChangeText={(text) => setTaskLabels(text)}
          value={taskLabels}
        />
        <Label title="Shade" />
        <ScrollView
          horizontal
          className="border-b-lightGray my-1 border-b pb-5"
        >
          {Object.entries(TASKS_PALETTE).map(([color, { backgroundColor }]) => (
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
