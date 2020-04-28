const createWebpackConfig = require("ky-nice-scripts");
const path = require("path");

const webpackConfig = createWebpackConfig(__dirname);

webpackConfig.entry.unshift("babel-polyfill");

webpackConfig.resolve.alias = Object.assign(
  {
    "anice-ui": path.resolve(__dirname, "../es/index"),
  },
  webpackConfig.resolve.alias
);

module.exports = webpackConfig;
