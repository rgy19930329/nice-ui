/**
 * @desc 组件 - Section
 * @author rgy
 * @date 2019-08-13 23:28:53
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Section extends React.Component {
  static propTypes = {
    title: PropTypes.node, // 标题
    hasBorder: PropTypes.bool, // 是否有边框
    titleSlot: PropTypes.node, // 标题右侧内容展示
    iconType: PropTypes.oneOf(["house", "power"]), // 图标类型
  };

  static defaultProps = {
    title: "",
    hasBorder: true,
  };

  render() {
    const {
      title,
      titleSlot,
      children,
      hasBorder,
      className,
      iconType,
    } = this.props;
    return (
      <div
        className={classNames({
          ["nice-section-wrapper"]: true,
          ["nice-section-wapper-border"]: hasBorder,
          [className]: !!className,
        })}
      >
        {title && (
          <div className="nice-section-title">
            <div className="nice-section-left-title">
              {iconType && (
                <i
                  className={classNames("title-icon", `title-icon-${iconType}`)}
                ></i>
              )}
              {typeof title === "string" ? (
                <h3 style={{ display: "inline-block" }}>{title}</h3>
              ) : (
                <div style={{ display: "inline-block" }}>{title}</div>
              )}
            </div>
            {titleSlot && <div className="title-slot">{titleSlot}</div>}
          </div>
        )}
        <div>{children}</div>
      </div>
    );
  }
}
