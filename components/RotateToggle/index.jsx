/**
 * @desc 组件 - RotateToggle
 * @author rgy
 * @date 2019-09-03 18:27:17
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class RotateToggle extends React.Component {

  static propTypes = {
    isOpen: PropTypes.bool, // 是否打开
    rotate: PropTypes.array, // 旋转角度数组 [关闭时的角度，打开时的角度]
  }

  static defaultProps = {
    isOpen: false,
    rotate: [0, 180],
  }

  render() {
    const { className, children, isOpen, rotate } = this.props;
    let deg = isOpen ? rotate[1] : rotate[0];
    return (
      <div
        className={classnames({
          ["comp-rotate-toggle-wrapper"]: true,
          [className]: !!className
        })}
        style={{transform: `rotate(${deg}deg)`}}
      >
        {children}
      </div>
    )
  }
}