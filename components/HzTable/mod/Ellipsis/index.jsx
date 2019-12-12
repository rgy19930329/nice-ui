/**
 * @Desc 组件 - Ellipsis - 文字溢出省略号
 * @Author RGY
 * @Date 2019-12-11 15:22:37
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Tooltip } from "antd";

import "./index.less";

export default class Ellipsis extends PureComponent {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

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
          {children}
        </span>
      </Tooltip>
    )
  }
}
