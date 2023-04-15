import { HomeDrawerParamList, HomeDrawerScreenProps } from "$types";
import { Pressable } from "react-native";

import { ProfilePic } from "$components";
import { NotesManager, TabOneScreen, TabTwoScreen } from "$screens";
import { Hamburger } from "$themes";
import { FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import TaskBottomTabsNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="TaskManager"
      screenOptions={({ navigation }) => ({
        headerShadowVisible: false,
        sceneContainerStyle: { backgroundColor: "#fff", padding: 14 },
        headerTitleAlign: "center",
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={({ pressed }) => pressed && { opacity: 0.5 }}
          >
            <Hamburger />
          </Pressable>
        ),
        headerRight: () => <ProfilePic />,
      })}
    >
      <Drawer.Screen
        name="TaskManager"
        component={TaskBottomTabsNavigator}
        options={{
          title: "Task Manager",
          drawerIcon: ({ color }) => <TabBarIcon name="check" color={color} />,
        }}
      />
      <Drawer.Screen
        name="NotesManager"
        component={NotesManager}
        options={{
          title: "Notes Manager",
          drawerIcon: ({ color }) => (
            <TabBarIcon name="sticky-note" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="OCR"
        component={TabOneScreen}
        options={({ navigation }: HomeDrawerScreenProps<"OCR">) => ({
          title: "OCR",
          drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      <Drawer.Screen
        name="Appointment"
        component={TabTwoScreen}
        options={({ navigation }: HomeDrawerScreenProps<"Appointment">) => ({
          title: "Appointment",
          drawerIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
    </Drawer.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default DrawerNavigator;
