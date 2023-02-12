import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import { api } from "../utils/trpc";

const Test = () => {
  // const hello = api.hello.useQuery({ text: "anuj, trpc se bol raha hu" });
  // if (!hello.data) return <Text>Loading...</Text>;
  return (
    <View>
      <Text>Temp</Text>
      {/* <Text>{hello.data.message}</Text> */}
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
