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
    form: PropTypes.object,
  }

  static defaultProps = {
    validateStatus: {},
  }

  /**
   * 获取字段校验结果
   */
  getValidateStatus = (field) => {
    
    const {
      isFieldValidating,
      getFieldError,
      getFieldValue,
    } = this.props.form;
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
      }
    }
    return {};
  }

  render() {
    const { className, validateStatus, form, children } = this.props;
    let { status, message } = validateStatus;
    if (form) {
      let { id } = children.props;
      status = this.getValidateStatus(id).status;
      message = this.getValidateStatus(id).message;
    }
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
        <span
          className={classnames({
            "field-error": isError
          })}
        >
          {children}
        </span>
      </Popover>
    )
  }
}