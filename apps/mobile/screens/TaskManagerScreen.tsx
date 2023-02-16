import { api } from "$api";
import { PrimaryButton, TaskCard, Text } from "$components";
import { userAtom } from "$store";
import { AddTask } from "$themes";
import { HomeDrawerScreenProps } from "$types";
import { Task } from "@prisma/client";
import { useAtomValue } from "jotai";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

export const TaskManagerScreen = ({
  navigation,
}: HomeDrawerScreenProps<"TaskManager">) => {
  const client = api.useContext();
  const user = useAtomValue(userAtom);

  const tasks = api.task.getTasks.useQuery();
  const deleteTask = api.task.deleteTask.useMutation({
    onSuccess: () => {
      client.task.getTasks.invalidate();
      Toast.show({
        type: "success",
        text1: "Yoohoo!🥳",
        text2: "Task completed!",
        position: "bottom",
      });
    },
  });

  if (!tasks.data || !user)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );

  const refreshTaskHandler = () => {
    tasks.refetch();
  };

  const deleteTaskHandler = (taskId: string) => {
    deleteTask.mutate(taskId);
  };

  const editTaskHandler = (task: Task) => {
    navigation.navigate("AddTask", {
      mode: "edit",
      task: JSON.stringify(task),
      taskId: task.id,
    });
  };

  return (
    <View className="my-3">
      <Text className="my-0.5 text-sm" variant="semibold">
        Hello {user.name}!
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="my-1 text-xl" variant="bold">
          Here's The Update.
        </Text>
        <PrimaryButton
          title="Refresh"
          classes="bg-white"
          textClasses="text-black text-sm"
          textVariant="regular"
          onPress={refreshTaskHandler}
        />
      </View>

      {tasks.data.length === 0 ? (
        <View className="mt-4 h-[490px]">
          <View className="flex-1 items-center justify-center">
            <Text>No tasks...Add one?</Text>
          </View>
        </View>
      ) : (
        <ScrollView className="mt-4 h-[490px]">
          {tasks.data.map((task) => (
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
        classes="self-center mt-3"
        icon={<AddTask />}
        onPress={() => navigation.navigate("AddTask", { mode: "add" })}
      />
      <View className="mt-3 flex-row items-center justify-between">
        <PrimaryButton
          title="Today"
          textClasses="text-base"
          textVariant="regular"
        />
        <PrimaryButton
          title="Upcoming"
          classes="bg-white"
          textClasses="text-base text-black"
          textVariant="regular"
        />
        <PrimaryButton
          title="Done"
          classes="bg-white"
          textClasses="text-base text-black"
          textVariant="regular"
        />
      </View>
    </View>
  );
};
