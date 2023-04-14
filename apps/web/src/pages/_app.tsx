import { type AppType } from "next/app";

import { api } from "../utils/api";

import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />;
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
