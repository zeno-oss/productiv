import { RootNativeStackScreenProps, TaskColor } from "$types";
import { FontAwesome5 } from "@expo/vector-icons";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TAILWIND_COLORS from "tailwindcss/colors";

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
import { TASKS_PALETTE } from "$variables";
import { Task } from "@prisma/client";
import { useFocusEffect } from "@react-navigation/native";
import { useAtomValue } from "jotai";

export const AddTaskScreen = ({
  navigation,
  route,
}: RootNativeStackScreenProps<"AddTask">) => {
  const user = useAtomValue(userAtom);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState("");

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000),
  );
  const [isEndTimeSetByUser, setIsEndTimeSetByUser] = useState(false);

  const [shade, setShade] = useState<TaskColor>("BANANA");

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showDateTimePicker, setShowDateTimePicker] = useState<
    "start" | "end" | null
  >(null);

  const [mode, setMode] = useState<"add" | "edit">("add");

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
        setMode("edit");
        const stringifiedTask = route.params.task;
        if (stringifiedTask) {
          const task = JSON.parse(stringifiedTask) as Task;
          if (task) {
            setTitle(task.title);
            setDescription(task.description ?? "");
            setLabels(task.labels);
            setStartTime(new Date(task.startTime));
            setEndTime(new Date(task.endTime));
            setShade(task.shade);
          }
        }
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (title !== "") {
      setIsSubmitDisabled(false);
    }
  }, [title, setIsSubmitDisabled]);

  function createTask() {
    const trimmedLabels = labels.replace(/ /g, "");

    const newTask = {
      title,
      startTime,
      endTime,
      shade,
      labels: trimmedLabels,
      status: "TODO",
      description: description || null,
      userId: user?.id ?? "",
    };

    return newTask;
  }

  function showToastAndNavigate() {
    Toast.show({
      type: "success",
      text1: `Task ${mode === "add" ? "Added" : "Edited"}!🎉`,
      text2: "Keep the flow going.",
      position: "bottom",
    });
    navigation.navigate("Home", {
      screen: "TaskManager",
    });
  }

  function addTaskHandler() {
    const newTask = createTask();
    addTask.mutate({ ...newTask });
  }

  function editTaskHandler() {
    if (route.params.taskId) {
      const editedTask = createTask();
      editTask.mutate({ ...editedTask, id: route.params.taskId });
    }
  }

  return (
    <View className="my-6 flex-1 justify-between p-4">
      <View>
        <Label title="Title" />
        <TextInput
          maxLength={50}
          autoFocus={true}
          onChangeText={setTitle}
          value={title}
          placeholder="Enter task title"
          autoCorrect={false}
        />
        <Label title="Description" />
        <TextInput
          maxLength={500}
          onChangeText={setDescription}
          value={description}
          multiline={true}
          autoCorrect={false}
          classes="text-base"
          placeholder="Describe your task"
        />
        <View className="flex-row justify-between pb-1">
          <View>
            <Label title="Starts at" />
            <Pressable onPress={() => setShowDateTimePicker("start")}>
              <View className="flex-row items-center rounded-lg border border-gray-300 p-2">
                <FontAwesome5
                  name="calendar-check"
                  size={16}
                  color={TAILWIND_COLORS.teal["700"]}
                  style={{ marginRight: 5 }}
                />
                <Text
                  className="my-1 rounded-lg text-teal-700"
                  variant="semibold"
                >
                  {formatDateTime(startTime)}
                </Text>
              </View>
            </Pressable>
            <DateTimePickerModal
              isVisible={showDateTimePicker === "start"}
              mode="datetime"
              onHide={() => setShowDateTimePicker(null)}
              onConfirm={(date) => {
                setShowDateTimePicker(null);
                setStartTime(date);
                if (!isEndTimeSetByUser) {
                  setEndTime(new Date(date.getTime() + 60 * 60 * 1000));
                }
              }}
              onCancel={() => setShowDateTimePicker(null)}
              date={startTime}
            />
          </View>
          <View>
            <Label title="Ends at" />
            <Pressable onPress={() => setShowDateTimePicker("end")}>
              <View className="flex-row items-center rounded-lg border border-gray-300 p-2">
                <FontAwesome5
                  name="calendar-times"
                  size={16}
                  color={TAILWIND_COLORS.red["700"]}
                  style={{ marginRight: 5 }}
                />
                <Text className="my-1 text-red-700" variant="semibold">
                  {formatDateTime(endTime)}
                </Text>
              </View>
            </Pressable>
            <DateTimePickerModal
              isVisible={showDateTimePicker === "end"}
              mode="datetime"
              onHide={() => setShowDateTimePicker(null)}
              onConfirm={(date) => {
                setShowDateTimePicker(null);
                setIsEndTimeSetByUser(true);
                setEndTime(date);
              }}
              onCancel={() => setShowDateTimePicker(null)}
              date={endTime}
            />
          </View>
        </View>

        <Label title="Labels" />
        <TextInput
          placeholder="everyday, university"
          onChangeText={setLabels}
          value={labels}
          autoCorrect={false}
          autoCapitalize="none"
          classes="text-base"
        />
        <Label title="Shade" />
        <ScrollView
          horizontal
          className="border-b-lightSilver my-1 border-b pb-5"
        >
          {Object.entries(TASKS_PALETTE).map(([color, { backgroundColor }]) => (
            <ColorCircle
              key={color}
              backgroundColor={backgroundColor}
              selected={color === shade}
              onPress={() => setShade(color as TaskColor)}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <PrimaryButton
          title={mode === "add" ? "Add Task" : "Update Task"}
          classes={`w-full self-center mb-6 ${
            isSubmitDisabled ? "opacity-50" : ""
          }`}
          disabled={isSubmitDisabled}
          onPress={mode === "add" ? addTaskHandler : editTaskHandler}
        />
      </View>
    </View>
  );
};
