/**
 * @desc 组件演示 - ValidateWrapper
 * @author rgy
 * @date 2019-08-27 17:42:46
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import ValidateWrapper from "@components/ValidateWrapper";
import { Form, Input } from "antd";

@Form.create()
class PreviewValidateWrapper extends React.Component {

  static childContextTypes = {
    form: PropTypes.object,
  }

  getChildContext() {
    return {
      form: this.props.form,
    }
  }

  constructor(props) {
    super(props);

    console.log("props", props);
  }

  componentDidMount() {

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
    const { getFieldDecorator } = this.props.form;
    const validateStatus = this.getValidateStatus("name");

    return (
      <div className="page-validate-wrapper-wrapper">
        <h1>ValidateWrapper</h1>
        <div className="inner">
          <ValidateWrapper validateStatus={validateStatus}>
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "姓名不能为空" },
                { max: 5, message: "姓名不能超过5个字符" },
              ]
            })(
              <Input
                placeholder="请输入姓名"
                style={{width: 200, marginRight: 20}}
              />
            )}
          </ValidateWrapper>
          
          <ValidateWrapper form={this.props.form}>
            {getFieldDecorator("age", {
              rules: [
                { required: true, message: "年龄不能为空" },
              ]
            })(
              <Input
                placeholder="请输入年龄"
                style={{width: 200, marginRight: 20}}
              />
            )}
          </ValidateWrapper>

          <ValidateWrapper>
            {getFieldDecorator("sex", {
              rules: [
                { required: true, message: "性别不能为空" },
              ]
            })(
              <Input
                placeholder="请输入性别"
                style={{width: 200}}
              />
            )}
          </ValidateWrapper>
        </div>
      </div>
    )
  }
}

render(<PreviewValidateWrapper />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}