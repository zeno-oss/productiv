import { NavigationContainer } from "@react-navigation/native";

import LinkingConfiguration from "./LinkingConfiguration";
import StackNavigator from "./StackNavigator";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <StackNavigator />
    </NavigationContainer>
  );
}
