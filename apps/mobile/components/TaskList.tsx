import { api } from "$api";
import { Task } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { PrimaryButton } from "./PrimaryButton";
import { TaskCard } from "./TaskCard";
import { Text } from "./Text";
import { TextInput } from "./TextInput";

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = (props: TaskListProps) => {
  const { tasks } = props;
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
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

  function searchTaskHandler(text: string) {
    setSearchText(text);
    const filtered = tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(text.toLowerCase()) ||
        task.description?.toLowerCase().includes(text.toLowerCase()) ||
        task.labels.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredTasks(filtered);
  }

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
        <View className="mt-4 h-[77%]">
          <View className="flex-1 items-center justify-center">
            <Text>No Task...Add one?</Text>
          </View>
        </View>
      ) : (
        <View className="my-2 h-[77%]">
          <TextInput
            placeholder="Search Your Tasks 🔍 "
            onChangeText={searchTaskHandler}
            value={searchText}
            classes="border rounded-full border-lightSilver px-4 text-center pb-2"
          />
          <ScrollView className="">
            {filteredTasks.map((task) => (
              <TaskCard
                task={task}
                key={task.id}
                onDeleteTask={deleteTaskHandler}
                onEditTask={editTaskHandler}
                onChangeTaskStatus={changeTaskStatusHandler}
              />
            ))}
          </ScrollView>
        </View>
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
