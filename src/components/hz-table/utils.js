/*
 * @Desc: 工具类
 * @Author: ranguangyu
 * @Date: 2019-12-11 15:17:48
 */

import { EMPTY_CELL } from "./constant";

/**
 * @desc: 修复空单元格
 * @param text 
 * @return: {string}
 */
export const fixEmptyCell = (text) => {
  return text ? text : EMPTY_CELL;
}

/**
 * @desc: 是否有操作列
 * @param item [column 列模式的 item] 
 * @return: {boolen}
 */
export const condition = (item) => {
  return item.title === "操作" || item.isOperateColumn;
}