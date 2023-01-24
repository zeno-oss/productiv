import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import Home from "./components/Home";
import { api } from "./utils/trpc";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
const router = createBrowserRouter([...routes]);
function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </api.Provider>
  );
}

export default App;
