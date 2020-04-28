const fs = require("fs");

/**
 * @desc 驼峰命名转中划线
 * @param {String} name
 * @return {String}
 */
const camel2line = (name) => {
  return name
    .replace(/([A-Z])/g, "-$1")
    .replace(/^-/, "")
    .toLowerCase();
};

/**
 * @desc 转驼峰命名
 * @param {String} name
 * @return {String}
 */
const line2camel = (name) => {
  return name.replace(/[-_](\w)/, function (all, $1) {
    return $1.toUpperCase();
  });
};

/**
 * @desc 首字母大写
 * @param {String} name
 * @return {String}
 */
const firstLetterUpper = (name) => {
  return name.replace(/^\w/, function (all) {
    return all.toUpperCase();
  });
};

/**
 * 删除整个文件夹及其下属文件
 * @param {*} path
 */
const delDir = (path) => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
};

/**
 * 遍历文件夹
 * @param {*} path
 * @param {*} callback
 */
const traceDir = (path, { dirCallback, fileCallback }) => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        dirCallback(curPath);
        traceDir(curPath, { dirCallback, fileCallback });
      } else {
        fileCallback(curPath);
      }
    });
  }
};

exports.camel2line = camel2line;
exports.line2camel = line2camel;
exports.firstLetterUpper = firstLetterUpper;
exports.delDir = delDir;
exports.traceDir = traceDir;
