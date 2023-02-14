module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "$env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            $server: "server",
            $store: "store",
            $utils: "utils",
            $variables: "variables",
            $types: "types",
            $constants: "./constants",
            $api: "./utils/api.ts",
            $assets: "./assets",
            $components: "./components",
            $hooks: "./hooks",
            $navigation: "./navigation",
            $screens: "./screens",
            $themes: "./themes",
          },
        },
      ],
    ],
  };
};
