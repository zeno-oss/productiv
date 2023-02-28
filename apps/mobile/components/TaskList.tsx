import { api } from "$api";
import { AddTask } from "$themes";
import { Task } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
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
      client.task.getTodaysTasks.invalidate();
      client.task.getAllTasks.invalidate();
      Toast.show({
        type: "success",
        text1: "Yoohoo!🥳",
        text2: "Task completed!",
        position: "bottom",
      });
    },
  });

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
            />
          ))}
        </ScrollView>
      )}
      <PrimaryButton
        title="Add Task"
        classes="self-center my-2"
        icon={<AddTask />}
        onPress={() => navigation.navigate("AddTask", { mode: "add" })}
      />
    </>
  );
};
