module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            $server: "server",
            $store: "store",
            $utils: "utils",
            $variables: "variables",
            $types: "types",
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
