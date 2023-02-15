import Constants from "expo-constants";
import { useState } from "react";

import { api } from "$api";
import useCachedResources from "$hooks/useCachedResources";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import superjson from "superjson";
import Navigation from "./navigation";

const { manifest } = Constants;
const localhost = `http://${manifest!.debuggerHost?.split(":").shift()}:3000`;

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${localhost}/api/trpc`,
        }),
      ],
    }),
  );

  const isCachedResourceLoaded = useCachedResources();

  if (!isCachedResourceLoaded) {
    return null;
  }

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <Navigation />
            <StatusBar style="dark" />
            <Toast />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </api.Provider>
  );
};

export default App;
