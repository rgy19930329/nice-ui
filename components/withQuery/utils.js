
/**
 * 将url参数解析成对象
 * @param {*} url 
 * @return {Object}
 */
const parseUrl = (url) => {
  url = url.slice(url.indexOf("?") + 1);
  if (!url) {
    return {};
  }
  let paramList = url.split("&");
  let params = {};
  paramList.forEach(item => {
    let key = item.split("=")[0];
    let value = item.split("=")[1];
    params[key] = decodeURIComponent(value);
  });
  return params;
}

export {
  parseUrl,
}