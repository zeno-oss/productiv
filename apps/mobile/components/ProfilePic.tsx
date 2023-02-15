import { userAtom } from "$store";
import { User } from "$types";
import { useAtomValue } from "jotai";
import { Image } from "react-native";

export const ProfilePic = () => {
  const user: User | null = useAtomValue(userAtom);
  return (
    <Image
      source={{
        // uri: 'https://ui-avatars.com/api/?name=Mubin+Ansari&background=0D8ABC&color=fff'
        uri:
          user?.profileImage ??
          "https://images.unsplash.com/photo-1609687532637-967130b8f32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      }}
      className="h-9 w-9 rounded-full"
    />
  );
};
