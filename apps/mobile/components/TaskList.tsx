import { api } from "$api";
import { showSearchBarAtom } from "$store";
import { Task } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { PrimaryButton } from "./PrimaryButton";
import { SearchBar } from "./SearchBar";
import { TaskCard } from "./TaskCard";
import { Text } from "./Text";

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = (props: TaskListProps) => {
  const { tasks } = props;
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const client = api.useContext();
  const showSearchBar = useAtomValue(showSearchBarAtom);

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
        <View className="mt-4 h-[77%]">
          <View className="flex-1 items-center justify-center">
            <Text>No Task...Add one?</Text>
          </View>
        </View>
      ) : (
        <View className="my-2 h-[77%]">
          {showSearchBar && (
            <SearchBar
              searchPhrase={searchText}
              setSearchPhrase={setSearchText}
            />
          )}
          <FlatList
            data={tasks}
            renderItem={({ item }) => {
              const termToSearch = searchText.toLowerCase();
              if (
                termToSearch === "" ||
                item.title.toLowerCase().includes(termToSearch) ||
                item.description?.toLowerCase().includes(termToSearch) ||
                item.labels.toLowerCase().includes(termToSearch)
              ) {
                return (
                  <TaskCard
                    task={item}
                    onDeleteTask={deleteTaskHandler}
                    onEditTask={editTaskHandler}
                    onChangeTaskStatus={changeTaskStatusHandler}
                  />
                );
              }
              return null;
            }}
            keyExtractor={(item) => item.id}
          />
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
