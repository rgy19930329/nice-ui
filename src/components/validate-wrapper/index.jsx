/**
 * @desc 组件 - ValidateWrapper
 * @author rgy
 * @date 2019-08-27 17:42:46
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Popover } from "antd";

export default class ValidateWrapper extends React.Component {
  static contextTypes = {
    form: PropTypes.object,
  };

  static propTypes = {
    validateStatus: PropTypes.object,
    form: PropTypes.object,
  };

  static defaultProps = {
    validateStatus: {},
  };

  /**
   * 获取字段校验结果
   */
  getValidateStatus = (field) => {
    const { isFieldValidating, getFieldError, getFieldValue } =
      this.props.form || this.context.form;
    if (!field) {
      return {};
    }
    if (isFieldValidating(field)) {
      return {
        status: "validating",
      };
    }
    if (!!getFieldError(field)) {
      return {
        status: "error",
        message: getFieldError(field),
      };
    }
    if (getFieldValue(field)) {
      return {
        status: "success",
      };
    }
    return {};
  };

  render() {
    const { className, validateStatus, children } = this.props;
    let { status, message } = validateStatus;
    if (this.props.form || this.context.form) {
      let { id } = children.props;
      status = this.getValidateStatus(id).status;
      message = this.getValidateStatus(id).message;
    }
    const isError = status === "error";
    return (
      <Popover
        content={message && message[0]}
        visible={isError}
        overlayClassName={classNames({
          [className]: !!className,
          "popover-error": isError,
        })}
      >
        <span
          className={classNames({
            "field-error": isError,
          })}
        >
          {children}
        </span>
      </Popover>
    );
  }
}
