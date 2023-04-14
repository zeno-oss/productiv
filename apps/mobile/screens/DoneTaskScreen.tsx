import { api } from "$api";
import { TaskHeader, TaskList, Text } from "$components";
import { userAtom } from "$store";
import { TaskBottomTabsScreenProps } from "$types";
import { useAtomValue } from "jotai";
import { View } from "react-native";

export const DoneTaskScreen = ({}: TaskBottomTabsScreenProps<"Done">) => {
  const user = useAtomValue(userAtom);

  const completedTasks = api.task.getTasks.useQuery("DONE");

  if (!completedTasks.data || !user)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );

  function refreshTaskHandler() {
    completedTasks.refetch();
  }

  return (
    <View className="my-3">
      <TaskHeader
        name={user.name}
        onRefresh={refreshTaskHandler}
        taskCount={completedTasks.data.length}
        isDoneScreen
      />
      <TaskList tasks={completedTasks.data} />
    </View>
  );
};
