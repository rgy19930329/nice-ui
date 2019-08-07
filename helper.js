/**
 * 判断是否为空对象
 * @param {*} e 
 */
const isEmptyObject = (e) => {
  for (let t in e) {
    return !1;
  }
  return !0;
}

/**
 * 获取对象的第一个key值
 * @param {*} e 
 */
const getFirstKey = (e) => {
  if (isEmptyObject(e)) {
    return "";
  }
  for (let t in e) {
    return t;
  }
}

exports.isEmptyObject = isEmptyObject;
exports.getFirstKey = getFirstKey;