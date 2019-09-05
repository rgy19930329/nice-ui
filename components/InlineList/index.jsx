/**
 * @desc 组件 - InlineList
 * @author rgy
 * @date 2019-09-05 15:41:56
 */

import "./index.less";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class InlineList extends React.Component {

  static propTypes = {
    list: PropTypes.array, // 数据源
    split: PropTypes.node, // 数据间隔元素，默认为中文顿号
    render: PropTypes.func, // 元数据渲染函数
  }

  static defaultProps = {
    list: [],
    split: "、",
    render: (item) => {
      if (typeof item === "string") {
        return item;
      } else {
        return JSON.stringify(item);
      }
    },
  }

  render() {
    const { className, list, split, render } = this.props;
    const len = list.length;
    return (
      <div
        className={classnames({
          ["comp-inline-list-wrapper"]: true,
          [className]: !!className
        })}
      >
        {list.map((item, index) => {
          return (
            <Fragment key={index}>
              {render(item)}{index < len - 1 && split}
            </Fragment>
          );
        })}
      </div>
    )
  }
}