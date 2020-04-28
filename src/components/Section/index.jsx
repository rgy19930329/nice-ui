/**
 * @desc 组件 - Section
 * @author rgy
 * @date 2019-08-13 23:28:53
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Section extends React.Component {
  static propTypes = {
    title: PropTypes.node, // 标题
    hasBorder: PropTypes.bool, // 是否有边框
    titleSlot: PropTypes.node, // 标题右侧内容展示
  };

  static defaultProps = {
    title: "",
    hasBorder: true,
  };

  render() {
    const { title, titleSlot, children, hasBorder, className } = this.props;
    return (
      <div
        className={classNames({
          ["comp-section-wrapper"]: true,
          ["comp-section-wapper-border"]: hasBorder,
          [className]: !!className,
        })}
      >
        {title && (
          <div className="comp-section-title">
            <div className="comp-section-left-title">
              {typeof title === "string" ? <h3>{title}</h3> : title}
            </div>
            {titleSlot && <div className="title-slot">{titleSlot}</div>}
          </div>
        )}
        <div>{children}</div>
      </div>
    );
  }
}
