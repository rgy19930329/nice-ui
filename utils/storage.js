/**
 * @desc localStorage & sessionStorage 操作封装
 */

const createStorage = (storage) => {
  /**
   * 设置值
   * @param {*} key 
   * @param {*} value
   */
  const set = (key, value) => {
    value = typeof value === "object" ? JSON.stringify(value) : value;
    storage.setItem(key, value);
  }

  /**
   * 获取值
   * @param {*} key 
   */
  const get = (key) => {
    let value = storage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (e) {
      return value;
    }
    return value;
  }

  /**
   * 删除
   * @param {*} key 
   */
  const remove = (key) => {
    storage.removeItem(key);
  }

  /**
   * 清空所有数据
   */
  const clear = () => {
    storage.clear();
  }

  return {
    set,
    get,
    remove,
    clear
  }
}

const local_storage = createStorage(window.localStorage);
const session_storage = createStorage(window.sessionStorage);

export {
  local_storage,
  session_storage,
}