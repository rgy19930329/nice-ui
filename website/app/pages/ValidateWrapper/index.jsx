/**
 * @Desc: ValidateWrapper - preview
 * @Author: RGY
 * @Date: 2020-02-26 15:09:42
 */

import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import { ValidateWrapper, Section, withFormInChild } from "ky-nice-ui";

@Form.create()
@withFormInChild
export default class ValidateWrapperPreview extends PureComponent {

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
      <React.Fragment>
        <h1>ValidateWrapper</h1>

        <Section title="测试一">
          <ValidateWrapper validateStatus={validateStatus}>
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "姓名不能为空" },
                { max: 5, message: "姓名不能超过5个字符" },
              ]
            })(
              <Input
                placeholder="请输入姓名"
                style={{ width: 200, marginRight: 20 }}
              />
            )}
          </ValidateWrapper>
        </Section>

        <Section title="测试二">
          <ValidateWrapper form={this.props.form}>
            {getFieldDecorator("age", {
              rules: [
                { required: true, message: "年龄不能为空" },
              ]
            })(
              <Input
                placeholder="请输入年龄"
                style={{ width: 200, marginRight: 20 }}
              />
            )}
          </ValidateWrapper>
        </Section>

        <Section title="测试三">
          <ValidateWrapper>
            {getFieldDecorator("sex", {
              rules: [
                { required: true, message: "性别不能为空" },
              ]
            })(
              <Input
                placeholder="请输入性别"
                style={{ width: 200 }}
              />
            )}
          </ValidateWrapper>
        </Section>
      </React.Fragment>
    )
  }
}
