import { api } from "$api";
import { Task } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { PrimaryButton } from "./PrimaryButton";
import { TaskCard } from "./TaskCard";
import { Text } from "./Text";

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = (props: TaskListProps) => {
  const { tasks } = props;
  const navigation = useNavigation();
  const client = api.useContext();

  const deleteTask = api.task.deleteTask.useMutation({
    onSuccess: () => {
      client.task.getTasks.invalidate();
      Toast.show({
        type: "error",
        text1: "Trashed 🗑",
        text2: "Task deleted!",
        position: "bottom",
      });
    },
  });

  const editTask = api.task.editTask.useMutation();

  function editTaskHandler(task: Task) {
    navigation.navigate("AddTask", {
      mode: "edit",
      task: JSON.stringify(task),
      taskId: task.id,
    });
  }

  function deleteTaskHandler(taskId: string) {
    deleteTask.mutate(taskId);
  }

  async function changeTaskStatusHandler(task: Task, status: "TODO" | "DONE") {
    const data = await editTask.mutateAsync({
      ...task,
      status,
    });
    if (data) {
      client.task.getTasks.invalidate();
      let toastParams: ToastShowParams = {
        type: "success",
        text1: "Yoohoo!🥳",
        text2: "Task completed!",
        position: "bottom",
      };
      if (status === "TODO") {
        toastParams = {
          type: "error",
          text1: "Moving 🚚",
          text2: "Task moved back to todo!",
          position: "bottom",
        };
      }
      Toast.show(toastParams);
    }
  }

  return (
    <>
      {tasks.length === 0 ? (
        <View className="mt-4 h-[490px]">
          <View className="flex-1 items-center justify-center">
            <Text>No Task...Add one?</Text>
          </View>
        </View>
      ) : (
        <ScrollView className="my-2 h-[482px]">
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              onDeleteTask={deleteTaskHandler}
              onEditTask={editTaskHandler}
              onChangeTaskStatus={changeTaskStatusHandler}
            />
          ))}
        </ScrollView>
      )}
      <PrimaryButton
        title="Add Task"
        classes="self-center my-2"
        icon={<PlusIcon color="white" />}
        onPress={() => navigation.navigate("AddTask", { mode: "add" })}
      />
    </>
  );
};
