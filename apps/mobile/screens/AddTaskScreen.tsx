import { RootNativeStackScreenProps } from "$types";
import { useAtom } from "jotai";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import {
  ColorCircle,
  Label,
  PrimaryButton,
  Text,
  TextInput,
} from "$components";

import { Colors, hp, sharedStyles, TaskColors } from "$themes";
import { tasksAtom } from "../stores";
import { formatDateTime } from "../utils/dateTime";

export const AddTaskScreen = ({
  navigation,
  route,
}: RootNativeStackScreenProps<"AddTask">) => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskLabels, setTaskLabels] = useState("");
  const [date, setDate] = useState(new Date());
  const [taskColor, setTaskColor] = useState(TaskColors[0]);

  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const [isVisible, setVisible] = useState(false);

  const [taskMode, setTaskMode] = useState<"add" | "edit">("add");
  const [taskId, setTaskId] = useState<string>(Math.random().toString());
  // const { mutate: mutateAdd } = api.addTask.useMutation({
  //   onSuccess: ({ tasks }) => {
  //     setTasks(
  //       tasks.map((task) => {
  //         return { ...task, dateTime: new Date(task.dateTime) };
  //       }),
  //     );
  //     showToastAndNavigate();
  //   },
  // });
  // const { mutate: mutateEdit } = api.editTask.useMutation({
  //   onSuccess: ({ tasks }) => {
  //     setTasks(
  //       tasks.map((task) => {
  //         return { ...task, dateTime: new Date(task.dateTime) };
  //       }),
  //     );
  //     showToastAndNavigate();
  //   },
  // });

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: route.params.mode === "add" ? "New Task" : "Edit Task",
  //   });
  // }, [route.params]);

  // useFocusEffect(
  //   useCallback(() => {
  //     const mode = route.params.mode;
  //     if (mode === "edit") {
  //       setTaskMode("edit");
  //       const taskId = route.params.taskId;
  //       if (taskId) {
  //         setTaskId(taskId);
  //         const task = tasks.find((task) => task.taskId === taskId);
  //         if (task) {
  //           setTaskTitle(task.title);
  //           setTaskLabels(task.labels?.join(", ") || "");
  //           setDate(task.dateTime);
  //           setTaskColor({
  //             backgroundColor: task.backgroundColor,
  //             borderColor: task.borderColor,
  //           });
  //         }
  //       }
  //     }
  //   }, [route.params]),
  // );

  // useEffect(() => {
  //   if (taskTitle !== "" && date) {
  //     setIsAddDisabled(false);
  //   }
  // }, [taskTitle, setIsAddDisabled]);

  const taskTitleInputHander = (text: string) => {
    setTaskTitle(text);
  };

  const taskLabelsInputHander = (text: string) => {
    setTaskLabels(text);
  };

  const taskColorCircleHandler = (color: (typeof TaskColors)[0]) => {
    setTaskColor(color);
  };

  // const createTask = () => {
  //   const labels = taskLabels.split(",").map((label) => label.trim());
  //   const newTask: Task = {
  //     title: taskTitle,
  //     dateTime: date,
  //     taskId,
  //     backgroundColor: taskColor.backgroundColor,
  //     borderColor: taskColor.borderColor,
  //     labels,
  //   };

  //   return newTask;
  // };

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

  // const addTaskHandler = () => {
  //   const newTask = createTask();
  //   mutateAdd({ task: newTask });
  //   // if (isSuccess) {

  //   // }
  // };

  // const editTaskHandler = () => {
  //   const editedTask = createTask();
  //   mutateEdit(editedTask);
  // };

  return (
    <View style={styles.screen}>
      <View>
        <Label text={"Title"} />
        <TextInput
          maxLength={50}
          autoFocus={true}
          onChangeText={taskTitleInputHander}
          value={taskTitle}
          autoCorrect={false}
        />

        <Label text="Deadline" />
        <Pressable
          onPress={() => setVisible(true)}
          style={{ borderBottomColor: Colors.lightGray, borderBottomWidth: 1 }}
        >
          <Text style={sharedStyles.textInput}>{formatDateTime(date)}</Text>
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
        <Label text="Labels" />
        <TextInput
          placeholder="Everyday, University"
          onChangeText={taskLabelsInputHander}
          value={taskLabels}
        />
        <Label text="Color Task" />
        <ScrollView horizontal style={styles.colorShadeContainer}>
          {TaskColors.map((color) => (
            <ColorCircle
              key={color.backgroundColor}
              backgroundColor={color.backgroundColor}
              selected={color.backgroundColor === taskColor.backgroundColor}
              onPress={() => taskColorCircleHandler(color)}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <PrimaryButton
          title={taskMode === "add" ? "Add Task" : "Update Task"}
          style={[styles.addTaskButton, isAddDisabled && { opacity: 0.7 }]}
          disabled={isAddDisabled}
          // onPress={taskMode === "add" ? addTaskHandler : editTaskHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginVertical: hp(24),
    justifyContent: "space-between",
    flex: 1,
  },

  addTaskButton: {
    width: "100%",
    alignSelf: "center",
    marginBottom: hp(24),
  },
  colorShadeContainer: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: hp(20),
    marginVertical: 4,
  },
});
