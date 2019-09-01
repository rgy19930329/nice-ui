/**
 * @desc 组件 - ValidateWrapper
 * @author rgy
 * @date 2019-08-27 17:42:46
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Popover } from "antd";

export default class ValidateWrapper extends React.Component {

  static propTypes = {
    validateStatus: PropTypes.object,
  }

  static defaultProps = {
    validateStatus: {},
  }

  render() {
    const { className } = this.props;
    const { status, message } = this.props.validateStatus;
    const isError = status === "error";
    return (
      <Popover
        content={message && message[0]}
        visible={isError}
        overlayClassName={classnames({
          [className]: !!className,
          "popover-error": isError,
        })}
      >
        <div
          className={classnames({
            "field-error": isError
          })}
        >
          {this.props.children}
        </div>
      </Popover>
    )
  }
}