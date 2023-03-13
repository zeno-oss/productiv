import {
  AddNoteScreen,
  AddTaskScreen,
  ModalScreen,
  NotFoundScreen,
  OnboardingScreen,
} from "$screens";
import { userAtom } from "$store";
import { RootNativeStackParamList } from "$types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtomValue } from "jotai";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator<RootNativeStackParamList>();

function StackNavigator() {
  const user = useAtomValue(userAtom);

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerTitleAlign: "center",
        headerBackTitle: "",
      }}
      initialRouteName={user ? "Home" : "Onboarding"}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;
