import { hp } from "$themes";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const ProfilePic = () => {
  return (
    <View>
      <Image
        source={{
          // uri: 'https://ui-avatars.com/api/?name=Mubin+Ansari&background=0D8ABC&color=fff'
          uri: "https://images.unsplash.com/photo-1609687532637-967130b8f32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: hp(35),
    width: hp(35),
    borderRadius: hp(20),
  },
});
