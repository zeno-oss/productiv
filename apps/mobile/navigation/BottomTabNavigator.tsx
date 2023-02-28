import { TaskTabBar } from "$components";
import { DoneTaskScreen, TodayTaskScreen, UpcomingTaskScreen } from "$screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TaskBottomTabsParamList } from "types/navigation";

const Tab = createBottomTabNavigator<TaskBottomTabsParamList>();

function TaskBottomTabsNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "#fff" }}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TaskTabBar {...props} />}
    >
      <Tab.Screen name="Today" component={TodayTaskScreen} />
      <Tab.Screen name="Upcoming" component={UpcomingTaskScreen} />
      <Tab.Screen name="Done" component={DoneTaskScreen} />
    </Tab.Navigator>
  );
}

export default TaskBottomTabsNavigator;
