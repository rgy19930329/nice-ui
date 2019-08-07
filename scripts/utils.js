/**
 * @desc 驼峰命名转中划线
 * @param {String} name 
 * @return {String}
 */
const camel2line = (name) => {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/**
 * @desc 转驼峰命名
 * @param {String} name 
 * @return {String}
 */
const line2camel = (name) => {
  return name.replace(/[-_](\w)/, function(all, $1) {
    return $1.toUpperCase();
  });
}

/**
 * @desc 首字母大写
 * @param {String} name 
 * @return {String}
 */
const firstLetterUpper = (name) => {
  return name.replace(/^\w/, function(all) {
    return all.toUpperCase();
  });
}

exports.camel2line = camel2line;
exports.line2camel = line2camel;
exports.firstLetterUpper = firstLetterUpper;