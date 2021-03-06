/**
 * @desc 组件 - CellLimit
 * @author rgy
 * @date 2019-08-13 17:17:11
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class CellLimit extends React.Component {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    width: "100%",
  };

  /**
   * 获取节点文本
   */
  dfsGetText = (children) => {
    if (typeof children === "string" || typeof children === "undefined") {
      return children;
    }
    if (Array.isArray(children)) {
      return children
        .map((item) => {
          return this.dfsGetText(item);
        })
        .join("");
    }
    return this.dfsGetText(children.props.children);
  };

  render() {
    const { children, width, className } = this.props;
    const cls = classNames({
      ["nice-cell-limit-wrapper"]: true,
      [className]: className,
    });
    return (
      <div className={cls} style={{ width }} title={this.dfsGetText(children)}>
        {children}
      </div>
    );
  }
}
