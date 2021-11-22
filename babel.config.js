module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "@babel/plugin-syntax-jsx", // I still want this plugin
      [
        "@babel/plugin-transform-react-jsx", // I really need this plugin
        {
          runtime: "automatic",
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
