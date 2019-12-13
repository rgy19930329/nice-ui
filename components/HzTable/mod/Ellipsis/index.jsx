/**
 * @Desc 组件 - Ellipsis - 文字溢出省略号
 * @Author RGY
 * @Date 2019-12-11 15:22:37
 */

import React, { PureComponent } from "react";
import classnames from "classnames";
import { Tooltip } from "antd";

import "./index.less";
import { fixEmptyCell } from "../../utils";

export default class Ellipsis extends PureComponent {
  render() {
    const { className, style, children } = this.props;

    return (
      <Tooltip title={children}>
        <span
          className={classnames({
            ["comp-ellipsis-wrapper"]: true,
            [className]: className
          })}
          style={style}
        >
          {fixEmptyCell(children)}
        </span>
      </Tooltip>
    )
  }
}
