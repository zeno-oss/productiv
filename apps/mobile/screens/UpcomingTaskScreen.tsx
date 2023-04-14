import { api } from "$api";
import { TaskHeader, TaskList, Text } from "$components";
import { userAtom } from "$store";
import { TaskBottomTabsScreenProps } from "$types";
import { useAtomValue } from "jotai";
import { View } from "react-native";

export const UpcomingTaskScreen =
  ({}: TaskBottomTabsScreenProps<"Upcoming">) => {
    const user = useAtomValue(userAtom);

    const allTasks = api.task.getTasks.useQuery("UPCOMING");

    if (!allTasks.data || !user)
      return (
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      );

    function refreshTaskHandler() {
      allTasks.refetch();
    }

    return (
      <View className="my-3">
        <TaskHeader
          name={user.name}
          onRefresh={refreshTaskHandler}
          taskCount={allTasks.data.length}
        />
        <TaskList tasks={allTasks.data} />
      </View>
    );
  };
