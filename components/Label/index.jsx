/**
 * Label 组件
 * @author ranguangyu
 * @date 2019-5-1
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Label extends React.Component {

  static propTypes = {
    title: PropTypes.node,
    value: PropTypes.node,
    isLongText: PropTypes.bool,
  }
  
  static defaultProps = {
    title: "字段说明",
    value: "值",
    isLongText: false,
  }

  /**
   * 获取节点文本
   */
  dfsGetText = (children) => {
    if (typeof children === "string") {
      return children;
    }
    return this.dfsGetText(children.props.children);
  };

  render() {
    const { title, value, isLongText } = this.props;
    const className = classNames("z-label", { "long-text": isLongText });
    return (
      <div className={className}>
        <label className="z-label-title">{title && `${title}：`}</label>
        <span className="z-label-value" title={this.dfsGetText(value)}>{value}</span>
      </div>
    )
  }
}