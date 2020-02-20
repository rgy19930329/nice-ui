const createWebpackConfig = require("ky-nice-scripts");
const path = require("path");

const webpackConfig = createWebpackConfig(__dirname);

webpackConfig.resolve.alias = Object.assign({
  "ky-nice-ui": path.resolve(__dirname, "../", "src"),
}, webpackConfig.resolve.alias);

webpackConfig.module.loaders[0].include.push(
  path.resolve(__dirname, "../src")
);

module.exports = webpackConfig;