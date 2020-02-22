const createWebpackConfig = require("ky-nice-scripts");
const path = require("path");

const webpackConfig = createWebpackConfig(__dirname);

webpackConfig.resolve.alias = Object.assign({
  "ky-nice-ui": path.resolve(__dirname, "../es/index"),
}, webpackConfig.resolve.alias);

// webpackConfig.module.loaders[0].include.push(
//   path.resolve(__dirname, "../es")
// );

console.log(webpackConfig)

module.exports = webpackConfig;