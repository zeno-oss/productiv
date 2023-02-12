import { PrimaryButton, TaskCard, Text } from "$components";
import { AddTask } from "$themes";
import { HomeDrawerScreenProps } from "$types";
import { useAtom } from "jotai";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { tasksAtom } from "../stores";

export const TaskManagerScreen = ({
  navigation,
}: HomeDrawerScreenProps<"TaskManager">) => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isTaskUpdated, setIsTaskUpdated] = useState(false);

  // const fetchedTasks = api.getTasks.useQuery();
  // const client = api.useContext();
  // const { mutate } = trpc.deleteTask.useMutation({
  //   onSuccess: ({ tasks }) => {
  //     setTasks(
  //       tasks.map((task) => {
  //         return { ...task, dateTime: new Date(task.dateTime) };
  //       }),
  //     );
  //     Toast.show({
  //       type: "success",
  //       text1: "Yoohoo!🥳",
  //       text2: "Task completed!",
  //       position: "bottom",
  //     });
  //   },
  // });

  // useEffect(() => {
  //   if (fetchedTasks.data){
  //     setTasks(
  //       fetchedTasks.data.tasks.map((task) => {
  //         return { ...task, dateTime: new Date(task.dateTime) };
  //       }),
  //     );
  //   }
  // }, [fetchedTasks])

  // useEffect(() => {
  //   if (fetchedTasks.isStale)
  // })

  // const refreshTaskHandler = async () => {
  //   await fetchedTasks.refetch();
  //   if (fetchedTasks.data) {
  //     setTasks(
  //       fetchedTasks.data.tasks.map((task) => {
  //         return { ...task, dateTime: new Date(task.dateTime) };
  //       }),
  //     );
  //   }
  //   // client.invalidateQ();
  // };

  // useEffect(() => {
  //   if (!fetchedTasks.isLoading && fetchedTasks.data && !isTaskUpdated) {
  //     setTasks(
  //       fetchedTasks.data.tasks.map((task) => {
  //         return { ...task, dateTime: new Date(task.dateTime) };
  //       }),
  //     );
  //     setIsTaskUpdated(true);
  //   }
  // }, [isTaskUpdated, setTasks, fetchedTasks]);

  // if (!fetchedTasks.data || fetchedTasks.isRefetching)
  //   return (
  //     <View className = "flex-1 items-center justify-center">
  //       <Text>Loading...</Text>
  //     </View>
  //   );

  // const deleteTaskHandler = (taskId: string) => {
  //   mutate(taskId);
  // };

  // const editTaskHandler = (taskId: string) => {
  //   navigation.navigate("AddTask", {
  //     mode: "edit",
  //     taskId,
  //   });
  // };

  return (
    <View className="my-3">
      <Text className="my-0.5 text-sm" variant="semibold">
        Hello Mubin!
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
          // onPress={refreshTaskHandler}
        />
      </View>

      {tasks.length === 0 ? (
        <View className="mt-4 h-[490px]">
          <View className="flex-1 items-center justify-center">
            <Text>No tasks...Add one?</Text>
          </View>
        </View>
      ) : (
        <ScrollView className="mt-4 h-[490px]">
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task.title}
              onDeleteTask={() => {}}
              onEditTask={() => {}}
              // onDeleteTask={deleteTaskHandler}
              // onEditTask={editTaskHandler}
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
