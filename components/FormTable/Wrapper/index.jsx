/**
 * @desc 组件 - Wrapper
 * @author rgy
 * @date 2019-09-02 14:27:10
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Wrapper extends React.Component {
  
  static propTypes = {
    validateStatus: PropTypes.object,
  }

  static defaultProps = {
    validateStatus: {},
  }

  render() {
    const { status, message } = this.props.validateStatus;
    const isError = status === "error";
    return (
      <div className="field-wrapper">
        <span className={classNames({
          "field-error": isError,
        })}>
          {this.props.children}
        </span>
        <div className="field-message">{message && message[0]}</div>
      </div>
    )
  }
}
