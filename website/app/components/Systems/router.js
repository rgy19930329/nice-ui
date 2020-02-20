/**
 * 路由配置文件
 */

let routes = [];

let paths = [];

const req = require.context("@pages", true, /router\.js?$/);

req.keys().forEach((mod) => {
  let v = req(mod);
  if (v && v.default) {
    v = v.default;
  }
  if (v.constructor === Array) {
    routes.push(...v);
    v.forEach(item => {
      paths.push(item.path);
    });
  } else {
    routes.push(v);
    paths.push(v.path);
  }
  // 检查重复路由
  for (let i = 0, len = paths.length; i < len; i++) {
    if (paths.indexOf(paths[i]) !== paths.lastIndexOf(paths[i])) {
      console.warn(`有重复路由，请检查配置！重复路由为：${paths[i]}`);
      break;
    }
  }
});

export default routes;