module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            $server: "server",
            $store: "store",
            $types: "types",
            $utils: "utils",
            $variables: "variables",
            $trpc: "./utils/trpc.ts",
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
