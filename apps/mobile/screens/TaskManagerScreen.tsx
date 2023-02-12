import { PrimaryButton, TaskCard, Text } from "$components";
import { tasksAtom } from "$stores";
import { AddTask, Colors, FontSize, Fonts, hp, sharedStyles } from "$themes";
import { HomeDrawerScreenProps } from "$types";
import { useAtom } from "jotai";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
  //     <View style={sharedStyles.loadingContainer}>
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
    <View style={styles.screen}>
      <Text style={sharedStyles.h3}>Hello Mubin!</Text>
      <View style={styles.header}>
        <Text style={sharedStyles.h1}>Here's The Update.</Text>
        <PrimaryButton
          title="Refresh"
          style={{ backgroundColor: "white" }}
          textStyle={{
            color: "black",
            fontFamily: Fonts.REGULAR,
            fontSize: FontSize.small,
          }}
          // onPress={refreshTaskHandler}
        />
      </View>

      {tasks.length === 0 ? (
        <View style={styles.tasksContainer}>
          <View style={sharedStyles.loadingContainer}>
            <Text>No tasks...Add one?</Text>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.tasksContainer}>
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
        style={styles.addTaskButton}
        icon={<AddTask />}
        onPress={() => navigation.navigate("AddTask", { mode: "add" })}
      />
      <View style={styles.navigationContainer}>
        <PrimaryButton title="Today" textStyle={styles.navigationButtonText} />
        <PrimaryButton
          title="Upcoming"
          textStyle={[
            styles.navigationButtonText,
            styles.navigationNonActiveButtonText,
          ]}
          style={styles.navigationNonActiveButton}
        />
        <PrimaryButton
          title="Done"
          textStyle={[
            styles.navigationButtonText,
            styles.navigationNonActiveButtonText,
          ]}
          style={styles.navigationNonActiveButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginVertical: hp(12),
  },
  tasksContainer: {
    marginTop: hp(16),
    height: hp(490),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addTaskButton: {
    alignSelf: "center",
    marginTop: hp(12),
  },
  navigationContainer: {
    marginTop: hp(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navigationNonActiveButton: {
    backgroundColor: "#fff",
  },
  navigationNonActiveButtonText: {
    color: Colors.black,
  },
  navigationButtonText: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.medium,
  },
});
