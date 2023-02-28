import { api } from "$api";
import { TaskHeader, TaskList, Text } from "$components";
import { userAtom } from "$store";
import { TaskBottomTabsScreenProps } from "$types";
import { useAtomValue } from "jotai";
import { View } from "react-native";

export const TodayTaskScreen = ({}: TaskBottomTabsScreenProps<"Today">) => {
  const user = useAtomValue(userAtom);

  const todaysTask = api.task.getTodaysTasks.useQuery();

  if (!todaysTask.data || !user)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );

  function refreshTodaysTaskHandler() {
    todaysTask.refetch();
  }

  return (
    <View className="my-3">
      <TaskHeader
        name={user.name}
        onRefresh={refreshTodaysTaskHandler}
        taskCount={todaysTask.data.length}
      />
      <TaskList tasks={todaysTask.data} />
    </View>
  );
};
